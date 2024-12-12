import { PointT, ElementRefsT, SizesT } from "../types/bg-line-types";

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

export const getElementSizes = (refs: ElementRefsT): SizesT => {
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