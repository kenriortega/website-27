import {
  createSiteSocialImage,
  siteSocialImageSize,
} from "@/lib/site-social-image";

export const alt =
  "KenriDev: desarrollo de software, DevOps y Data Engineering";
export const size = siteSocialImageSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return createSiteSocialImage();
}
