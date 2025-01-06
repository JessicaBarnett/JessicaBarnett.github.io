import { TagT } from "@src/types/data-types.ts";

type ProjectComponentProps = {
  tag: TagT;
  isSelected?: boolean;
  onClick?: (tag: TagT) => void;
};

const Tag = ({
  tag,
  isSelected = false,
  onClick = () => {},
}: ProjectComponentProps) => {
  return (
    <button
      className={`tag btn filter-projects ${isSelected ? 'selected' : ''}`}
      type="button"
      value={tag.name}
      onClick={() => onClick(tag)}
    >
      {tag.displayName ?? tag.name}
    </button>
  );
};

export default Tag;
