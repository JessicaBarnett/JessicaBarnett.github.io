import { ProjectT, TagT, projectHasDetails } from "@src/types/data-types.ts";
import Tag from "@src/components/Tag.tsx";
import { tagSelected } from "@src/utils/util.ts";
import React from "react";
import { Link } from "react-router-dom";

type ProjectComponentProps = {
  project: ProjectT,
  selectedTags: TagT[],
  onTagSelect: (e: React.MouseEvent, tag: TagT) => void,
  onMoreInfoClick?: (e: React.MouseEvent, project: ProjectT) => Promise<void> | void
};

const Project = ({project, selectedTags, onTagSelect, onMoreInfoClick}: ProjectComponentProps) => {
  return (
    <li className="v-spaced">
      <h5 className="title-3">{project.list.title}</h5>
      <p>
        {project.list.description}
        { projectHasDetails(project) && onMoreInfoClick &&
            <Link className="more-info-link" to={`project/${project.slug}`} onClick={(e) => onMoreInfoClick(e, project)} viewTransition>more info</Link>
        }
      </p>

      {project.tags.map((tag: TagT) => (
        <Tag
          key={`${project.slug}-${tag.name}`}
          tag={tag}
          isSelected={tagSelected(tag, selectedTags)}
          onClick={onTagSelect}
        ></Tag>
      ))}
    </li>
  );
};

export default Project;
