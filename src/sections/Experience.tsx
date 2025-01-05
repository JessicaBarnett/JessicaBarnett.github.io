import ExperienceEntry from "@src/components/ExperienceEntry.tsx";
import { ExperienceEntryT } from "@src/types/data-types.ts";

import '@styles/components/experience.scss';

type ExperienceSectionProps = {
    expEntries: ExperienceEntryT[]
}

function ExperienceSection({expEntries}: ExperienceSectionProps) {
  return (
    <div className="content content-experience">
        <h3 className="title-2">Experience</h3>
        <ol>
            {expEntries.map(entry => (
                <ExperienceEntry entry={entry}></ExperienceEntry>
            ))}
        </ol>
    </div>
  )
}
export default ExperienceSection;
