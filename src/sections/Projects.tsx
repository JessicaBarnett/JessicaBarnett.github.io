// import "@styles/components/projects.scss";

import { ProjectsByCompanyT } from "@src/hooks/useFilteredProjects.ts";
import { FilterT } from "@src/types/data-types.ts";

import ProjectList from "@src/components/ProjectList.tsx";

type ProjectsSectionProps = {
    filteredProjects: ProjectsByCompanyT,
    selectedFilter: FilterT | undefined,
    filters: FilterT[],
    onFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
}


function ProjectsSection({filteredProjects, filters, selectedFilter, onFilterChange}: ProjectsSectionProps) {
  return (
    <div className="section-content section-projects grid-at-small">
      <h3 className="section-heading title-2 half">Projects</h3>

      <div className="filter-projects-group half">
        <label className="filter-projects-label" htmlFor="filterProjects">
          Filter
        </label>
        <select
          className="filter-projects-select"
          name="filterProjects"
          id="filterProjects"
          value={selectedFilter?.name ?? undefined}
          onChange={onFilterChange}
        >
          <option value="">All</option>
          {filters.map((filter) => (
            <option value={filter.name} data-tags={filter.tags}>
              {filter.displayName}
            </option>
          ))}
        </select>
      </div>

      <ProjectList
        heading="Relay Network"
        projects={filteredProjects["Relay Network"] ?? []}
        selectedTags={selectedFilter?.tags ?? []}
        // onTagSelect={onTagSelect}
      ></ProjectList>

      <ProjectList
        heading="Weblinc Ecommerce"
        projects={filteredProjects["Weblinc Ecommerce"] ?? []}
        selectedTags={selectedFilter?.tags ?? []}
        // onTagSelect={onTagSelect}
      ></ProjectList>
    </div>
  );
}

export default ProjectsSection;