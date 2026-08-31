import type { Image, ValidationContext } from "sanity";

const MIN_DIMENSION = 1000;

export async function validateImageQuality(value: Image | undefined, context: ValidationContext) {
  const ref = value?.asset?._ref;
  if (!ref) return true;

  const client = context.getClient({ apiVersion: "2024-01-01" });
  const asset = await client.fetch<{ width: number; height: number } | null>(
    `*[_id == $id][0]{"width": metadata.dimensions.width, "height": metadata.dimensions.height}`,
    { id: ref }
  );
  if (!asset) return true;

  const shortestSide = Math.min(asset.width, asset.height);
  if (shortestSide < MIN_DIMENSION) {
    return `This photo is ${asset.width}×${asset.height}px, a bit low-res for how it's used on the site. For a sharp result, use a photo at least ${MIN_DIMENSION}px on its shortest side.`;
  }
  return true;
}
