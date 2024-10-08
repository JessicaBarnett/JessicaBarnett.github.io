import { ProjectT } from "../types/types";

type ProjectComponentProps = {
  project: ProjectT,
  selectedTags: string[]
};

const Project = ({project, selectedTags}: ProjectComponentProps) => {
  return (
    <>
      <h5 className="title-3">{project.title}</h5>
      <p>{project.description}</p>

      {project.tags.map((tag) => (
        <button
          className={`btn-1 filter-projects ${
            selectedTags.find(tagStr => tagStr === tag.name) ? "selected" : ""
          }`}
          type="button"
        >
          {tag.displayName}
        </button>
      ))}
    </>
  );
};

export default Project;
