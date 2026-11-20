import 'server-only';

import { readdirSync } from 'node:fs';
import { join } from 'node:path';

const IMAGE_PATTERN = /\.(jpe?g|png|webp)$/i;

/** `public/gallery` papkasidagi rasmlar (hero galereyasi uchun), bo'lmasa bo'sh ro'yxat */
export function getGalleryPhotos(): string[] {
  try {
    return readdirSync(join(process.cwd(), 'public', 'gallery'))
      .filter((file) => IMAGE_PATTERN.test(file))
      .sort()
      .map((file) => `/gallery/${encodeURIComponent(file)}`);
  } catch {
    return [];
  }
}
