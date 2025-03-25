export type ViewportT = "mobile" | "wide";

export type MediaT = {
  id: string;
  name?: string;
  url: string;
  alt: string;
  viewport: ViewportT;
};

export type ContentT = {
  id: string;
  heading: string;
  paragraphs: string[];
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
  subtitle: string;
  role: string;
  time: string;
  type: string;
  table: TableRowT[];
  content: ContentT[];
};
export type ProjectT = {
  id: string;
  slug: string;
  company: string;
  list: ProjectListT;
  detail?: ProjectDetailT;
  tags: TagT[];
  media: MediaT[];
};

// Meant for Runtime Checks
export const projectHasDetails = (project: ProjectT): boolean => {
  return (
    !!project &&
    !!project.detail &&
    !!project.detail.title &&
    !!project.detail.time &&
    !!project.detail.role &&
    !!project.detail.type &&
    project.media.length > 0 &&
    project.detail.table.length > 0 &&
    project.detail.content.length > 0
  ); // &&
  //   return false;
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
  projects: ProjectT[];
  experience: ExperienceEntryT[];
};
