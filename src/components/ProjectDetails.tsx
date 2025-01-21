import { ProjectT, TagT } from "@src/types/data-types.tsx";

import Slider from "@src/components/Slider.tsx";

import StackTable from "./StackTable";

type ProjectDetailsComponentProps = {
    project: ProjectT | null;
};

const ProjectDetails = ({
    project,
}: ProjectDetailsComponentProps) => {
    //   const [showLeftPage, updateShowLeftPage] = useState<boolean>(false);

    if (!project || !project.task || !project.media?.length) {
        return;
    }

    return (
        <div className="more-info-2">
            <div
                className="project-title"
                // style={{ backgroundColor: "darkgreen", color: "white" }}
            >
                {/* <div className="engraved">{project.title}</div> */}
                <h4>{project.title}</h4>
            </div>

            <div className="grid project-info">

            <Slider className="full" media={project.media.filter(p => p.viewport === "wide")}></Slider>
                {/* <Slider className="half" media={[project.media[0]]}></Slider> */}

                <div className="half">
                    <StackTable data={[
                        ['Framework', 'Ruby on Rails'],
                        ['Server Language', 'Ruby'],
                        ['Templates', 'Haml'],
                        ['CSS preprossor', 'SCSS'],
                        ['Javascript Tools', 'JQuery, JQueryUi, LoDash, SlickSlider'],
                        ['Database', 'MongoDb']
                    ]}></StackTable>
                    <p>{project.task}</p>
                </div>
                <div className="half">
                    <h4>Stack</h4>
                    <p>{project.stack}</p>
                </div>
                <Slider className="half" media={project.media.filter(p => p.viewport === "mobile")}></Slider>

                <div className="half">
                    <h4>Results</h4>
                    <p>{project.results}</p>
                </div>
            </div>
            {/* <div className={`more-info grid ${showLeftPage ? 'show-left-page' : ''}`} >
                <div className="left-page half">
                    <button className="turn-pg-btn-right" onClick={() =>
                        updateShowLeftPage(false)
                    }></button>
                    <Slider media={project.media}></Slider>
                </div>
                <div className="right-page half">
                    <button className="turn-pg-btn-left" onClick={() =>
                        updateShowLeftPage(true)
                    }></button>
                    <div className="detailed-description">
                        <h3>{project.title}</h3>
                        {project.tags.map((tag: TagT) => (
                            <Tag
                                key={`${project.id}-${tag.name}`}
                                tag={tag}
                                isSelected={tagSelected(tag, selectedTags)}
                            ></Tag>
                        ))}
                        <div>{project.task}</div>
                    </div >
                </div>
            </div> */}
        </div>
    );
};

export default ProjectDetails;
