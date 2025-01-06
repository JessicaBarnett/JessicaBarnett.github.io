import { RefObject, useLayoutEffect } from "react"; // refObject always has a .current.  ref, does not.  Need to specify

import { ProjectsByCompanyT } from "@src/hooks/useFilteredProjects.ts";
import { CssBreakpointsT } from "@src/types/css-variables-types.ts";
import { ElementRefsT, SizesT, PointT } from "@src/types/bg-line-types.ts";

import { useBreakpoints } from "@src/hooks/static/useBreakpoints.ts";
import { useRainbowColors } from "@src/hooks/static/useRainbowColors.ts";

import {
  VtoD,
  HtoD,
  DtoH,
  DtoV,
  vertical,
  horizontal,
  diagonal,
  getElementSizes,
} from "@src/utils/bg-line-utils.ts";

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
      x: pgWidth - linesW * 1.5, // right side of the page, offset by 100
      y: 0, // slightly below page top edge
    },
    {
      x: pgWidth - linesW * 1.5,
      y: ttlHeight - 80,
      a: 45,
    },
    {
      x: pgWidth - (100 + 15 * (pgWidth * 0.004)), // I have no idea how I came up with this math
      y: ttlHeight - linesW / 2, // top-right of the about element
      a: 45,
    },
    {
      x: linesW,
      y: ttlHeight - linesW / 2,
      a: 45,
    },
    {
      x: lineW / 2,
      y: ttlHeight + linesW / 2, // top-left of the about element
      a: 45,
    },
    {
      x: lineW / 2,
      y: ttlHeight + abtHeight + projHeight + 60, // bottom of the Projects Element/ top of experience
      a: 0,
    },
    {
      x: lineCt * lineW,
      y: ttlHeight + abtHeight + projHeight + 150,
      a: 0,
    },
    {
      x: lineCt * lineW,
      y: ttlHeight + abtHeight + projHeight + expHeight - linesW / 2, // bottom of Experience Element
      a: 90,
    },
    {
      x: pgWidth - 50 * (pgWidth * 0.006),
      y: ttlHeight + abtHeight + projHeight + expHeight - linesW / 2, // horizontal across bottom
      a: 0,
    },
    {
      x: pgWidth,
      y:
        ttlHeight + abtHeight + projHeight + expHeight + 50 * (pgWidth * 0.003), // final point
    },
  ];
};

const getPathB = (
  { pgWidth, ttlHeight, abtHeight, projHeight }: SizesT,
  lineW: number,
  lineCt: number
): PointT[] => {
  const allLinesW = lineW * lineCt;
  const halfLineW = lineW / 2;
  const halfLinesW = allLinesW / 2;

  return [
    {
      x: 0, // left side
      y: ttlHeight + abtHeight - halfLinesW - 80,
    },
    {
      x: allLinesW * 1.4, // left side
      y: ttlHeight + abtHeight - halfLinesW,
      a: 0,
    },
    {
      x: pgWidth - allLinesW + halfLineW, // right side minus line width
      y: ttlHeight + abtHeight - halfLinesW,
      a: 90,
    },
    {
      x: pgWidth - allLinesW + halfLineW, // right side minus line width
      y: ttlHeight + abtHeight + projHeight - 150 + pgWidth * 0.05,
      a: 45,
    },
    {
      x: pgWidth - pgWidth * 0.25,
      y: ttlHeight + abtHeight + projHeight - 50 + pgWidth * 0.02, // -30 @ small
      translate: (p: PointT, offset: number, lineIdx: number) => {
        return {
          x: p.x + offset - lineIdx * 2,
          y: p.y + lineIdx * 20,
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
  const halfLineW = lineW / 2;
  const linesW = lineW * lineCt;
  return [
    {
      x: 0, // left side
      y: pgHeight - linesW + halfLineW,
    },
    {
      x: pgWidth - linesW + halfLineW, // right side minus line width
      y: pgHeight - linesW + halfLineW,
    },
    {
      x: pgWidth - linesW + halfLineW, // right side minus line width
      y: pgHeight - linesW - 300,
      translate: (p: PointT, offset: number) => {
        return {
          x: p.x + offset,
          y: p.y + offset,
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
const getLineW = (sizes: SizesT, breakpoints: CssBreakpointsT): number => {
  if (sizes.pgWidth <= parseInt(breakpoints.mediumBp)) {
    return 10;
  }

  if (sizes.pgWidth <= parseInt(breakpoints.wideBp)) {
    return 15;
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
const drawBgLines = (
  refs: ElementRefsT,
  colors: string[],
  breakpoints: CssBreakpointsT
) => {
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
  filteredProjects: ProjectsByCompanyT,
  formState: string
) {
  const [breakpoints] = useBreakpoints();
  const [colors] = useRainbowColors();

  useLayoutEffect(() => {
    const drawBgLinesWRefsApplied = () =>
      drawBgLines(refs, colors, breakpoints);
    requestAnimationFrame(drawBgLinesWRefsApplied);

    drawBgLinesWRefsApplied();
    window.addEventListener("resize", drawBgLinesWRefsApplied);

    console.log('redrawing lines')

    return () => window.removeEventListener("resize", drawBgLinesWRefsApplied); // cleanup fn
  }, [refs, filteredProjects, formState, breakpoints, colors]);
}
