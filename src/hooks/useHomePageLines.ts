import { RefObject, useLayoutEffect } from "react"; // refObject always has a .current.  ref, does not.  Need to specify
import { ProjectsByCompanyT } from "@src/hooks/useFilteredProjects.ts";
import { CssVariablesT } from "@src/types/css-variables-types.ts";
import { useCssVariables } from "@src/hooks/static/useCssVariables.ts";

import {
  PointT,
  getLineW,
  resizeAndClearCanvas,
  drawLine,
  translatePath,
  refHeight
} from "@src/utils/bg-line-utils.ts";


// note the Null options are removed from this type
export type HomeElementRefsT = {
  pageRef: RefObject<HTMLDivElement>;
  ttlRef: RefObject<HTMLElement>;
  abtRef: RefObject<HTMLElement>;
  projRef: RefObject<HTMLElement>;
  expRef: RefObject<HTMLElement>;
  contRef: RefObject<HTMLElement>;
  ftrRef: RefObject<HTMLElement>;
};

// element sizes
export type HomeSizesT = {
  pgWidth: number;
  pgHeight: number;
  ttlHeight: number;
  abtHeight: number;
  expHeight: number;
  projHeight: number;
  contHeight: number;
  ftrHeight: number;
};

/********************************/
/******* Required Refs ********/
/********************************/

export const getElementSizes = (refs: HomeElementRefsT): HomeSizesT => {
    if (!refs.pageRef || !refs.pageRef.current) {
      throw new Error("no pageRef or pageRef.current"); // this should already have been asserted but typescript doesn't see it...
    }

    return {
      pgWidth: refs.pageRef.current.clientWidth,
      pgHeight: refs.pageRef.current.clientHeight,
      ttlHeight: refHeight(refs.ttlRef),
      abtHeight: refHeight(refs.abtRef),
      projHeight: refHeight(refs.projRef),
      expHeight: refHeight(refs.expRef),
      contHeight: refHeight(refs.contRef),
      ftrHeight: refHeight(refs.ftrRef),
    };
  };

/********************************/
/******* Path Definitions ********/
/********************************/

export const getPathA = (
  { pgWidth, ttlHeight, abtHeight, expHeight, projHeight }: HomeSizesT,
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
      x: pgWidth - (100 + 15 * (pgWidth * 0.005)), // I have no idea how I came up with this math
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

export const getPathB = (
  { pgWidth, ttlHeight, abtHeight, projHeight }: HomeSizesT,
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

export const getPathC = (
  {
    pgWidth,
    ttlHeight,
    abtHeight,
    expHeight,
    projHeight,
    contHeight,
    ftrHeight,
  }: HomeSizesT,
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


// draw all Lines
const drawBgLines = (
  canvasRef: RefObject<HTMLCanvasElement>,
  refs: HomeElementRefsT,
  cssVars: CssVariablesT
) => {
  const ctx = canvasRef.current?.getContext("2d");

  // need this as an array
  const colors = [
    cssVars.colors.blue,
    cssVars.colors.green,
    cssVars.colors.yellow,
    cssVars.colors.orange,
    cssVars.colors.pink,
  ];

  if (!ctx || !canvasRef || !canvasRef.current) {
    return;
  }

  // get sizes of elements and lines
  const elSizes = getElementSizes(refs);
  const lineW = getLineW(elSizes.pgWidth, cssVars);

  // clear and resize
  resizeAndClearCanvas(canvasRef, ctx, elSizes.pgHeight, elSizes.pgWidth);

  // calculate paths based on element sizes
  const pathA = getPathA(elSizes, lineW, colors.length);
  const pathB = getPathB(elSizes, lineW, colors.length);
  const pathC = getPathC(elSizes, lineW, colors.length);


  // draw paths, bottom to top
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

export function useHomePageLines(
  canvasRef: RefObject<HTMLCanvasElement>,
  refs: HomeElementRefsT,
  filteredProjects: ProjectsByCompanyT,
  formState: string
) {
  const cssVars =  useCssVariables();

  useLayoutEffect(() => {
    const drawBgLinesWRefsApplied = () =>
      drawBgLines(canvasRef, refs, cssVars);
    requestAnimationFrame(drawBgLinesWRefsApplied);

    drawBgLinesWRefsApplied();
    window.addEventListener("resize", drawBgLinesWRefsApplied);

    return () => window.removeEventListener("resize", drawBgLinesWRefsApplied); // cleanup fn
  }, [refs, canvasRef, filteredProjects, formState, cssVars]);
}