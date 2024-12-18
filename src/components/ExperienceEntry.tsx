import { ExperienceEntryT } from "../types/types";

type ExperienceEntryProps = {
    entry: ExperienceEntryT
};

const ExperienceEntry = ({entry}: ExperienceEntryProps) => {
  return (
    <li className="entry">
        <div className="supertitle-3">
            <time dateTime={entry.start}>{entry.start}</time> -{" "}
            <time dateTime={entry.end}>{entry.end}</time>
        </div>
        <h4 className="title-3">{entry.title}</h4>
        <p className="subtitle-3">{entry.company}</p>

        { entry.tags.map(tag => (
            <button className="btn-1" type="button">{tag}</button>
        ))}
    </li>
  );
};

export default ExperienceEntry;
