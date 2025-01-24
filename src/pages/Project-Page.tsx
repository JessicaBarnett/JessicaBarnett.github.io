import { ProjectT, StrTuple } from "@src/types/data-types.tsx";
import Slider from "@src/components/Slider.tsx";
import StackTable from "@src/components/StackTable";
import ProjectTitle from "@src/components/ProjectTitle";

import { useProjects } from "@src/hooks/static/useProjects.ts";
import { useEffect, useRef } from "react";
import { useProjectPageLines } from "@src/hooks/useProjectPageLines";

import { paragraphsGen } from "@data/generator.ts";
import { RewindIcon } from "@src/icons/RewindIcon";
import { Link, useViewTransitionState } from "react-router";

//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

function ProjectPage() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const pageRef = useRef<HTMLDivElement | null>(null);
    const ttlRef = useRef<HTMLElement | null>(null);
    const contentRef = useRef<HTMLElement | null>(null);
    const bannerRef = useRef<HTMLElement | null>(null);
    const isTransitioning = useViewTransitionState('/');

    useEffect(() => {
      console.log('transitioning from page')
    }, [isTransitioning])

    const text = paragraphsGen(3);
    const stackData: StrTuple[] = [
        ["Framework", "Ruby on Rails"],
        ["Server Language", "Ruby"],
        ["Templates", "Haml"],
        ["CSS preprossor", "SCSS"],
        ["Javascript Tools", "JQuery, JQueryUi, LoDash, SlickSlider"],
        ["Database", "MongoDb"],
    ];

    useProjectPageLines(
        canvasRef,
        {
        pageRef,
        ttlRef,
        bannerRef,
        contentRef,
        }
    );

    const [projects] = useProjects();
    const project: ProjectT = projects.find(
        (project) => project.id === "wl-p-002"
    )!;

    return (
        <div ref={pageRef} className="page">
            <canvas id="canvas" ref={canvasRef} height="100%" width="100%"></canvas>

            {/* <div className="back-btn-container"> */}
                <Link className="back-btn" to={`/`} viewTransition>
                    <RewindIcon></RewindIcon>
                </Link>
            {/* </div> */}

            <section ref={ttlRef} className="section-title triangle-right">
                <ProjectTitle title="Woodcraft" subtitle="& Japan Woodworker">
                </ProjectTitle>
            </section>

            <section ref={bannerRef} className="project-banner">
                <Slider
                    className="full"
                    media={project?.media?.filter((p) => p.viewport === "wide") ?? []}
                ></Slider>
            </section>

            <section ref={contentRef} className="project-info">

                <div className="grid">
                    <div className="half">
                        <StackTable data={stackData}></StackTable>
                        <p>{text}</p>
                    </div>
                    <div className="half">
                        <h4>Stack</h4>
                        <p>{text}</p>
                    </div>
                    <Slider
                        className="half"
                        media={project?.media?.filter((p) => p.viewport === "mobile") ?? []}
                    ></Slider>

                    <div className="half">
                        <h4>Results</h4>
                        <p>{text}</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ProjectPage;
