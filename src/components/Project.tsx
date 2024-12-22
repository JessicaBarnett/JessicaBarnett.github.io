import { ProjectT, TagT } from "../types/data-types";

type ProjectComponentProps = {
  project: ProjectT,
  selectedTags: TagT[],
  onTagSelect: (name: string) => void
};

const Project = ({project, selectedTags, onTagSelect}: ProjectComponentProps) => {
  return (
    <li className="entry" key={project.id}>
      <h5 className="title-3">{project.title}</h5>
      <p>{project.description}</p>

      {project.tags.map((projTag) => (
        <button
          className={`btn-1 filter-projects ${
            selectedTags.find(selTag => selTag.name === projTag.name) ? "selected" : ""
          }`}
          type="button"
          value={projTag.name}
          onClick={(e) => { onTagSelect(e.currentTarget.value)}}
        >
          {projTag.displayName}
        </button>
      ))}
    </li>
  );
};

export default Project;
