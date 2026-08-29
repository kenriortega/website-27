import {
  articleSocialImageSize,
  createArticleSocialImage,
} from "@/lib/articles/social-image";
import { getArticleMetadata } from "@/lib/articles/registry";

export const alt = "Vista previa de un artículo de KenriDev";
export const size = articleSocialImageSize;
export const contentType = "image/png";

export default async function TwitterImage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const article = await getArticleMetadata(slug);

  return createArticleSocialImage({
    title: article?.metadata.title ?? "Artículo de KenriDev",
    seriesTitle: article?.metadata.series?.title,
  });
}
