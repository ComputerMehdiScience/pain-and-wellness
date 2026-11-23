import { createDataAttribute } from "next-sanity";

/**
 * Builds the `data-sanity` attribute that makes an element clickable in the
 * Studio's live editor. Used on images, since only text carries the hidden
 * markers automatically. Safe on the public site: it is just a plain attribute.
 *
 * Example: <Image data-sanity={editAttr(svc._id, "service", "photo")} />
 */
export function editAttr(id: string, type: string, path: string): string {
  return createDataAttribute({ id, type, path }).toString();
}

/** Path to one item of an array field, e.g. blocks[_key=="abc"].photo */
export function itemPath(field: string, key: string, sub: string): string {
  return `${field}[_key=="${key}"].${sub}`;
}
