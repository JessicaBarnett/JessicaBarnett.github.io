// refObjects have a .current, ref callbacks don't.
// I need to distinctify between Ref (joined type,
// could NOT have a current) and RefObject
import { RefObject, useLayoutEffect } from "react";
import { ProjectsByCompanyT } from "./useFilteredProjects";

// note the Null options are removed from this type
type ElementRefsT = {
    canvasRef: RefObject<HTMLCanvasElement>,
    pageRef: RefObject<HTMLDivElement>,
    ttlRef: RefObject<HTMLElement>,
    abtRef: RefObject<HTMLElement>,
    projRef: RefObject<HTMLElement>,
    expRef: RefObject<HTMLElement>,
    contRef: RefObject<HTMLElement>
}

type sizesT = {
    width: number,
    height: number,
    ttlHeight: number,
    abtHeight: number,
    expHeight: number,
    projHeight: number
}

const getSizes = (refs: ElementRefsT) => {
    if (!refs.pageRef || !refs.pageRef.current) {
        throw new Error("no pageRef or pageRef.current"); // this should already have been asserted but typescript doesn't see it...
    }

    return {
        width: refs.pageRef.current.clientWidth,
        height: refs.pageRef.current.clientHeight,
        ttlHeight: +(refs.ttlRef!.current!.offsetHeight ?? 0),
        abtHeight: +(refs.abtRef!.current!.offsetHeight ?? 0),
        projHeight: +(refs.projRef!.current!.offsetHeight ?? 0),
        expHeight: +(refs.expRef!.current!.offsetHeight ?? 0)
     }
}

const resizeAndClearCanvas = (canvasRef: RefObject<HTMLCanvasElement>, ctx: CanvasRenderingContext2D, height: number, width: number) => {
    if (!canvasRef || !canvasRef.current) {
        throw new Error("no canvasRef or canvasRef.current");  // this should already have been asserted but typescript doesn't see it...
    }
    canvasRef.current.setAttribute('height', `${height}px`);
    canvasRef.current.setAttribute('width', `${width}px`);
    ctx.clearRect(0, 0, height, width); // clear
}

const getPath = ({width, ttlHeight, abtHeight, expHeight, projHeight}: sizesT): [number, number][] => {
    return [
        [(width - 100), 10],
        [(width - 100), ttlHeight],
        [10, ttlHeight],
        [10, (ttlHeight + abtHeight + projHeight)],
        [50, (ttlHeight + abtHeight + projHeight)],
        [50, (ttlHeight + abtHeight + projHeight + expHeight)],
        [width - 100, (ttlHeight + abtHeight + projHeight + expHeight)],
        [width, (ttlHeight + abtHeight + projHeight + expHeight + 80)]
    ];
}

const drawBgLines = (refs: ElementRefsT) => {
    const {canvasRef } = refs;
    const ctx = refs.canvasRef?.current?.getContext('2d');


    if (!ctx || !canvasRef || !canvasRef.current) {
        console.log('no context/canvasRef/canvasRef.current!')
        return;
    }

    const sizes = getSizes(refs);

    resizeAndClearCanvas(canvasRef, ctx, sizes.height, sizes.width)

    const path = getPath(sizes);

    ctx.beginPath()
    path.forEach((point, idx) => {
        if (idx === 0) {
        ctx.moveTo(...point);
        } else {
        ctx.lineTo(...point);
        }
    });

    ctx.lineWidth = 5;
    ctx.strokeStyle = "#0084CE";
    ctx.stroke();
 }

export function useBgLines(refs: ElementRefsT, filteredProjects: ProjectsByCompanyT) {

     useLayoutEffect(() => {
        const drawBgLinesWRefs = () => drawBgLines(refs);

        drawBgLinesWRefs();
        window.addEventListener('resize', drawBgLinesWRefs);

        return () => window.removeEventListener('resize', drawBgLinesWRefs);
      }, [refs, filteredProjects]);

 }
