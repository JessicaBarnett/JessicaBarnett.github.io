import { ProjectT, TagT } from "@src/types/data-types.tsx";
import Tag from "@src/components/Tag.tsx";

type ProjectComponentProps = {
  project: ProjectT,
  selectedTags: TagT[],
  onTagSelect: (name: string) => void
};

const Project = ({project, selectedTags, onTagSelect}: ProjectComponentProps) => {
  const tagSelected = (tag: TagT): boolean => {
    return !!selectedTags.find(selTag => selTag.name === tag.name);
  }

  return (
    <li className="entry" key={project.id}>
      <h5 className="title-3">{project.title}</h5>
      <p>{project.description}</p>

      {project.tags.map((projTag: TagT) => (
        <Tag tag={projTag}
          isSelected={tagSelected(projTag)}
          onClick={onTagSelect}
        ></Tag>
      ))}
    </li>
  );
};

export default Project;
