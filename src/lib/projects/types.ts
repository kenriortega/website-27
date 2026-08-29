export type ProjectStatus =
  | "active"
  | "completed"
  | "case-study"
  | "open-source";

export type ProjectVideo = {
  title: string;
  channel: string;
  url: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type ProjectReference = {
  type: "documentation" | "publication";
  title: string;
  publisher: string;
  url: string;
  description: string;
  publishedAt?: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  overview: string;
  challenge?: string;
  solution?: string;
  contribution?: string;
  learnings?: string[];
  year: number;
  status: ProjectStatus;
  featured?: boolean;
  technologies: string[];
  repositoryUrl: string;
  relatedArticleSlugs?: string[];
  highlights: string[];
  videos: ProjectVideo[];
  images: ProjectImage[];
  references?: ProjectReference[];
};
