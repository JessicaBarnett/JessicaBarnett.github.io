export type MediaT = {
  name?: string;
  url: string;
  alt: string;
  width: number; // generally 560, 1280, or 1920
};

export type TableRowT = {
  heading: string;
  value: string;
};

export type TagT = {
  displayName?: string;
  name: string;
};

export type ProjectListT = {
  title: string;
  description: string;
};
export type ProjectDetailT = {
  title: string;
  subtitle?: string | null;
  role: string;
  time: string;
  type: string;
  table: TableRowT[];
  content: string;
};
export type ProjectT = {
  slug: string;
  company: string;
  list: ProjectListT;
  detail?: ProjectDetailT;
  tags: TagT[];
  media?: MediaT[];
};

// Meant for Runtime Checks
// TODO: this seems... awful?   hmm...
export const projectHasDetails = (project: ProjectT): boolean => {
  return !!(
    !!project &&
    !!project.detail &&
    !!project.detail.title &&
    !!project.detail.time &&
    !!project.detail.role &&
    !!project.detail.type &&
    project.media &&
    project.media.length > 0 &&
    project.detail.table &&
    project.detail.table.length > 0 &&
    project.detail.content // && false
  );
};

export type FilterT = {
  displayName: string;
  name: string;
  tags: TagT[];
};

export type ExperienceEntryT = {
  id: string;
  title: string;
  company: string;
  start: string;
  end: string;
  tags: TagT[];
};

export type DataT = {
  filters: FilterT[];
  experience: ExperienceEntryT[];
};

