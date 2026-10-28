import type { MetadataRoute } from "next";
import { LANGS } from "@/content";
import { SITE_URL } from "@/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return LANGS.map((lang) => ({
    url: `${SITE_URL}/${lang}`,
    changeFrequency: "monthly",
    priority: lang === "pt" ? 1 : 0.8,
    alternates: { languages: { "pt-BR": `${SITE_URL}/pt`, en: `${SITE_URL}/en` } },
  }));
}
