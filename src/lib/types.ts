export type Lead = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  project_type: string | null;
  project_details: string | null;
  created_at: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  cover_image_url: string;
  published_at: string | null;
  author: string;
};

export type CaseStudy = {
  id: string;
  title: string;
  slug: string;
  client_context: string;
  conflict: string;
  transformation: string;
  resolution: string;
  video_url: string | null;
  cover_image_url: string;
};
