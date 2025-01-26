import { ProjectT, StrTuple } from "@src/types/data-types.tsx";
import Slider from "@src/components/Slider.tsx";
import StackTable from "@src/components/StackTable";
import ProjectTitle from "@src/components/ProjectTitle";

import { useRef } from "react";
import { useProjectPageLines } from "@src/hooks/useProjectPageLines";

import { paragraphsGen } from "@data/generator.ts";


type ProjectPageProps = {
    project: ProjectT | null
};

function ProjectPage({
    project,
  }: ProjectPageProps) {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const pageRef = useRef<HTMLDivElement | null>(null);
    const ttlRef = useRef<HTMLElement | null>(null);
    const contentRef = useRef<HTMLElement | null>(null);
    const bannerRef = useRef<HTMLElement | null>(null);

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

    return project && (
        <div ref={pageRef} className='page' id='project-detail'>
            <canvas id="canvas" ref={canvasRef} height="100%" width="100%"></canvas>

            <section ref={ttlRef} className="section-title triangle-right">
                <ProjectTitle title={project.title}>
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
