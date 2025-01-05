import { ProjectsByCompanyT } from "@src/hooks/useFilteredProjects.ts";
import { FilterT } from "@src/types/data-types.ts";

import "@styles/components/projects.scss";

import ProjectList from "@src/components/ProjectList.tsx";
import FilterSelect from "@src/components/FilterSelect.tsx";

type ProjectsSectionProps = {
    filteredProjects: ProjectsByCompanyT,
    selectedFilter: FilterT | undefined,
    filters: FilterT[],
    onFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

function ProjectsSection({filteredProjects, filters, selectedFilter, onFilterChange}: ProjectsSectionProps) {
  return (
    <div className="content content-projects grid-at-small">
      <h3 className="section-heading title-2 half">Projects</h3>

      <FilterSelect
        filters={filters}
        selectedFilter={selectedFilter}
        onFilterChange={onFilterChange}
      ></FilterSelect>

      <ProjectList
        heading="Relay Network"
        projects={filteredProjects["Relay Network"] ?? []}
        selectedTags={selectedFilter?.tags ?? []}
      ></ProjectList>

      <ProjectList
        heading="Weblinc Ecommerce"
        projects={filteredProjects["Weblinc Ecommerce"] ?? []}
        selectedTags={selectedFilter?.tags ?? []}
      ></ProjectList>
    </div>
  );
}

export default ProjectsSection;