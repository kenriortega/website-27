declare module "*.mdx" {
  import type { ArticleMetadata } from "@/lib/articles/types";

  export const metadata: ArticleMetadata;
}
