// refObjects have a .current, ref callbacks don't.
// I need to distinctify between Ref (joined type,
// could NOT have a current) and RefObject
import { RefObject, useLayoutEffect } from "react";
import { ProjectsByCompanyT } from "./useFilteredProjects";

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
type sizesT = {
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
};

const pink = "#E2006A";
const orange = "#EE6B0F";
const yellow = "#EBE000";
const green = "#82A900";
const blue = "#0084CE";

const stripeConfig = {
  width: 10,
  colors: [blue, green, yellow, orange, pink],
};

// Takes variable Element height/widths and creates a path with them.
const getPathA = ({
  pgWidth,
  ttlHeight,
  abtHeight,
  expHeight,
  projHeight,
}: sizesT,
lineW: number,
lineCt: number): PointT[] => {
  return [
    {
      x: pgWidth - 100, // right side of the page, offset by 100
      y: 0, // slightly beloy page top edge
    },
    {
      x: pgWidth - 100,
      y: ttlHeight - 80,
    },
    {
      x: pgWidth - 180,
      y: ttlHeight, // top-right of the about element
    },
    {
      x: 80,
      y: ttlHeight,
    },
    {
      x: lineW / 2,
      y: ttlHeight + 80, // top-left of the about element
    },
    {
      x: lineW / 2,
      y: ttlHeight + abtHeight + projHeight, // bottom of the Projects Element/ top of experience
    },
    {
      x: lineCt * lineW,
      y: ttlHeight + abtHeight + projHeight + 50,
    },
    {
      x: lineCt * lineW,
      y: ttlHeight + abtHeight + projHeight + expHeight, // bottom of Experience Element
    },
    {
      x: pgWidth - 200,
      y: ttlHeight + abtHeight + projHeight + expHeight, // horizontal across bottom
    },
    {
      x: pgWidth,
      y: ttlHeight + abtHeight + projHeight + expHeight + 150, // final point
    },
  ];
};

const getPathB = ({
  pgWidth,
  ttlHeight,
  abtHeight,
  projHeight,
}: sizesT,
lineW: number,
lineCt: number): PointT[] => {
  return [
    {
      x: 0, // left side
      y: ttlHeight + abtHeight
    },
    {
      x: pgWidth  - (lineW * lineCt), // right side minus line width
      y: ttlHeight + abtHeight
    },
    {
      x: pgWidth  - (lineW * lineCt), // right side minus line width
      y: (ttlHeight + abtHeight + projHeight - 100),
    },
    {
      x: pgWidth - 200,
      y: (ttlHeight + abtHeight + projHeight + 100),
    }
  ];
};

const getPathC = ({
  pgWidth,
  ttlHeight,
  abtHeight,
  expHeight,
  projHeight,
  contHeight,
  ftrHeight
}: sizesT,
lineW: number,
lineCt: number): PointT[] => {
  const pgHeight = ttlHeight + abtHeight + projHeight + expHeight + contHeight + ftrHeight;

  return [
    {
      x: 0, // left side
      y: pgHeight  - (lineW * lineCt),
    },
    {
      x: pgWidth  - (lineW * lineCt), // right side minus line width
      y: pgHeight  - (lineW * lineCt),
    },
    {
      x: pgWidth  - (lineW * lineCt), // right side minus line width
      y:  pgHeight  - (lineW * lineCt) - 300,
    }
  ];
};

// Tests to determine stuff about each segment of the line,
// as some of them need to use different offsets when translating
const vertical = (p1: PointT, p2: PointT): boolean => p1.x === p2.x;
const horizontal = (p1: PointT, p2: PointT): boolean => p1.y === p2.y;
const diagonal = (p1: PointT, p2: PointT): boolean => !vertical(p1, p2) && !horizontal(p1, p2);

const beveled_VtoH_p1 = (p: PointT, prev: PointT, next: PointT, nNext: PointT) => nNext && vertical(p, prev) && diagonal(p, next) && horizontal(next, nNext);
const beveled_VtoH_p2 = (p: PointT, prev: PointT, next: PointT, pPrev: PointT) => pPrev && vertical(prev, pPrev) && diagonal(p, prev) && horizontal(p, next);

const beveled_HtoV_p1 = (p: PointT, prev: PointT, next: PointT, nNext: PointT) => nNext && horizontal(p, prev) && diagonal(p, next) && vertical(next, nNext);
const beveled_HtoV_p2 = (p: PointT, prev: PointT, next: PointT, pPrev: PointT) => pPrev && horizontal(prev, pPrev) && diagonal(p, prev) && vertical(p, next);

const straight_VtoV_p1 = (p: PointT, prev: PointT, next: PointT, nNext: PointT) => nNext && vertical(p, prev) && diagonal(p, next) && vertical(next, nNext);
const straight_VtoV_p2 = (p: PointT, prev: PointT, next: PointT, pPrev: PointT) => pPrev && vertical(prev, pPrev) && diagonal(p, prev) && vertical(p, next);

const translatePath = (path: PointT[], offset: number = stripeConfig.width) => {
  return path.map((point, i, points) => {
    const pPrev = points[i - 2]; // prev-prev point
    const prev = points[i - 1]; // prev point
    const p = point; // first pt of segment
    const next = points[i + 1]; // next point
    const nNext = points[i + 2]; //next-next point

    // if (i === 3) {
    //   debugger;
    // }

    if (!prev && vertical(p, next)) {
      console.log(`no Prev + vertical direction -> point ${i}`);
      return { x: point.x + offset, y: point.y };
    }

    if (!prev && horizontal(p, next)) {
      console.log(`no Prev + horizontal direction -> point ${i}`);
      return { x: point.x, y: point.y  + offset };
    }

    if (!next) {
      console.log(`no Next -> point ${i}`);
      return { x: point.x + offset, y: point.y + offset };
    }

    if (beveled_VtoH_p1(p, prev, next, nNext)) {
      console.log(`beveled_VtoH_p1 -> point ${i}`);
      return { x: p.x + offset, y: p.y + offset/2 };
    }

    if (beveled_VtoH_p2(p, prev, next, pPrev)) {
      console.log(`beveled_VtoH_p2 -> point ${i}`);
      return { x: p.x + offset/2, y: p.y + offset };
    }

    if (beveled_HtoV_p1(p, prev, next, nNext)) {
      console.log(`beveled_HtoV_p1 -> point ${i}`);
      return { x: p.x + offset / 2, y: p.y + offset };
    }

    if (beveled_HtoV_p2(p, prev, next, pPrev)) {
      console.log(`beveled_HtoV_p2 -> point ${i}`);
      return { x: p.x + offset, y: p.y + offset/2 };
    }

    if (straight_VtoV_p1(p, prev, next, nNext)) {
      console.log(`straight_VtoV_p1 -> point ${i}`);
      return { x: p.x + offset, y: p.y };
    }

    if (straight_VtoV_p2(p, prev, next, pPrev)) {
      console.log(`straight_VtoV_p2 -> point ${i}`);
      return { x: p.x + offset, y: p.y};
    }

    console.log(`fallthrough -> point ${i}`);
    return { x: p.x + offset, y: p.y + offset }; // only returns the first point of the segment
  });
};

const getElementSizes = (refs: ElementRefsT) => {
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
  ctx.strokeStyle = color;

  points.forEach((point) => {
    ctx.lineTo(point.x, point.y);
  });

  ctx.stroke();
};

// draw all Lines
const drawBgLines = (refs: ElementRefsT, lineW: number, colors: string[]) => {
  const { canvasRef } = refs;
  const ctx = refs.canvasRef?.current?.getContext("2d");

  if (!ctx || !canvasRef || !canvasRef.current) {
    console.log("no context/canvasRef/canvasRef.current!");
    return;
  }

  const elSizes = getElementSizes(refs);

  // clear and resize
  resizeAndClearCanvas(canvasRef, ctx, elSizes.pgHeight, elSizes.pgWidth);

  // calculate paths based on element sizes
  const pathA = getPathA(elSizes, lineW, colors.length);
  const pathB = getPathB(elSizes, lineW, colors.length);
  const pathC = getPathC(elSizes, lineW, colors.length);

  // draw paths
  colors.forEach((color, i) => {
    drawLine(ctx, translatePath(pathB, i * lineW), lineW, colors[i]);
  })

  colors.forEach((color, i) => {
    drawLine(ctx, translatePath(pathC, i * lineW), lineW, colors[i]);
  })

  colors.forEach((color, i) => {
    drawLine(ctx, translatePath(pathA, i * lineW), lineW, colors[i]);
  });
};

// The hook that will actually do the drawing in the app.
export function useBgLines(
  refs: ElementRefsT,
  filteredProjects: ProjectsByCompanyT
) {
  useLayoutEffect(() => {
    const lineW = 10;
    const colors = [blue, green, yellow, orange, pink];
    const drawBgLinesWRefsApplied = () => drawBgLines(refs, lineW, colors);

    drawBgLinesWRefsApplied();
    window.addEventListener("resize", drawBgLinesWRefsApplied);

    return () => window.removeEventListener("resize", drawBgLinesWRefsApplied);
  }, [refs, filteredProjects]);
}
