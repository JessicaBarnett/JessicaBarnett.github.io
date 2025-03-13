import { useLayoutEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router";
import { useProjects } from "@src/hooks/static/useProjects.ts";
import Slider from "@src/components/Slider.tsx";
import Table from "@src/components/Table";
import ProjectTitle from "@src/components/ProjectTitle";
import { useProjectPageLines } from "@src/hooks/useProjectPageLines";
import { ProjectDetailsT, projectHasDetails, ProjectT } from "@src/types/data-types";
import { RewindIcon } from "@src/icons/RewindIcon";


const findDetailedProjectBySlug = (projects: (ProjectDetailsT | ProjectT)[], slug: string = ''): ProjectDetailsT => {
    const match = projects.find(project => project.slug === slug && projectHasDetails(project)) as ProjectDetailsT;
    return match;
}

type ProjectPageProps = {
    onNavigateBack: (e: React.MouseEvent) => Promise<void>
}

function ProjectPage({onNavigateBack}: ProjectPageProps) {
    const [ projects ] = useProjects();
    const { projectSlug } = useParams();
    const [ project ] = useState(findDetailedProjectBySlug(projects, projectSlug))

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const pageRef = useRef<HTMLDivElement | null>(null);
    const ttlRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const infoRef = useRef<HTMLDivElement | null>(null);
    const bannerRef = useRef<HTMLDivElement | null>(null);

    const onBackBtnClick = (e: React.MouseEvent) => {
        onNavigateBack(e);
    }

    useProjectPageLines(
        canvasRef,
        {
            pageRef,
            ttlRef,
            infoRef,
            bannerRef,
            contentRef,
        }
    );

    useLayoutEffect(() => {
        // do once on page load/navigation
        const navHeight = document.getElementById('nav')?.clientHeight ?? 0;
        window.scrollTo({ top: -(navHeight), behavior: 'instant' });
    }, [])

    return project && (
        <div ref={pageRef} className='page'>
            <canvas id="canvas" ref={canvasRef} height="100%" width="100%"></canvas>

            <NavLink to={`/`} className='back-btn' onClick={(e) => onBackBtnClick(e)} viewTransition>
                <RewindIcon></RewindIcon>
            </NavLink>

            <section ref={ttlRef} className="triangle-right">
                <div className="h-centered v-spaced">
                    <ProjectTitle project={project} />
                </div>
            </section>

            <section ref={infoRef}>
                <div className="h-centered v-spaced">
                    <dl>
                        <dt>Role: </dt>
                        <dd>{project.role}</dd>
                        <dt>Time: </dt>
                        <dd>{project.time}</dd>
                        <dt>Type: </dt>
                        <dd>{project.type}</dd>
                    </dl>
                </div>

                <div className="h-centered v-spaced" ref={bannerRef}>
                    <Slider
                        name="wide-images"
                        options={{ wide: true }}
                        media={project?.media?.filter((p) => p.viewport === "wide") ?? []}
                    ></Slider>
                </div>

                <div className="h-centered v-spaced" ref={contentRef}>
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
                                            name="mobile-images"
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
