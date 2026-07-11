-- Replaces generic/broken stock cover images on the blog with images that
-- match each post's actual topic. Two of the previous Unsplash URLs
-- (productor-estrategico-vs-videografo, iluminacion-autoridad) were 404s.
-- Apply directly against the project via the Management API/SQL editor;
-- kept here so 00_reset_and_create.sql stays reproducible for a fresh reset.

update public.focuslab_blog_posts set cover_image_url = 'https://images.unsplash.com/photo-1739296385046-206bd6f31dc1?w=800&h=400&fit=crop' where slug = 'roi-storytelling';
update public.focuslab_blog_posts set cover_image_url = 'https://images.unsplash.com/photo-1767474365536-ef81bfa24c8a?w=800&h=400&fit=crop' where slug = 'podcasting-corporativo-alta-gama';
update public.focuslab_blog_posts set cover_image_url = 'https://images.unsplash.com/photo-1654723011673-86b0eae447a8?w=800&h=400&fit=crop' where slug = 'confianza-frente-camara';
update public.focuslab_blog_posts set cover_image_url = 'https://images.unsplash.com/photo-1632187981988-40f3cbaeef5e?w=800&h=400&fit=crop' where slug = 'productor-estrategico-vs-videografo';
update public.focuslab_blog_posts set cover_image_url = 'https://images.unsplash.com/photo-1576280314550-773c50583407?w=800&h=400&fit=crop' where slug = 'iluminacion-autoridad';
update public.focuslab_blog_posts set cover_image_url = 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=400&fit=crop' where slug = 'espacio-negativo-diseno';
update public.focuslab_blog_posts set cover_image_url = 'https://images.unsplash.com/photo-1762968274962-20c12e6e8ecd?w=800&h=400&fit=crop' where slug = 'narrativa-eventos-corporativos';
update public.focuslab_blog_posts set cover_image_url = 'https://images.unsplash.com/photo-1726066012749-f81bf4422d4e?w=800&h=400&fit=crop' where slug = 'disenar-percepcion-audiencia';
update public.focuslab_blog_posts set cover_image_url = 'https://images.unsplash.com/photo-1548944588-bd022d6b3a9b?w=800&h=400&fit=crop' where slug = 'produccion-sin-caos';
update public.focuslab_blog_posts set cover_image_url = 'https://images.unsplash.com/photo-1529119368496-2dfda6ec2804?w=800&h=400&fit=crop' where slug = 'estrategia-visual-intencion';
