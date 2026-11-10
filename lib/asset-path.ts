/**
 * Prefixes a file from /public with the site's base path. Next adds the base
 * path to its own links and scripts, but not to plain src/href attributes.
 */
export const assetPath = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
