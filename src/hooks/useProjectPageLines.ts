import { RefObject, useLayoutEffect } from "react"; // refObject always has a .current.  ref, does not.  Need to specify
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
export type ProjectElementRefsT = {
  pageRef: RefObject<HTMLDivElement>;
  ttlRef: RefObject<HTMLElement>;
  bannerRef: RefObject<HTMLElement>;
  contentRef:RefObject<HTMLElement>;
};

// element sizes
export type ProjectSizesT = {
  pgWidth: number;
  pgHeight: number;
  ttlHeight: number;
  bannerHeight: number;
  contentHeight: number;
};

/********************************/
/******* Required Refs ********/
/********************************/

export const getElementSizes = (refs: ProjectElementRefsT): ProjectSizesT => {
    if (!refs.pageRef || !refs.pageRef.current) {
      throw new Error("no pageRef or pageRef.current"); // this should already have been asserted but typescript doesn't see it...
    }

    return {
      pgWidth: refs.pageRef.current.clientWidth,
      pgHeight: refs.pageRef.current.clientHeight,
      ttlHeight: refHeight(refs.ttlRef),
      bannerHeight: refHeight(refs.bannerRef),
      contentHeight: refHeight(refs.contentRef)
    };
  };

/********************************/
/******* Path Definitions ********/
/********************************/

export const getPathA = (
  { pgWidth, ttlHeight, contentHeight, bannerHeight }: ProjectSizesT,
  lineW: number,
  lineCt: number
): PointT[] => {
  const linesW = lineW * lineCt;

  return [
    {
      x: 0, // right side of the page, offset by 100
      y: 0, // slightly below page top edge
    },
    {
      x: 0,
      y: ttlHeight ,
      a: 45,
    },
    {
      x: pgWidth - linesW + lineW,
      y: ttlHeight,
      a: 90
    },
    {
      x:  pgWidth - linesW + lineW,
      y: ttlHeight + bannerHeight + contentHeight - (2*linesW),
    },

  ];
};

export const getPathB = (
  { pgWidth, ttlHeight, bannerHeight, contentHeight}: ProjectSizesT,
  lineW: number,
  lineCt: number
): PointT[] => {
  const linesW = lineW * lineCt;

  return [

    {
      x: -100,
      y: ttlHeight + bannerHeight + (2*linesW),
      a: 90
    },
    {
      x: 0,
      y: ttlHeight + bannerHeight  + (2*linesW),
    },
    {
      x: 0,
      y: ttlHeight + bannerHeight + contentHeight - linesW,
      a: 0
    },
    {
      x: pgWidth  - (2*linesW),
      y: ttlHeight +  bannerHeight + contentHeight - linesW,
      a: 0
    },
    {
      x: pgWidth  - (2*linesW),
      y: ttlHeight +  bannerHeight + contentHeight + 100,
      a: 0
    },
  ];
};


// draw all Lines
const drawBgLines = (
  canvasRef: RefObject<HTMLCanvasElement>,
  refs: ProjectElementRefsT,
  cssVars: CssVariablesT
) => {
  const ctx = canvasRef.current?.getContext("2d");

  if (!ctx || !canvasRef || !canvasRef.current) {
    return;
  }

  // need this as an array
  // const colors = [
  //   cssVars.colors.wc5,
  //   cssVars.colors.wc4,
  //   cssVars.colors.wc3,
  //   cssVars.colors.wc2,
  //   cssVars.colors.wc1,
  // ];

  const colors = [
    cssVars.colors.blue,
    cssVars.colors.green,
    cssVars.colors.yellow,
    cssVars.colors.orange,
    cssVars.colors.pink,
  ];

  // get sizes of elements and lines
  const elSizes = getElementSizes(refs);
  const lineW = getLineW(elSizes.pgWidth, cssVars);

  // clear and resize
  resizeAndClearCanvas(canvasRef, ctx, elSizes.pgHeight, elSizes.pgWidth);

  // calculate paths based on element sizes
  const pathA = getPathA(elSizes, lineW, colors.length);
  const pathB = getPathB(elSizes, lineW, colors.length);


  // draw paths, bottom to top
  colors.forEach((color, i) => {
    drawLine(ctx, translatePath(pathB, lineW * i, i), lineW, color);
  });

  colors.forEach((color, i) => {
    drawLine(ctx, translatePath(pathA, lineW * i, i), lineW, color);
  });
};

/******************************/
/******* Hook Function ********/
/******************************/

export function useProjectPageLines(
  canvasRef: RefObject<HTMLCanvasElement>,
  refs: ProjectElementRefsT,
) {
  const cssVars =  useCssVariables();

  useLayoutEffect(() => {
    const drawBgLinesWRefsApplied = () =>
      drawBgLines(canvasRef, refs, cssVars);
    requestAnimationFrame(drawBgLinesWRefsApplied);

    drawBgLinesWRefsApplied();
    window.addEventListener("resize", drawBgLinesWRefsApplied);

    return () => window.removeEventListener("resize", drawBgLinesWRefsApplied); // cleanup fn
  }, [refs, canvasRef]);
}