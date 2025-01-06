import { ExperienceEntryT, TagT } from "@src/types/data-types.ts";
import Tag from "@src/components/Tag.tsx";
import { tagSelected } from "@src/utils/util.ts";


type ExperienceEntryProps = {
    entry: ExperienceEntryT,
    selectedTags: TagT[],
    onTagSelect: (tag: TagT) => void
};

const ExperienceEntry = ({entry, selectedTags, onTagSelect}: ExperienceEntryProps) => {
  return (
    <li className="entry">
        <div className="supertitle-3">
            <time dateTime={entry.start}>{entry.start}</time> -{" "}
            <time dateTime={entry.end}>{entry.end}</time>
        </div>
        <h4 className="title-3">{entry.title}</h4>
        <p className="subtitle-3">{entry.company}</p>

        { entry.tags.map(tag => (
          <Tag
            tag={tag}
            isSelected={tagSelected(tag, selectedTags)}
            onClick={onTagSelect}
          ></Tag>
        ))}
    </li>
  );
};

export default ExperienceEntry;
