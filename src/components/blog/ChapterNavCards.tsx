import { Link } from "react-router-dom";

import { BlurImage } from "@/components/BlurImage";
import {
  getPageCardMeta,
  type BlogPage,
  type Project,
} from "@/data/projects";

interface ChapterNavCardsProps {
  project: Project;
  previous: BlogPage | null;
  next: BlogPage | null;
}

export function ChapterNavCards({ project, previous, next }: ChapterNavCardsProps) {
  return (
    <div
      className="border-t"
      style={{ borderColor: `var(--app-pill-wood-border)` }}
    >
      <div className="grid grid-cols-2" style={{ borderColor: `var(--app-pill-wood-border)` }}>
        <NavCard page={previous} direction="previous" fallbackProject={project} />
        <NavCard page={next} direction="next" fallbackProject={project} />
      </div>
    </div>
  );
}


interface NavCardProps {
  page: BlogPage | null;
  direction: "previous" | "next";
  fallbackProject: Project;
}

function NavCard({ page, direction, fallbackProject }: NavCardProps) {
  const isPrev = direction === "previous";
  const meta = page ? getPageCardMeta(page, fallbackProject) : null;
  const borderStyle = isPrev ? { borderColor: `var(--app-pill-wood-border)` } : {};

  if (!meta) {
    return (
      <div
        className={`p-4 md:p-5 opacity-25 select-none ${isPrev ? "border-r" : ""}`}
        style={borderStyle}
        aria-hidden
      >
        <p className="app-eyebrow text-app-body mb-4" aria-hidden>
          {isPrev ? "Previous" : "Next"}
        </p>
        <div className="aspect-[3/2] rounded-[3px] bg-app-body/10" />
      </div>
    );
  }

  return (
    <Link
      to={meta.href}
      aria-label={`${isPrev ? "Previous" : "Next"}: ${meta.eyebrow} — ${meta.title}`}
      className={`group block p-4 md:p-5 transition-colors hover:bg-black/[0.04] active:bg-black/[0.07] ${isPrev ? "border-r" : ""}`}
      style={borderStyle}
    >
      {/* Direction label */}
      <p className="app-eyebrow text-app-body/50 mb-3" aria-hidden>
        {isPrev ? "← Previous" : "Next →"}
      </p>

      {/* Chapter image */}
      <div className="relative aspect-[3/2] overflow-hidden rounded-[3px] bg-app-media mb-3 shadow-md shadow-black/10">
        <div className="absolute inset-0 transition-transform duration-300 ease-out can-hover:group-hover:scale-[1.04]">
          <BlurImage
            src={meta.image}
            smallSrc={meta.smallImage}
            alt=""
          />
        </div>
        <div className="absolute inset-0 portal-depth-inset pointer-events-none" />
      </div>

      {/* Chapter ordinal */}
      <p
        className="app-eyebrow mb-1 leading-none"
        style={meta.color ? { color: meta.color } : {}}
      >
        {meta.eyebrow}
      </p>

      {/* Chapter title */}
      <p className="app-title-3 app-text-strong can-hover:group-hover:text-app-headingHover transition-colors leading-snug">
        {meta.title}
      </p>
    </Link>
  );
}
