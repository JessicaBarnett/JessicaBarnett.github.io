import { MediaT, ProjectT, TagT } from "@src/types/data-types.tsx";
import Tag from "@src/components/Tag.tsx";
import { tagSelected } from "@src/utils/util.ts";
import { RewindIcon } from "@src/icons/RewindIcon.tsx";
import { FastForwardIcon } from "@src/icons/FastForwardIcon.tsx";

type ProjectDetailsComponentProps = {
  project: ProjectT;
  selectedTags: TagT[];
};

const ProjectDetails = ({
  project,
  selectedTags,
}: ProjectDetailsComponentProps) => {
  if (!project.detailed_description || !project.media?.length) {
    return;
  }

  return (
    <div className="more-info-dialog">
      <button className="btn-close ">X</button>
      <div className="more-info-dialog-content grid-at-med">
        <div className="half faux-phone">
            {project.media.map((media: MediaT, i) => (
                <p className={`img-title ${i === 0 ? "visible" : null}`}>{media.name}</p>
            ))}

          <button className="slider-btn">
            <RewindIcon></RewindIcon>
          </button>
          <button className="slider-btn">
            <FastForwardIcon></FastForwardIcon>
          </button>
          <div className="buttons">
          {project.media.map(() => (
              <button className="slider-dot-btn"></button>
            ))}
          </div>
          <div className="scrollable-image">
            {project.media.map((media: MediaT, i) => (
              <img
                className={`slider-img ${i === 0 ? "visible" : null}`}
                src={media.url}
                alt={media.alt}
              ></img>
            ))}
          </div>
        </div>
        <div className="half detailed-description">
          <h3>{project.title}</h3>
          {project.tags.map((tag: TagT) => (
            <Tag
              key={`${project.id}-${tag.name}`}
              tag={tag}
              isSelected={tagSelected(tag, selectedTags)}
            ></Tag>
          ))}
          <div>{project.detailed_description}</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
