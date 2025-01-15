import { ProjectT, TagT } from "@src/types/data-types.tsx";
import Tag from "@src/components/Tag.tsx";
import { tagSelected } from "@src/utils/util.ts";

import Slider from "@src/components/Slider.tsx";

type ProjectDetailsComponentProps = {
    project: ProjectT;
    selectedTags: TagT[];
};

const ProjectDetails = ({
    project,
    selectedTags,
}: ProjectDetailsComponentProps) => {
    if (!project.detailed_description || !project.media?.length) {
        return;
    }

    return (
        <div className="more-info grid">
            <div className="left-page half">
                <Slider media={project.media}></Slider>
            </div>
            <div className="right-page half">
                <div className="detailed-description">
                    <h3>{project.title}</h3>
                    {project.tags.map((tag: TagT) => (
                        <Tag
                            key={`${project.id}-${tag.name}`}
                            tag={tag}
                            isSelected={tagSelected(tag, selectedTags)}
                        ></Tag>
                    ))}
                    <div>{project.detailed_description}</div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
