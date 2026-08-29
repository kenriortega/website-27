const defaultSiteUrl = "https://kenridev.vercel.app";

export const siteConfig = {
  name: "KenriDev",
  description:
    "Artículos, proyectos y vlogs en español sobre desarrollo de software, DevOps y Data Engineering.",
  author: "KenriDev",
  url: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl),
};

export function getAbsoluteUrl(pathname: string) {
  return new URL(pathname, siteConfig.url).toString();
}
