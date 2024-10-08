
import { ProjectT } from '../types/types';
import Project from './Project';

type ProjectListProps = {
  heading: string,
  projects: ProjectT[],
  selectedTags: string[]
};

const ProjectList = ({heading, projects, selectedTags}: ProjectListProps) => {
    return (
      <>
          <h4 className="section-subheading subtitle-2">{heading}</h4>
          <ul>
            { projects.map(project => (
              <li className="entry" key={project.id}>
                <Project project={project} selectedTags={selectedTags}></Project>
              </li>
            ))}
          </ul>
      </>
    );
}

export default ProjectList;