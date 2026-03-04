// src/lib/sanity.js
import {createClient} from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: 'ipigbfxk', // Твой Project ID уже вставлен
  dataset: 'opera',
  apiVersion: '2026-03-04', // Твой API Version
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source) {
  return builder.image(source);
}