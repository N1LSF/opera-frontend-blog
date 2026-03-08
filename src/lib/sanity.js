// src/lib/sanity.js
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: 'ipigbfxk',
  dataset: 'opera',
  apiVersion: '2026-03-04',
  useCdn: false,  // <-- БЫЛО true, СТАЛО false
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source) {
  return builder.image(source);
}