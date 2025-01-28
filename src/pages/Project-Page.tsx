import { ProjectDetailsT } from "@src/types/data-types.tsx";
import Slider from "@src/components/Slider.tsx";
import Table from "@src/components/Table";
import ProjectTitle from "@src/components/ProjectTitle";

import { useRef } from "react";
import { useProjectPageLines } from "@src/hooks/useProjectPageLines";


type ProjectPageProps = {
    project: ProjectDetailsT | null
};

function ProjectPage({
    project,
}: ProjectPageProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const pageRef = useRef<HTMLDivElement | null>(null);
    const ttlRef = useRef<HTMLElement | null>(null);
    const contentRef = useRef<HTMLElement | null>(null);
    const bannerRef = useRef<HTMLElement | null>(null);

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
                <ProjectTitle project={project} />
            </section>

            <section ref={bannerRef} className="project-banner">
                <dl>
                    <dt>Role: </dt>
                    <dd>{project.role}</dd>
                    <dt>Time: </dt>
                    <dd>{project.time}</dd>
                    <dt>Type: </dt>
                    <dd>{project.type}</dd>
                </dl>
                <div>
                    <Slider
                        options={{ wide: true }}
                        media={project?.media?.filter((p) => p.viewport === "wide") ?? []}
                    ></Slider>
                </div>
            </section>

            <section ref={contentRef} className="project-info">
                <div>
                    {project.content.map((content, idx) => {
                        return (
                            <>
                                {idx === 0 && (
                                    <div className="left">
                                        <Table data={project.table}></Table>
                                    </div>
                                )}
                                {idx === 1 && (
                                    <div className="right">
                                        <Slider
                                            options={{ mobile: true }}
                                            media={project?.media?.filter((p) => p.viewport === "mobile") ?? []}
                                        ></Slider>
                                    </div>
                                )}
                                <h4 className="clear">{content.heading}</h4>
                                {content.paragraphs.map((paragraph) => (<p>{paragraph}</p>))}
                            </>
                        )
                    })}
                </div>
            </section>
        </div>
    );
}

export default ProjectPage;
