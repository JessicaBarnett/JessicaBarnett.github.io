import { ProjectDetailsT } from "@src/types/data-types";

type ProjectTitleProps = {
  project: ProjectDetailsT
};

function ProjectTitle({ project }: ProjectTitleProps) {
  return (
    <>
      <div className="project-title">
        <h2 className="title-1">
          <span className="outdent-1">{project.title}</span>
        </h2>
        {project.subtitle && (
          <h3 className="indent-4 subtitle-1">
            <span>{project.subtitle}</span>
          </h3>
        )}
      </div>
    </>
  );
}

export default ProjectTitle;
