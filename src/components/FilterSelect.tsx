import { FilterT } from "@src/types/data-types.ts";

type FilterSelectComponentProps = {
  filters: FilterT[],
  selectedFilter: FilterT | undefined | null,
  onFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
};

const FilterSelect = ({
  filters,
  selectedFilter,
  onFilterChange
}: FilterSelectComponentProps) => {

  return (
    <div className="filter-projects-group half">
    <label className="filter-projects-label" htmlFor="filterProjects">
      Filter
    </label>
    <select
      className="filter-projects-select"
      name="filterProjects"
      id="filterProjects"
      value={selectedFilter?.name ?? ''}
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

  );
};

export default FilterSelect;
