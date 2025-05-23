type ProjectTitleProps = {
  title: string,
  subtitle?: string
};

function ProjectTitle({ title, subtitle }: ProjectTitleProps) {
  return (
    <>
      <div className="project-title">
        <h2 className="title-1">
          <span className="outdent-1">{title}</span>
        </h2>
        {subtitle && (
          <h3 className="indent-4-above-med subtitle-1">
            <span>{subtitle}</span>
          </h3>
        )}
      </div>
    </>
  );
}

export default ProjectTitle;
