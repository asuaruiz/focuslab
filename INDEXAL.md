# Integración con Indexal (getindexal.com)

Indexal publica sus artículos en este sitio a través de un webhook. No hay que
tocar nada en el sitio para cada artículo: cuando Indexal publica, el artículo
aparece en `/blog` automáticamente.

## Cómo está montado

| Pieza | Dónde |
| --- | --- |
| Endpoint que recibe los artículos | `src/app/api/indexal/webhook/route.ts` |
| Verificación de firma HMAC | `src/lib/indexal/verify.ts` |
| Normalización del artículo (slug, portada, autor, fecha) | `src/lib/indexal/article.ts` |
| Tipos del payload | `src/lib/indexal/types.ts` |
| FAQ → datos estructurados schema.org | `src/lib/indexal/faq.ts` |
| Columnas y tabla de entregas | `supabase/sql/04_indexal_integration.sql` |

Los artículos se guardan en la misma tabla que los posts escritos a mano
(`focuslab_blog_posts`), así que se ven, se listan y entran al sitemap igual que
el resto del blog.

## Configuración (una sola vez)

### 1. Aplicar la migración de base de datos

Ejecutar `supabase/sql/04_indexal_integration.sql` en el SQL editor del proyecto
Supabase `andrea_personal` (`mpewwrienpmpagcodhxn`). Añade las columnas
`indexal_id`, `language_code`, `translation_group_id`, `author_bio` y
`faq_schema`, permite que la portada sea nula y crea la tabla
`focuslab_indexal_deliveries`.

### 2. Variable de entorno

```
INDEXAL_WEBHOOK_SECRET=<el mismo secreto que se configure en Indexal>
```

Ya está en `.env.local` para desarrollo. **Falta añadirla en Vercel**
(Settings → Environment Variables, entornos Production y Preview) y volver a
desplegar; sin ella el endpoint responde 500 a propósito.

### 3. Conectar el destino en Indexal

En Indexal, con el proyecto/dominio de Focus Labs seleccionado: "Conectar sitio"
→ Webhook, y usar:

- **URL**: `https://www.focuslabsmg.com/api/indexal/webhook`
- **Secret**: el mismo valor de `INDEXAL_WEBHOOK_SECRET`

Después, publicar un artículo de prueba desde el calendario de Indexal.

## Qué hace el endpoint con cada entrega

1. **Verifica** antes de leer nada: token `Authorization: Bearer`, firma
   `X-Indexal-Signature` sobre el cuerpo crudo (`timestamp + "." + body`) y
   ventana de 5 minutos en `X-Indexal-Timestamp`. Todas las comparaciones son de
   tiempo constante. Cualquier fallo → 401.
2. **Deduplica** por `X-Indexal-Delivery`: si esa entrega ya se procesó,
   responde la URL que generó sin volver a escribir.
3. **Guarda** el artículo con `upsert` sobre `indexal_id`. La identidad es el
   `id` de Indexal, nunca el slug — Indexal advierte que los slugs cambian entre
   ediciones y entre idiomas. Reeditar un artículo actualiza el mismo post.
4. **Revalida** `/blog`, `/blog/<slug>` y el sitemap, que si no tardarían hasta
   una hora en reflejar el cambio (`revalidate = 3600`).
5. **Responde** `{ "url": "https://www.focuslabsmg.com/blog/<slug>" }`, que es lo
   que Indexal guarda como dirección pública del artículo.

Si la base de datos falla, responde 500 para que Indexal reintente.

## Decisiones que conviene conocer

- **Se usa `contentHtml`, no `infographicHtml`.** El post se sanitiza con
  DOMPurify al renderizar, y la etiqueta `<style>` que lleva `infographicHtml`
  no sobreviviría. `contentHtml` ya trae la infografía como `<img>`, que sí pasa
  el sanitizador y queda justo después de la introducción.
- **La portada puede faltar.** `heroImageUrl` es best-effort en Indexal, así que
  la columna `cover_image_url` ahora admite nulo y el blog muestra un bloque
  charcoal en su lugar en vez de romperse.
- **Dominios de imagen.** `next.config.js` permite `getindexal.com` y sus
  subdominios. Si las portadas llegaran desde otro host, hay que añadirlo ahí o
  `next/image` se negará a optimizarlas y la portada saldrá vacía.
- **Autor.** Se usa `author.name` de Indexal; si el cuadro de autor está
  desactivado, la firma es "Focus Labs Media Group" en vez de atribuir el
  artículo a una persona que no lo escribió.
- **Estado.** Solo `status: "published"` queda visible. Cualquier otro estado se
  guarda con `published_at` nulo, es decir como borrador invisible en el sitio
  (la política RLS ya filtra por eso).
- **Slugs.** Se re-normalizan (acentos fuera, solo `[a-z0-9-]`) y, si el slug ya
  pertenece a otro artículo, se sufija. Así una traducción nunca pisa la URL del
  original.
- **CTA.** No se guarda como campo aparte: Indexal ya inserta el enlace dentro
  del contenido, y el bloque `RelatedServiceCTA` del sitio sigue apareciendo al
  final del artículo.

## Multidioma

El sitio es monolingüe (`<html lang="es">`) y hoy solo se espera español. La
infraestructura para traducciones ya está guardada (`language_code`,
`translation_group_id`) y cada versión recibe su propia fila y su propio slug,
así que no se pisan. Si algún día se activa inglés en Indexal, faltaría añadir
rutas por idioma (`/es/blog/...`, `/en/blog/...`) con sus `canonical` y
`hreflang`; tal como está ahora, las versiones en inglés se publicarían en el
mismo `/blog` en español.
