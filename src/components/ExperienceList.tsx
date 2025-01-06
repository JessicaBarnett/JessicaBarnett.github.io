import ExperienceEntry from "@src/components/ExperienceEntry.tsx";
import { ExperienceEntryT } from "@src/types/data-types.ts";

type ExperienceListProps = {
    expEntries: ExperienceEntryT[]
}

function ExperienceList({expEntries}: ExperienceListProps) {
  return (
      <ol>
          {expEntries.map(entry => (
              <ExperienceEntry entry={entry}></ExperienceEntry>
          ))}
      </ol>
  )
}
export default ExperienceList;
