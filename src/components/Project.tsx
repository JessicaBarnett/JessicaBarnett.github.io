import { ProjectT, TagT, projectHasDetails } from "@src/types/data-types.ts";
import Tag from "@src/components/Tag.tsx";
import { tagSelected } from "@src/utils/util.ts";
import React from "react";
import { NavLink } from "react-router";

type ProjectComponentProps = {
  project: ProjectT,
  selectedTags: TagT[],
  onTagSelect: (tag: TagT, e: React.MouseEvent) => void,
  onMoreInfoClick?: (project: ProjectT) => void
};

const Project = ({project, selectedTags, onTagSelect, onMoreInfoClick}: ProjectComponentProps) => {
  return (
    <li className="v-spaced">
      <h5 className="title-3">{project.listTitle}</h5>
      <p>
        {project.description}
        { projectHasDetails(project) && onMoreInfoClick &&
            <NavLink to={`/project/${project.slug}`} onClick={() => onMoreInfoClick(project)}>more info</NavLink>
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
