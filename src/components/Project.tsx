import { ProjectT, TagT } from "@src/types/data-types.tsx";
import Tag from "@src/components/Tag.tsx";
import { tagSelected } from "@src/utils/util.ts";
import React from "react";

type ProjectComponentProps = {
  project: ProjectT,
  selectedTags: TagT[],
  onTagSelect: (tag: TagT, e: React.MouseEvent) => void,
  onMoreInfoClick?: (project: ProjectT) => void
};

const projectHasDetails = (project: ProjectT): boolean => {
  return !!project?.title && !!project?.role && !!project?.time && !!project?.type && !!project?.media?.length && !!project?.table?.length && !!project?.content?.length
}

const Project = ({project, selectedTags, onTagSelect, onMoreInfoClick}: ProjectComponentProps) => {
  return (
    <li className="entry">
      <h5 className="title-3">{project.listTitle}</h5>
      <p>
        {project.description}
        {projectHasDetails(project) && onMoreInfoClick &&
          <button className="btn-link" onClick={() => onMoreInfoClick ? onMoreInfoClick(project) : ''}>more info</button>
        }
      </p>

      {project.tags.map((tag: TagT) => (
        <Tag
          key={`${project.id}-${tag.name}`}
          tag={tag}
          isSelected={tagSelected(tag, selectedTags)}
          onClick={onTagSelect}
        ></Tag>
      ))}
    </li>
  );
};

export default Project;
