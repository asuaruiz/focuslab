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
  // Null for posts published by Indexal with no hero image — see
  // supabase/sql/04_indexal_integration.sql.
  cover_image_url: string | null;
  published_at: string | null;
  author: string;
  author_bio: string | null;
  // Set only on posts that arrived through the Indexal webhook.
  indexal_id: string | null;
  language_code: string | null;
  translation_group_id: string | null;
  faq_schema: unknown[] | null;
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
