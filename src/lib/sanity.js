// src/lib/sanity.js
import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: 'ipigbfxk',
  dataset: 'opera',
  apiVersion: '2026-03-04',
  useCdn: false,
});

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source) {
  return builder.image(source);
}

export function articleImageUrl(source, width = 1200) {
  if (!source) return null;
  
  const builder = urlFor(source)
    .width(width)
    .height(Math.round(width * 9 / 16))
    .auto('format');
  
  // Если есть hotspot/crop данные, используем focalpoint для точного кропа
  if (source.hotspot || source.crop) {
    builder.fit('crop').crop('focalpoint');
  } else {
    // Fallback на обычный crop
    builder.fit('crop');
  }
  
  return builder.url();
}

/**
 * Превращает _ref ассета файла Sanity в прямой URL для скачивания.
 * Пример _ref: "file-abc123def456-pdf"
 *  → https://cdn.sanity.io/files/<projectId>/<dataset>/abc123def456.pdf
 */
export function fileUrlFor(ref) {
  if (!ref) return null;
  const [, id, ext] = ref.split('-');
  if (!id || !ext) return null;
  return `https://cdn.sanity.io/files/${sanityClient.config().projectId}/${sanityClient.config().dataset}/${id}.${ext}`;
}