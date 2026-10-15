import galleryManifestRaw from "./gallery-cloudinary.json";

export interface CloudinaryImageData {
  original: string;
  publicId: string;
  secureUrl: string;
  optimizedUrl: string;
  format?: string;
  width?: number;
  height?: number;
}

export const galleryManifest: Record<string, CloudinaryImageData> =
  galleryManifestRaw as Record<string, CloudinaryImageData>;

const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "bghkkwzm";

/**
 * Returns the best-optimized WebP / AVIF Cloudinary URL with f_auto,q_auto.
 * If the image is not in Cloudinary, falls back to the original local path.
 */
export function getOptimizedImageUrl(
  pathOrUrl: string,
  options?: {
    width?: number;
    height?: number;
    crop?: string;
    format?: "auto" | "webp";
    angle?: number | string;
  }
): string {
  if (!pathOrUrl) return "";

  // 1. Check if it's in our manifest
  const manifestItem = galleryManifest[pathOrUrl];
  if (manifestItem) {
    // If no custom dimensions or rotation requested, use pre-generated optimizedUrl
    if (!options?.width && !options?.height && !options?.crop && !options?.format && options?.angle === undefined) {
      return manifestItem.optimizedUrl;
    }
    const fmt = options?.format ?? "auto";
    const transforms: string[] = [`f_${fmt}`, "q_auto"];
    if (options?.angle !== undefined) {
      const numAngle = typeof options.angle === "number" ? options.angle : parseInt(String(options.angle), 10);
      const safeAngle = !isNaN(numAngle) ? ((numAngle % 360) + 360) % 360 : options.angle;
      transforms.push(`a_${safeAngle}`);
    }
    if (options?.width) transforms.push(`w_${options.width}`);
    if (options?.height) transforms.push(`h_${options.height}`);
    if (options?.crop) transforms.push(`c_${options.crop}`);
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transforms.join(",")}/v1/${manifestItem.publicId}`;
  }

  // 2. If it's already a Cloudinary URL, return it
  if (pathOrUrl.includes("res.cloudinary.com")) {
    return pathOrUrl;
  }

  // 3. Fallback to local path
  return pathOrUrl;
}

/**
 * Helper to transform an array of local paths into optimized Cloudinary URLs
 */
export function getOptimizedImageUrls(
  paths: string[],
  options?: {
    width?: number;
    height?: number;
    crop?: string;
    format?: "auto" | "webp";
  }
): string[] {
  return paths.map((p) => getOptimizedImageUrl(p, options));
}

/**
 * Returns all optimized image URLs for a specific folder from the manifest
 * Completely eliminates runtime disk I/O, allowing instantaneous edge delivery.
 */
export function getFolderImages(folderName: string): string[] {
  const prefix = `/${folderName.replace(/^\/|\/$/g, "")}/`;
  return Object.keys(galleryManifest)
    .filter((k) => k.startsWith(prefix))
    .sort((a, b) => a.localeCompare(b))
    .map((k) => galleryManifest[k].optimizedUrl);
}

