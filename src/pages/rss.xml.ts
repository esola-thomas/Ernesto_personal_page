import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getEssays, essaySlug } from "../lib/writing";

export async function GET(context: APIContext) {
  const essays = await getEssays("en");
  return rss({
    title: "Ernesto Sola-Thomas: Writing",
    description:
      "Essays on AI in regulated industries, what silicon verification teaches about trustworthy AI, and building Huitzo in the open.",
    site: context.site!,
    items: essays.map((essay) => ({
      title: essay.data.title,
      description: essay.data.description,
      pubDate: essay.data.pubDate,
      link: `/writing/${essaySlug(essay)}/`,
      categories: [essay.data.pillar]
    })),
    customData: "<language>en-us</language>"
  });
}
