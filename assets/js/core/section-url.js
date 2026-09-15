/** Return a section URL without losing unrelated query parameters. */
export function sectionUrl(href, key) {
  const url = new URL(href);
  url.searchParams.set("section", key);
  url.hash = "";
  return url;
}

export function activeSection(chapters, viewport) {
  return chapters
    .filter((chapter) => chapter.top <= viewport * 0.45)
    .sort((a, b) => a.top - b.top)
    .at(-1)?.key;
}
