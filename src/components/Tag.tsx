import { TagT } from "@src/types/data-types.ts";

type ProjectComponentProps = {
  tag: TagT;
  isSelected?: boolean;
  onClick?: (tag: TagT, e: React.MouseEvent) => void;
};

const Tag = ({
  tag,
  isSelected = false,
  onClick = () => {},
}: ProjectComponentProps) => {
  return (
    <button
      className={`btn-tag filter-projects ${isSelected ? 'selected' : ''}`}
      type="button"
      value={tag.name}
      onClick={(e) => onClick(tag, e)}
    >
      {tag.displayName ?? tag.name}
    </button>
  );
};

export default Tag;
