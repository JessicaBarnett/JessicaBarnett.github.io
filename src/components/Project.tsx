import { ProjectT, TagT } from "@src/types/data-types.tsx";
import Tag from "@src/components/Tag.tsx";
import { tagSelected } from "@src/utils/util.ts";
import React from "react";
import { Link } from "react-router";

type ProjectComponentProps = {
  project: ProjectT,
  selectedTags: TagT[],
  onTagSelect: (tag: TagT, e: React.MouseEvent) => void,
};

const Project = ({project, selectedTags, onTagSelect}: ProjectComponentProps) => {
  // const hasMoreInfo = (): boolean => !!project.task && !!project.media && !!project.media.length;
  // const hasMoreInfo = (): boolean => false;
  const hasMoreInfo = (): boolean => true;


  return (
    <li className="entry">
      <h5 className="title-3">{project.title}</h5>
      <p>
        {project.description}
        {hasMoreInfo() &&
          <Link className="btn-link" to={`/projects/${project.title}`} viewTransition>more info</Link>
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
