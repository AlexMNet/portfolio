export interface Project {
  id: string;
  userId: string;
  slug: string;
  title: string;
  type: string;
  blurb: string | null;
  markdown: string | null;
  youtube_link: string | null;
  github_link: string | null;
  live_link: string | null;
  published: boolean;
  updatedAt: Date;
  createdAt: Date;
  technologies: {
    id: string;
    name: string;
  }[];
  images: {
    id: string;
    src: string;
    type: 'modal' | 'card';
    projectId: string;
    public_id: string;
  }[];
}
