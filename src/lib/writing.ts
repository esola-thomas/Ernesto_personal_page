import { getCollection, type CollectionEntry } from "astro:content";
import { existsSync } from "node:fs";

export const PILLARS = ["regulated-ai", "silicon-to-software", "founder-journey"] as const;
export type Pillar = (typeof PILLARS)[number];

export type Essay = CollectionEntry<"writing">;

/** Published essays for one locale, newest first. The single draft-filtering point:
 *  every route, feed, and llms.txt entry must go through this. */
export async function getEssays(locale: "en" | "es"): Promise<Essay[]> {
  const essays = await getCollection(
    "writing",
    ({ id, data }) => (locale === "es" ? id.startsWith("es/") : !id.startsWith("es/")) && !data.draft
  );
  return essays.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

/** en and es entries share a filename so slugs (and hreflang pairs) match. */
export function essaySlug(entry: Essay): string {
  return entry.id.replace(/^es\//, "").replace(/\.mdx?$/, "");
}

/** Path of the generated OG card, falling back to the site default.
 *  Build-time only (frontmatter): checks public/ on disk. */
export function getOgImagePath(slug: string, locale: "en" | "es", override?: string): string {
  if (override) return override;
  const rel = `og/writing/${locale === "es" ? "es/" : ""}${slug}.png`;
  return existsSync(new URL(`../../public/${rel}`, import.meta.url)) ? `/${rel}` : "/og-default.png";
}

/** Frontmatter dates are UTC midnight; format in UTC to avoid the previous-day bug. */
export function formatEssayDate(date: Date, locale: "en" | "es"): string {
  return date.toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC"
  });
}
