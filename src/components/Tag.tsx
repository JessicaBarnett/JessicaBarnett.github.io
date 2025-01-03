import { TagT } from "@src/types/data-types.ts";
// import '../stylesheets/components/tags.scss';

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
