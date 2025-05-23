import DOMPurify from 'dompurify';
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router";
import { useProjects } from "@src/hooks/static/useProjects.ts";
import Slider from "@src/components/Slider.tsx";
import Table from "@src/components/Table";
import ProjectTitle from "@src/components/ProjectTitle";
import { useProjectPageLines } from "@src/hooks/useProjectPageLines";
import { projectHasDetails, ProjectT } from "@src/types/data-types";
import { RewindIcon } from "@src/icons/RewindIcon";

const findDetailedProjectBySlug = (projects: (ProjectT)[], slug: string = ''): ProjectT => {
    const match = projects.find(project => project.slug === slug && projectHasDetails(project)) as ProjectT;
    return match;
}

// Splits html content into 2 parts at a specific string.
// 2 parts will be rendered before and after the slider.
// if string split delimiter isn't found, just returns 1 chunk
const splitContent = (htmlText: string) => {
    const splitStr = '<SLIDER>';
    const splitIdx = htmlText.search(splitStr);
    if (splitIdx > 0) {
        return [
            htmlText.substring(0, splitIdx),
            htmlText.substring(splitIdx + splitStr.length, htmlText.length)
        ]
    } else {
        return [htmlText];
    }
}


type ProjectPageProps = {
    onNavigateBack: (e: React.MouseEvent) => Promise<void>
}

function ProjectPage({onNavigateBack}: ProjectPageProps) {
    const [ projects ] = useProjects();
    const { projectSlug } = useParams();
    const [ project ] = useState(findDetailedProjectBySlug(projects, projectSlug))
    const [ contentArr, setContentArr ] = useState<string[]>([]);


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

    useEffect(() => {
        if (project.detail && project.detail.content) {
            setContentArr(splitContent(project.detail.content));
        }
    }, [project])

    return project && project.detail && (
        <div ref={pageRef} className='page'>
            <canvas id="canvas" ref={canvasRef} height="100%" width="100%"></canvas>

            <NavLink to={`/`} className='back-btn' onClick={(e) => onBackBtnClick(e)} viewTransition>
                <RewindIcon></RewindIcon>
            </NavLink>

            <section ref={ttlRef} className="project-title-section triangle-right">
                <div className="h-centered">
                    <ProjectTitle title={project.detail.title} subtitle={project.detail.subtitle ?? undefined} />
                </div>
            </section>

            <section ref={infoRef}>
                <div className="h-centered v-spaced">
                    <dl>
                        <dt>Role: </dt>
                        <dd>{project.detail.role}</dd>
                        <dt>Time: </dt>
                        <dd>{project.detail.time}</dd>
                        <dt>Type: </dt>
                        <dd>{project.detail.type}</dd>
                    </dl>
                </div>

                <div className="h-centered v-spaced" ref={bannerRef}>
                    {/* TODO: there are potentially perf issues with having multiple sliders.
                        Would perhaps be better to have one slider with hide-able slides? */}
                    <Slider
                        name="wide-images"
                        options={{
                            // fixHeights: true,
                            wide: true,
                            sliderClass: 'hidden-at-small'
                        }}
                        media={project?.media?.filter((p) => p.width >= 1280) ?? []}
                    ></Slider>

                    <Slider
                        name="all-images"
                        options={{
                            wide: true,
                            sliderClass: 'visible-at-small'
                        }}
                        media={project?.media ?? []}
                    ></Slider>
                </div>

                <div className="h-centered v-spaced" ref={contentRef}>
                    <div className="left">
                        <Table data={project.detail.table}></Table>
                    </div>
                    <div dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(contentArr[0]),
                    }}></div>
                    <div className="right">
                        <Slider
                            name="mobile-images"
                            options={{
                                // fixHeights: true,
                                tall: true,
                                sliderClass: 'hidden-at-small'
                            }}
                            media={project?.media?.filter((p) => p.width < 1280) ?? []}
                        ></Slider>
                    </div>
                    <div dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(contentArr[1]),
                    }}></div>
                </div>
            </section>
        </div>

    );
}

export default ProjectPage;
