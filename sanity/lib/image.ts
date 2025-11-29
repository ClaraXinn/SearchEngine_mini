import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';

// Generate image URLs
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
