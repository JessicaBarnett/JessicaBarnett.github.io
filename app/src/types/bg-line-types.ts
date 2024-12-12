import { RefObject } from "react";

// note the Null options are removed from this type
export type ElementRefsT = {
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
export type SizesT = {
    pgWidth: number;
    pgHeight: number;
    ttlHeight: number;
    abtHeight: number;
    expHeight: number;
    projHeight: number;
    contHeight: number;
    ftrHeight: number;
};

export type PointT = {
    x: number;
    y: number;
    a?: 90 | 45 | 0;
    translate?: (p: PointT, offset: number, lineIdx: number) => PointT;
};
