// refObjects have a .current, ref callbacks don't.
// I need to distinctify between Ref (joined type,
// could NOT have a current) and RefObject
import { RefObject, useLayoutEffect } from "react";
import { ProjectsByCompanyT } from "./useFilteredProjects";
import { BreakpointsT, useBreakpoints } from "./useBreakpoints";
import { useColors } from "./useColors";
import { ElementRefsT, SizesT, PointT } from "../types/bg-line-types";
import { VtoD, HtoD, DtoH, DtoV, vertical, horizontal, diagonal, getElementSizes } from "../utils/bg-line-utils";


/********************************/
/******* Path Definitions ********/
/********************************/

// These fns calculate paths using the heights of
// all the elementsin ElementRefsT

const getPathA = (
  { pgWidth, ttlHeight, abtHeight, expHeight, projHeight }: SizesT,
  lineW: number,
  lineCt: number
): PointT[] => {
  const linesW = lineW * lineCt;

  return [
    {
      x: pgWidth - (linesW * 1.5), // right side of the page, offset by 100
      y: 0, // slightly below page top edge
    },
    {
      x: pgWidth - (linesW * 1.5),
      y: ttlHeight - 80,
      a: 45,
    },
    {
      x: pgWidth - 180,
      y: ttlHeight - (linesW/2), // top-right of the about element
      a: 45,
    },
    {
      x: linesW,
      y: ttlHeight - (linesW/2),
      a: 45,
    },
    {
      x: lineW / 2,
      y: ttlHeight + (linesW / 2), // top-left of the about element
      a: 45,
    },
    {
      x: lineW / 2,
      y: ttlHeight + abtHeight + projHeight - 50, // bottom of the Projects Element/ top of experience
      a: 0,
    },
    {
      x: lineCt * lineW,
      y: ttlHeight + abtHeight + projHeight + 50,
      a: 0,
    },
    {
      x: lineCt * lineW,
      y: ttlHeight + abtHeight + projHeight + expHeight - (linesW/2), // bottom of Experience Element
      a: 90,
    },
    {
      x: pgWidth - 200,
      y: ttlHeight + abtHeight + projHeight + expHeight - (linesW/2), // horizontal across bottom
      a: 0,
    },
    {
      x: pgWidth,
      y: ttlHeight + abtHeight + projHeight + expHeight + 150, // final point
    },
  ];
};

const getPathB = (
  { pgWidth, ttlHeight, abtHeight, projHeight }: SizesT,
  lineW: number,
  lineCt: number
): PointT[] => {
  const linesW = lineW * lineCt;

  return [
    {
      x: 0, // left side
      y: ttlHeight + abtHeight - (linesW/2) - 80 ,
    },
    {
      x: linesW * 1.4, // left side
      y: ttlHeight + abtHeight - (linesW/2),
      a: 0,
    },
    {
      x: pgWidth - linesW, // right side minus line width
      y: ttlHeight + abtHeight  - (linesW/2) ,
      a: 90,
    },
    {
      x: pgWidth - linesW, // right side minus line width
      y: ttlHeight + abtHeight + projHeight - 200,
      a: 45,
    },
    {
      x: pgWidth - 280,
      y: ttlHeight + abtHeight + projHeight - 50,
      translate: (p: PointT, offset: number, lineIdx: number) => {
        return {
          x: p.x + offset - lineIdx * 20,
          y: p.y + lineIdx * 40,
        };
      },
    },
  ];
};

const getPathC = (
  {
    pgWidth,
    ttlHeight,
    abtHeight,
    expHeight,
    projHeight,
    contHeight,
    ftrHeight,
  }: SizesT,
  lineW: number,
  lineCt: number
): PointT[] => {
  const pgHeight =
    ttlHeight + abtHeight + projHeight + expHeight + contHeight + ftrHeight;

  return [
    {
      x: 0, // left side
      y: pgHeight - lineW * lineCt,
    },
    {
      x: pgWidth - lineW * lineCt, // right side minus line width
      y: pgHeight - lineW * lineCt,
    },
    {
      x: pgWidth - lineW * lineCt - 150, // right side minus line width
      y: pgHeight - lineW * lineCt - 300,
      translate: (p: PointT, offset: number, lineIdx: number) => {
        return {
          x: p.x + 4.5 * lineIdx,
          y: p.y - 2 * lineIdx,
        };
      },
    },
  ];
};


/******************************/
/******* Drawing Stuff ********/
/******************************/

const resizeAndClearCanvas = (
  canvasRef: RefObject<HTMLCanvasElement>,
  ctx: CanvasRenderingContext2D,
  height: number,
  width: number
) => {
  if (!canvasRef || !canvasRef.current) {
    throw new Error("no canvasRef or canvasRef.current"); // this should already have been asserted but typescript doesn't see it...
  }
  canvasRef.current.setAttribute("height", `${height}px`);
  canvasRef.current.setAttribute("width", `${width}px`);
  ctx.clearRect(0, 0, height, width); // clear
};

// Change line Widths at breakpoints here
const getLineW = (sizes: SizesT, breakpoints: BreakpointsT): number => {
  if (sizes.pgWidth <= parseInt(breakpoints.miniBp)) {
    return 8;
  }

  if (sizes.pgWidth <= parseInt(breakpoints.smallBp)) {
    return 10;
  }

  if (sizes.pgWidth <= parseInt(breakpoints.mediumBp)) {
    return 15;
  }

  if (sizes.pgWidth <= parseInt(breakpoints.wideBp)) {
    return 20;
  }

  return 20;
};

// Given the points for the first line, translate all points and return new path
// in other words, since we only have points for the blue line, this fn calculates
// the paths/points for the other 4 lines
const translatePath = (path: PointT[], offset: number, lineIdx: number) => {
  if (offset === 0) {
    return path; // no need to translate if there's no offset
  }

  return path.map((point, i, points) => {
    const prev = points[i - 1]; // prev point
    const p = point; // first pt of segment
    const next = points[i + 1]; // next point

    if (typeof point.translate === "function") {
      return point.translate(point, offset, lineIdx);
    }

    if (!prev && vertical(p, next)) {
      return { x: point.x + offset, y: point.y };
    }

    if (!prev && diagonal(p, next)) {
      return { x: point.x - offset, y: point.y + offset / 2 };
    }

    if (!prev && horizontal(p, next)) {
      return { x: point.x, y: point.y + offset };
    }

    if (!next) {
      return { x: point.x + offset, y: point.y + offset * 1.8 };
    }

    if (point.a === 90) {
      return { x: p.x + offset, y: p.y + offset };
    }

    if (point.a === 45 && VtoD(p, prev, next)) {
      return { x: p.x + offset, y: p.y + offset / 2 };
    }

    if (point.a === 45 && DtoH(p, prev, next)) {
      return { x: p.x + offset / 2, y: p.y + offset };
    }

    if (point.a === 45 && HtoD(p, prev, next)) {
      return { x: p.x + offset / 2, y: p.y + offset };
    }

    if (point.a === 45 && DtoV(p, prev, next)) {
      return { x: p.x + offset, y: p.y + offset / 2 };
    }

    if (point.a === 0 && VtoD(p, prev, next)) {
      return { x: p.x + offset, y: p.y };
    }

    if (point.a === 0 && DtoV(p, prev, next)) {
      return { x: p.x + offset, y: p.y };
    }

    if (point.a === 0 && HtoD(p, prev, next)) {
      return { x: p.x, y: p.y + offset };
    }

    if (point.a === 0 && DtoH(p, prev, next)) {
      return { x: p.x, y: p.y + offset };
    }

    return { x: p.x + offset, y: p.y + offset }; // only returns the first point of the segment
  });
};

// Draw a single Line
// this fn is basically just a bunch of
// canvas configuration, a loop that calls
// lineTo for each piont, and ctx.stroke.
const drawLine = (
  ctx: CanvasRenderingContext2D,
  points: PointT[],
  lineW: number,
  color: string
) => {
  ctx.beginPath();
  ctx.lineWidth = lineW;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.strokeStyle = color;

  points.forEach((point) => {
    ctx.lineTo(point.x, point.y);
  });

  ctx.stroke();
};


// draw all Lines
const drawBgLines = (refs: ElementRefsT, colors: string[], breakpoints: BreakpointsT) => {
  const { canvasRef } = refs;
  const ctx = refs.canvasRef?.current?.getContext("2d");

  if (!ctx || !canvasRef || !canvasRef.current) {
    console.log("no context/canvasRef/canvasRef.current!");
    return;
  }

  // get sizes of elements and lines
  const elSizes = getElementSizes(refs);
  const lineW = getLineW(elSizes, breakpoints);

  // clear and resize
  resizeAndClearCanvas(canvasRef, ctx, elSizes.pgHeight, elSizes.pgWidth);

  // calculate paths based on element sizes
  const pathA = getPathA(elSizes, lineW, colors.length);
  const pathB = getPathB(elSizes, lineW, colors.length);
  const pathC = getPathC(elSizes, lineW, colors.length);

  // draw paths
  colors.forEach((color, i) => {
    drawLine(ctx, translatePath(pathB, lineW * i, i), lineW, color);
  });

  colors.forEach((color, i) => {
    drawLine(ctx, translatePath(pathC, lineW * i, i), lineW, color);
  });

  colors.forEach((color, i) => {
    drawLine(ctx, translatePath(pathA, lineW * i, i), lineW, color);
  });
};


/******************************/
/******* Hook Function ********/
/******************************/

export function useBgLines(
  refs: ElementRefsT,
  filteredProjects: ProjectsByCompanyT
) {
  const [ breakpoints ] = useBreakpoints();
  const [ colors ] = useColors();

  useLayoutEffect(() => {
    const drawBgLinesWRefsApplied = () => drawBgLines(refs, colors, breakpoints);

    drawBgLinesWRefsApplied();
    window.addEventListener("resize", drawBgLinesWRefsApplied);

    return () => window.removeEventListener("resize", drawBgLinesWRefsApplied); // cleanup fn
  }, [refs, filteredProjects, breakpoints, colors]);
}
