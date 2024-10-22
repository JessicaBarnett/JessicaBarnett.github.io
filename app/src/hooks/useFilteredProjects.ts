/**
 * Structures and filters Base list of filters.
 *
 */
import { useState, useEffect } from "react";
import { ProjectT, TechTagFilterT, TechTagT } from "../types/types";
import { useSelectedFilter } from "./useSelectedFilter";

type ProjectsByCompanyT = {
  [key: string]: ProjectT[];
};

type UseFilteredProjectsReturnT = [
  ProjectsByCompanyT,
  (filter: string | undefined) => void
];

/**
 * groups projects by company name
 */
const groupProjectsByCompany = (projects: ProjectT[]) => {
  return Object.groupBy(
    projects,
    (project) => project.company
  ) as ProjectsByCompanyT;
};

/**
 * Returns a map of just names
 */
const toNames = (list: TechTagFilterT[] | TechTagT[]) => list.map((item) => item.name)

/**
 * returns true if any of the name fields in TagsA match the name fields in TagsB
 */
const tagListsHaveMatches = (tagsA: TechTagT[], tagsB: TechTagT[]): boolean => {
  const namesA = toNames(tagsA);
  const namesB = toNames(tagsB);
  return namesA.filter(name => namesB.includes(name)).length > 0;
}

/**
 * Given a string, finds the filter in `filters` with a matching `name`
 */
const getFilterByName = (filters: TechTagFilterT[], filterName: string): TechTagFilterT | undefined => {
    return filters.find((filter) => filter.name === filterName)
}

// Groups projects by company and applies filters
export function useFilteredProjects(projects: ProjectT[], filters: TechTagFilterT[], selectedFilter: TechTagFilterT | undefined): UseFilteredProjectsReturnT {
  // const [projects] = useProjects();
  // const [filters] = useFilters();
  // const [selectedFilter] = useSelectedFilter();

  console.log(`selected filter: ${selectedFilter}`)

  const [value, setValue] = useState<ProjectsByCompanyT>(
    groupProjectsByCompany(projects)
  );

  useEffect(() => {
    console.log(`in useEffect with filter: ${selectedFilter?.name}`)
    handleChange(selectedFilter?.name)
  }, [selectedFilter]);

  const handleChange = (filterName: string | undefined) => {
    if (filterName === undefined) {
      setValue(groupProjectsByCompany(projects));
      return;
    }

    const filter: TechTagFilterT | undefined = getFilterByName(filters, filterName);

    console.log('calling updateFilteredProjects')
    const filteredProjects = filter
      ? projects.filter((project) =>
          tagListsHaveMatches(project.tags, filter.tags)
        )
      : projects;
      console.log(`filtered projects length: ${filteredProjects.length} out of ${projects.length}`)
    setValue(groupProjectsByCompany(filteredProjects));
  }

  return [value, handleChange];
}
