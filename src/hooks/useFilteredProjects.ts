/**
 * Structures and filters Base list of filters.
 *
 */
import { useState, useEffect } from "react";
import { ProjectT, FilterT, TagT } from "@src/types/data-types.ts";
import { groupBy } from "@src/utils/util";

export type ProjectsByCompanyT = {
  [key: string]: ProjectT[];
};

export type FilteredProjectsT = [
  ProjectsByCompanyT
];

/**
 * groups projects by company name
 */
const groupProjectsByCompany = (projects: ProjectT[]) => {
  return groupBy(
    projects,
    (project: ProjectT) => project.company
  ) as ProjectsByCompanyT;
};

/**
 * Returns a map of just names
 */
const toNames = (list: FilterT[] | TagT[]) => list.map((item) => item.name)

/**
 * returns true if any of the name fields in TagsA match the name fields in TagsB
 */
const tagListsHaveMatches = (tagsA: TagT[], tagsB: TagT[]): boolean => {
  const namesA = toNames(tagsA);
  const namesB = toNames(tagsB);
  return namesA.filter(name => namesB.includes(name)).length > 0;
}

/**
 * Given a string, finds the filter in `filters` with a matching `name`
 */
const getFilterByName = (filters: FilterT[], filterName: string): FilterT | undefined => {
    return filters.find((filter) => filter.name === filterName)
}

// Groups projects by company and applies filters
export function useFilteredProjects(projects: ProjectT[], filters: FilterT[], selectedFilter: FilterT | undefined): FilteredProjectsT {
  const [value, setValue] = useState<ProjectsByCompanyT>(
    groupProjectsByCompany(projects)
  );

  useEffect(() => {
    if (selectedFilter === undefined) {
      setValue(groupProjectsByCompany(projects));
      return;
    }

    const filter: FilterT | undefined = getFilterByName(filters, selectedFilter.name);

    console.log('calling updateFilteredProjects')
    const filteredProjects = filter
      ? projects.filter((project) =>
          tagListsHaveMatches(project.tags, filter.tags)
        )
      : projects;
      console.log(`filtered projects length: ${filteredProjects.length} out of ${projects.length}`)
    setValue(groupProjectsByCompany(filteredProjects));
  }, [selectedFilter, filters, projects]);

  return [value];
}
