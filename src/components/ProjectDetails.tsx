import { ProjectT, TagT } from "@src/types/data-types.tsx";
import Tag from "@src/components/Tag.tsx";
import { tagSelected } from "@src/utils/util.ts";

import Slider from "@src/components/Slider.tsx";
import { useState } from "react";

type ProjectDetailsComponentProps = {
    project: ProjectT | null;
    selectedTags: TagT[];
};

const ProjectDetails = ({
    project,
    selectedTags,
}: ProjectDetailsComponentProps) => {
    const [showLeftPage, updateShowLeftPage] = useState<boolean>(false);

    if (!project || !project.task || !project.media?.length) {
        return;
    }

    return (
        <div className={`more-info grid ${showLeftPage ? 'show-left-page' : ''}`} >
            <div className="left-page half">
                <button className="turn-pg-btn-right" onClick={() =>
                    updateShowLeftPage(false)
                }></button>
                <Slider media={project.media}></Slider>
            </div>
            <div className="right-page half">
                <button className="turn-pg-btn-left" onClick={() =>
                    updateShowLeftPage(true)
                }></button>
                <div className="detailed-description">
                    <h3>{project.title}</h3>
                    {project.tags.map((tag: TagT) => (
                        <Tag
                            key={`${project.id}-${tag.name}`}
                            tag={tag}
                            isSelected={tagSelected(tag, selectedTags)}
                        ></Tag>
                    ))}
                    <div>{project.task}</div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
