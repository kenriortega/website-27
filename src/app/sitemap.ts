import type { MetadataRoute } from "next";

import { getAllArticles } from "@/lib/articles/registry";
import { getAllProjects } from "@/lib/projects/registry";
import { getAbsoluteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = (await getAllArticles()).filter(
    (article) => !article.draft,
  );
  const projects = getAllProjects();

  return [
    {
      url: getAbsoluteUrl("/"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: getAbsoluteUrl("/blog"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl("/proyectos"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...articles.map((article) => ({
      url: getAbsoluteUrl(`/blog/${article.slug}`),
      lastModified: article.updatedAt ?? article.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...projects.map((project) => ({
      url: getAbsoluteUrl(`/proyectos/${project.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
