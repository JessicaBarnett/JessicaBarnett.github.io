import { ProjectT, TagT } from '../types/data-types.ts';
import Project from './Project.tsx';

type ProjectListProps = {
  heading: string,
  projects: ProjectT[],
  selectedTags: TagT[],
  onTagSelect: (name: string) => void
};

const ProjectList = ({heading, projects, selectedTags, onTagSelect}: ProjectListProps) => {
  if (!projects.length) { return null; }
  return (
      <>
          <h4 className="section-subheading subtitle-2">{heading}</h4>
          <ul>
            { projects.map(project => (
                <Project project={project} selectedTags={selectedTags} onTagSelect={onTagSelect}></Project>
            ))}
          </ul>
      </>
    );
}

export default ProjectList;