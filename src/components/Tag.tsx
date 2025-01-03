import { TagT } from "@src/types/data-types.tsx";

type ProjectComponentProps = {
  tag: TagT;
  isSelected?: boolean;
  onClick?: (name: string) => void;
};

const Tag = ({
  tag,
  isSelected = false,
  onClick = () => {},
}: ProjectComponentProps) => {

  return (
    <button
      className={`btn-1 filter-projects ${isSelected ? "selected" : ""}`}
      type="button"
      value={tag.name}
      onClick={(e) => {
        onClick(e.currentTarget.value);
      }}
    >
      {tag.displayName ?? tag.name}
    </button>
  );
};

export default Tag;
