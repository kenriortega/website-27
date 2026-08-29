import type { ArticleReadingTime } from "./types";

const wordsPerMinute = 200;
const secondsPerCodeLine = 3;

export function estimateReadingTime(source: string): ArticleReadingTime {
  const articleBody = source.replace(
    /^export const metadata = \{[\s\S]*?^\};/m,
    "",
  );

  let codeLines = 0;
  const prose = articleBody
    .replace(/```[\s\S]*?```/g, (codeBlock) => {
      codeLines += Math.max(0, codeBlock.split("\n").length - 2);
      return " ";
    })
    .replace(/<[^>]+>/g, " ")
    .replace(/[`*_#[\]()>{}|-]/g, " ");

  const words = prose.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
  const proseMinutes = words / wordsPerMinute;
  const codeMinutes = (codeLines * secondsPerCodeLine) / 60;

  return {
    minutes: Math.max(1, Math.ceil(proseMinutes + codeMinutes)),
    words,
  };
}
