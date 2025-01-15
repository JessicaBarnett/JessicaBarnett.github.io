import { ProjectT, TagT } from "@src/types/data-types.tsx";
import Tag from "@src/components/Tag.tsx";
import { tagSelected } from "@src/utils/util.ts";
import React from "react";

type ProjectComponentProps = {
  project: ProjectT,
  selectedTags: TagT[],
  onTagSelect: (tag: TagT, e: React.MouseEvent) => void,
  onMoreInfoClick: (e: React.MouseEvent) => void,
};

const Project = ({project, selectedTags, onTagSelect, onMoreInfoClick}: ProjectComponentProps) => {
  const hasMoreInfo = (): boolean => !!project.detailed_description && !!project.media && !!project.media.length;

  return (
    <li className="entry">
      <h5 className="title-3">{project.title}</h5>
      <p>
        {project.description}
        {hasMoreInfo() &&
          <button className="btn-link" onClick={onMoreInfoClick}>more info</button>
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
