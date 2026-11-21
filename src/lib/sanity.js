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

export function articleImageUrl(source, width = 1200, aspectRatio = null) {
  if (!source) return null;
  
  const baseBuilder = urlFor(source)
    .width(width)
    .auto('format');
  
  // Если задан aspectRatio (например, для карточек), применяем его
  if (aspectRatio) {
    baseBuilder.height(Math.round(width / aspectRatio));
    
    // Для карточек с фиксированным aspect ratio используем hotspot
    if (source.hotspot || source.crop) {
      baseBuilder.fit('crop').crop('focalpoint');
    } else {
      baseBuilder.fit('crop');
    }
  }
  // Для hero-изображений НЕ задаём height — пусть показывается в оригинальных пропорциях
  
  return baseBuilder.url();
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