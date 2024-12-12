// refObjects have a .current, ref callbacks don't.
// I need to distinctify between Ref (joined type,
// could NOT have a current) and RefObject
import { RefObject, useLayoutEffect } from "react";
import { ProjectsByCompanyT } from "./useFilteredProjects";
import variables from "@styles/variables.module.scss";

type BreakpointsT = {
  miniBp: string;
  smallBp: string;
  mediumBp: string;
  wideBp: string;
  extraWideBp: string;
  hdBp: string;
};

const breakpoints: BreakpointsT = (() => {
  const tmp = { ...variables };
  delete tmp["colors"];
  return tmp as BreakpointsT;
})(); // to get 'colors' key out and type this properly

// note the Null options are removed from this type
type ElementRefsT = {
  canvasRef: RefObject<HTMLCanvasElement>;
  pageRef: RefObject<HTMLDivElement>;
  ttlRef: RefObject<HTMLElement>;
  abtRef: RefObject<HTMLElement>;
  projRef: RefObject<HTMLElement>;
  expRef: RefObject<HTMLElement>;
  contRef: RefObject<HTMLElement>;
  ftrRef: RefObject<HTMLElement>;
};

// element sizes
type SizesT = {
  pgWidth: number;
  pgHeight: number;
  ttlHeight: number;
  abtHeight: number;
  expHeight: number;
  projHeight: number;
  contHeight: number;
  ftrHeight: number;
};

type PointT = {
  x: number;
  y: number;
  a?: 90 | 45 | 0;
  translate?: (p: PointT, offset: number, lineIdx: number) => PointT; // optional fn to use when translating a point
};

/*
https://math.stackexchange.com/questions/143932/calculate-point-given-x-y-angle-and-distance
xx = x + (d * cos(alpha))
yy = y + (d * sin(alpha))

 */

// given destination point, angle, and distance, calculates next point
// const nextPoint = (p: PointT, angle: number, d: number): PointT => {
//   return { x: p.x + (d * Math.cos(angle)), y: p.y + (d * Math.sin(angle)) };
// }

// Takes variable Element height/widths and creates a path with them.
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

// Tests to determine stuff about each segment of the line,
// as some of them need to use different offsets when translating
const vertical = (p1: PointT, p2: PointT): boolean => p1.x === p2.x;
const horizontal = (p1: PointT, p2: PointT): boolean => p1.y === p2.y;
const diagonal = (p1: PointT, p2: PointT): boolean =>
  !vertical(p1, p2) && !horizontal(p1, p2);

const VtoD = (p: PointT, prev: PointT, next: PointT) =>
  prev && next && vertical(p, prev) && diagonal(p, next);
const DtoH = (p: PointT, prev: PointT, next: PointT) =>
  prev && next && diagonal(p, prev) && horizontal(p, next);
const HtoD = (p: PointT, prev: PointT, next: PointT) =>
  prev && next && horizontal(p, prev) && diagonal(p, next);
const DtoV = (p: PointT, prev: PointT, next: PointT) =>
  prev && next && diagonal(p, prev) && vertical(p, next);

const toRight = (p1: PointT, p2: PointT) => p1.x < p2.x;
const toLeft = (p1: PointT, p2: PointT) => p1.x > p2.x;
const toBottom = (p1: PointT, p2: PointT) => p1.y > p2.y;
const toTop = (p1: PointT, p2: PointT) => p1.y < p2.y;

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

    // first and last points (missing next or prev) and dont have angles

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

    // majority of points

    if (point.a === 90) {
      return { x: p.x + offset, y: p.y + offset };
    }

    if (point.a === 45 && VtoD(p, prev, next)) {
      console.log(`DtoD -> point ${i}`);
      return { x: p.x + offset, y: p.y + offset / 2 };
    }

    if (point.a === 45 && DtoH(p, prev, next)) {
      console.log(`DtoH to left -> point ${i}`);
      return { x: p.x + offset / 2, y: p.y + offset };
    }

    if (point.a === 45 && HtoD(p, prev, next)) {
      console.log(`HtoD -> point ${i}`);
      return { x: p.x + offset / 2, y: p.y + offset };
    }

    if (point.a === 45 && DtoV(p, prev, next)) {
      console.log(`DtoV -> point ${i}`);
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

    console.log(`fallthrough -> point ${i}`);
    return { x: p.x + offset, y: p.y + offset }; // only returns the first point of the segment
  });
};

const getElementSizes = (refs: ElementRefsT): SizesT => {
  if (!refs.pageRef || !refs.pageRef.current) {
    throw new Error("no pageRef or pageRef.current"); // this should already have been asserted but typescript doesn't see it...
  }

  return {
    pgWidth: refs.pageRef.current.clientWidth,
    pgHeight: refs.pageRef.current.clientHeight,
    ttlHeight: +(refs.ttlRef!.current!.offsetHeight ?? 0),
    abtHeight: +(refs.abtRef!.current!.offsetHeight ?? 0),
    projHeight: +(refs.projRef!.current!.offsetHeight ?? 0),
    expHeight: +(refs.expRef!.current!.offsetHeight ?? 0),
    contHeight: +(refs.contRef!.current!.offsetHeight ?? 0),
    ftrHeight: +(refs.ftrRef!.current!.offsetHeight ?? 0),
  };
};

const getLineW = (sizes: SizesT): number => {
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

  return 25;
};

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

// Draw a single Line
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
const drawBgLines = (refs: ElementRefsT, colors: string[]) => {
  const { canvasRef } = refs;
  const ctx = refs.canvasRef?.current?.getContext("2d");

  if (!ctx || !canvasRef || !canvasRef.current) {
    console.log("no context/canvasRef/canvasRef.current!");
    return;
  }

  const elSizes = getElementSizes(refs);

  const lineW = getLineW(elSizes);

  // clear and resize
  resizeAndClearCanvas(canvasRef, ctx, elSizes.pgHeight, elSizes.pgWidth);

  // calculate paths based on element sizes
  const pathA = getPathA(elSizes, lineW, colors.length);
  const pathB = getPathB(elSizes, lineW, colors.length);
  const pathC = getPathC(elSizes, lineW, colors.length);

  // draw paths
  colors.forEach((color, i) => {
    drawLine(ctx, translatePath(pathB, lineW * i, i), lineW, colors[i]);
  });

  colors.forEach((color, i) => {
    drawLine(ctx, translatePath(pathC, lineW * i, i), lineW, colors[i]);
  });

  colors.forEach((color, i) => {
    drawLine(ctx, translatePath(pathA, lineW * i, i), lineW, colors[i]);
  });
};

// The hook that will actually do the drawing in the app.
export function useBgLines(
  refs: ElementRefsT,
  filteredProjects: ProjectsByCompanyT
) {
  useLayoutEffect(() => {
    const colors = variables.colors.split(",");
    const drawBgLinesWRefsApplied = () => drawBgLines(refs, colors);

    drawBgLinesWRefsApplied();
    window.addEventListener("resize", drawBgLinesWRefsApplied);

    return () => window.removeEventListener("resize", drawBgLinesWRefsApplied);
  }, [refs, filteredProjects]);
}
