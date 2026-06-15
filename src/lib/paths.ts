/** Site base path without trailing slash (e.g. /dadarathornaninstitute). */
export const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Join base with an absolute path like `/images/logo.jpg`. */
export function withBase(path: string): string {
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
