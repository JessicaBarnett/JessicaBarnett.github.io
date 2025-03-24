import { RefObject } from "react"; // refObject always has a .current.  ref, does not.  Need to specify
import { CssVariablesT } from "@src/types/css-variables-types.ts";

export type PointT = {
  x: number;
  y: number;
  a?: 90 | 45 | 0;
  translate?: (p: PointT, offset: number, lineIdx: number) => PointT;
};

// import { useCssVariables } from "@src/hooks/static/useCssVariables.ts";

// Tests to determine stuff about each segment of the line,
// as some of them need to use different offsets when translating
export const vertical = (p1: PointT, p2: PointT): boolean => p1.x === p2.x;
export const horizontal = (p1: PointT, p2: PointT): boolean => p1.y === p2.y;
export const diagonal = (p1: PointT, p2: PointT): boolean =>
  !vertical(p1, p2) && !horizontal(p1, p2);

// const toRight = (p1: PointT, p2: PointT) => p1.x < p2.x;
// const toLeft = (p1: PointT, p2: PointT) => p1.x > p2.x;
// const toBottom = (p1: PointT, p2: PointT) => p1.y > p2.y;
// const toTop = (p1: PointT, p2: PointT) => p1.y < p2.y;

export const VtoD = (p: PointT, prev: PointT, next: PointT) =>
  prev && next && vertical(p, prev) && diagonal(p, next);
export const DtoH = (p: PointT, prev: PointT, next: PointT) =>
  prev && next && diagonal(p, prev) && horizontal(p, next);
export const HtoD = (p: PointT, prev: PointT, next: PointT) =>
  prev && next && horizontal(p, prev) && diagonal(p, next);
export const DtoV = (p: PointT, prev: PointT, next: PointT) =>
  prev && next && diagonal(p, prev) && vertical(p, next);

export const refHeight = (ref: RefObject<HTMLElement>): number => +(ref!.current!.offsetHeight ?? 0)

/******************************/
/******* Drawing Stuff ********/
/******************************/

export const resizeAndClearCanvas = (
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
export const getLineW = (pgWidth: number, cssVars: CssVariablesT): number => {
  const { breakpoints, rainbow } = cssVars;

  if (pgWidth <= parseInt(breakpoints.smallBp)) {
    return parseInt(rainbow.lineWidthXsm);
  }

  if (pgWidth <= parseInt(breakpoints.mediumBp)) {
    return parseInt(rainbow.lineWidthSm);
  }

  if (pgWidth <= parseInt(breakpoints.wideBp)) {
    return parseInt(rainbow.lineWidthMed);
  }

  return parseInt(rainbow.lineWidthLg);
};

// Given the points for the first line, translate all points and return new path
// in other words, since we only have points for the blue line, this fn calculates
// the paths/points for the other 4 lines
export const translatePath = (path: PointT[], offset: number, lineIdx: number) => {
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
export const drawLine = (
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


// export const nextStep = (points: PointT[]) => {}

export const drawFrame  = (
  ctx: CanvasRenderingContext2D,
  points: PointT[], // we need the length of this path as well
  lineW: number,
  // length: number, // length for this step,
  color: string
) => {
  // this is all the same
  ctx.beginPath();
  ctx.lineWidth = lineW;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.strokeStyle = color;

  // need to be able to get the length

  // draw the line in points, BUT only draw up to the length

  points.forEach((point) => {
    // if we have reached the end of our length, return
    ctx.lineTo(point.x, point.y); // point x & y should
  });

  ctx.stroke();
};

// export const animateLine  = (
//   ctx: CanvasRenderingContext2D,
//   points: PointT[],
//   lineW: number,
//   color: string
// ) => {
//   // on a timer, call drawFrame
// };