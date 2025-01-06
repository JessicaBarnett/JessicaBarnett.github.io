import { ProjectT, TagT } from "@src/types/data-types.tsx";
import Tag from "@src/components/Tag.tsx";
import { tagSelected } from "@src/utils/util.ts";

type ProjectComponentProps = {
  project: ProjectT,
  selectedTags: TagT[],
  onTagSelect: (tag: TagT) => void
};

const Project = ({project, selectedTags, onTagSelect}: ProjectComponentProps) => {
  return (
    <li className="entry" key={project.id}>
      <h5 className="title-3">{project.title}</h5>
      <p>{project.description}</p>

      {project.tags.map((tag: TagT) => (
        <Tag
          tag={tag}
          isSelected={tagSelected(tag, selectedTags)}
          onClick={onTagSelect}
        ></Tag>
      ))}
    </li>
  );
};

export default Project;
