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

type PointT = {
    x: number,
    y: number,
    d: {
        x: number, // amt to add to x
        y: number // amt to add to y
    },
}

const pink = "#E2006A";
const orange = "#EE6B0F";
const yellow = "#EBE000";
const green = "#82A900";
const blue = "#0084CE";

const stripeConfig = {
    width: 10,
    colors: [
        blue,
        green,
        yellow,
        orange,
        pink
    ]
};

const directions = {
    vertical: {
        x: stripeConfig.width,
        y: 0
    },
   horizontal: {
        x: 0,
        y: stripeConfig.width
    },
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

const drawSegment = (ctx: CanvasRenderingContext2D, p1: PointT, p2: PointT ) => {
    stripeConfig.colors.forEach((color, idx) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.moveTo(p1.x + (idx * p1.d.x), p1.y + (idx * p1.d.y));
        ctx.lineTo(p2.x + (idx * p2.d.x), p2.y + (idx * p2.d.y));
        ctx.stroke();
    });
}

const getPath = ({width, ttlHeight, abtHeight, expHeight, projHeight}: sizesT): PointT[] => {
    return [
        {
            x: width - 100,
            y: 10,
            d: directions.vertical
        },{
            x: width - 100,
            y: ttlHeight,
            d: directions.vertical
        },{
            x: width - 100,
            y: ttlHeight,
            d: directions.horizontal
        },{
            x: 10,
            y: ttlHeight,
            d: directions.horizontal
        },{
            x: 10,
            y: ttlHeight,
            d: directions.vertical
        },{
            x: 10,
            y: (ttlHeight + abtHeight + projHeight),
            d: directions.vertical
        },{
            x: 50,
            y: (ttlHeight + abtHeight + projHeight),
            d: directions.vertical
        },{
            x: 50,
            y: (ttlHeight + abtHeight + projHeight + expHeight),
            d: directions.vertical
        },{
            x: 50,
            y: (ttlHeight + abtHeight + projHeight + expHeight),
            d: directions.horizontal
        },{
            x: width - 100,
            y: (ttlHeight + abtHeight + projHeight + expHeight),
            d: directions.horizontal
        },{
            x: width,
            y: (ttlHeight + abtHeight + projHeight + expHeight + 80),
            d: directions.horizontal
        }
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

    ctx.lineWidth = stripeConfig.width;
    path.forEach((_, idx) => {
        if (idx === 0) { return; } // don't do anything at idx 0.  need 2 points
        drawSegment(ctx, path[idx - 1], path[idx]);
    });
}

export function useBgLines(refs: ElementRefsT, filteredProjects: ProjectsByCompanyT) {

    useLayoutEffect(() => {
    const drawBgLinesWRefsApplied = () => drawBgLines(refs);

    drawBgLinesWRefsApplied();
    window.addEventListener('resize', drawBgLinesWRefsApplied);

    return () => window.removeEventListener('resize', drawBgLinesWRefsApplied);
    }, [refs, filteredProjects]);

}
