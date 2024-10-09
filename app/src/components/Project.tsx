import { ProjectT } from "../types/types";

/*
 import this hook:
   const [selectedTags, setSelectedTags] = useState([]);
   update it when button is clicked
 */


type ProjectComponentProps = {
  project: ProjectT,
  selectedTags: string[]
};

const Project = ({project, selectedTags}: ProjectComponentProps) => {
  // const [selectedTags, setSelectedTags] = useState([]);

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
          onClick={(e) => { /*  update selectedTag state to equal    */ }}
        >
          {tag.displayName}
        </button>
      ))}
    </>
  );
};

export default Project;
