import type { ProjectVideo } from "@/lib/projects/types";

type ProjectVideoProps = {
  video: ProjectVideo;
};

function getYouTubeVideoId(url: string): string | undefined {
  try {
    const parsedUrl = new URL(url);
    let videoId: string | null | undefined;

    if (parsedUrl.hostname === "youtu.be") {
      videoId = parsedUrl.pathname.split("/").filter(Boolean)[0];
    } else if (
      ["youtube.com", "www.youtube.com", "m.youtube.com"].includes(
        parsedUrl.hostname,
      )
    ) {
      videoId = parsedUrl.searchParams.get("v");

      if (!videoId && parsedUrl.pathname.startsWith("/embed/")) {
        videoId = parsedUrl.pathname.split("/").filter(Boolean)[1];
      }
    }

    return videoId && /^[a-zA-Z0-9_-]{6,}$/.test(videoId)
      ? videoId
      : undefined;
  } catch {
    return undefined;
  }
}

export function ProjectVideo({ video }: ProjectVideoProps) {
  const videoId = getYouTubeVideoId(video.url);

  if (!videoId) {
    return (
      <a
        href={video.url}
        target="_blank"
        rel="noreferrer"
        className="flex min-h-11 items-center border border-border bg-surface px-5 py-4 font-medium text-accent transition-colors hover:border-accent hover:text-accent-strong"
      >
        Ver {video.title} en {video.channel}
        <span className="ml-2" aria-hidden="true">
          ↗
        </span>
      </a>
    );
  }

  return (
    <figure className="overflow-hidden border border-border bg-surface">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={`${video.title} — ${video.channel}`}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="aspect-video w-full"
      />
      <figcaption className="border-t border-border px-5 py-4 text-sm text-muted">
        {video.title} · {video.channel}
      </figcaption>
    </figure>
  );
}
