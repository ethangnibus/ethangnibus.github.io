import { Diamond } from "lucide-react";
import { motion } from "framer-motion";

import { ProjectedText } from "@/components/ProjectedText";
import { APP_PALETTE } from "@/theme";
import { formatSectionNumber, sectionAnchorId } from "@/data/projects";
import { useBlogChapter } from "./BlogChapterContext";

// ─── BlogSection ────────────────────────────────────────────────────────────
interface BlogSectionProps {
  /** Must match `Chapter.sections[].id` for this chapter. */
  sectionId: string;
  children: React.ReactNode;
  accent?: string;
}

export function BlogSection({
  sectionId,
  children,
  accent = APP_PALETTE.textStrong,
}: BlogSectionProps) {
  const { project, chapter, chapterIndex } = useBlogChapter();
  const sectionIndex = chapter.sections.findIndex((s) => s.id === sectionId);
  if (sectionIndex === -1) {
    throw new Error(
      `Unknown sectionId "${sectionId}" for chapter ${project.slug}/${chapter.slug}`,
    );
  }
  const section = chapter.sections[sectionIndex]!;
  const ref = formatSectionNumber(chapterIndex, sectionIndex);
  const domId = sectionAnchorId(project.slug, chapter.slug, sectionId);

  return (
    <motion.section
      id={domId}
      className="mb-12 scroll-mt-24"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <h2 className="font-mono text-lg md:text-xl font-bold text-app-strong mb-5 flex items-start gap-3 flex-wrap">
        <span
          className="inline-block w-1 h-6 rounded-full flex-shrink-0 mt-1"
          style={{ background: accent }}
        />
        <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0 min-w-0">
          <span
            className="font-mono text-base md:text-lg text-app-body/75 tabular-nums shrink-0"
            aria-hidden
          >
            {ref}:
          </span>
          <ProjectedText
            text={section.title}
            color={accent}
            intensity={0.25}
          />
        </span>
      </h2>
      <div className="space-y-4">{children}</div>
    </motion.section>
  );
}

// ─── BlogSubsection ──────────────────────────────────────────────────────────
interface BlogSubsectionProps {
  title: string;
  children: React.ReactNode;
}

export function BlogSubsection({ title, children }: BlogSubsectionProps) {
  return (
    <div className="mb-8">
      <h3 className="font-mono text-sm font-bold text-app-strong uppercase tracking-widest mb-3 opacity-70">
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

// ─── BlogParagraph ───────────────────────────────────────────────────────────
interface BlogParagraphProps {
  children: React.ReactNode;
}

export function BlogParagraph({ children }: BlogParagraphProps) {
  return (
    <p className="font-mono text-sm md:text-base text-app-body leading-relaxed">
      {children}
    </p>
  );
}

// ─── BlogImage ───────────────────────────────────────────────────────────────
interface BlogImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

export function BlogImage({ src, alt, caption, className = "" }: BlogImageProps) {
  return (
    <figure className={`my-4 ${className}`}>
      <div className="relative overflow-hidden bg-app-media">
        <img
          src={src}
          alt={alt}
          className="w-full h-auto block"
          loading="lazy"
        />
        <div className="absolute inset-0 portal-depth-inset pointer-events-none" />
      </div>
      {caption && (
        <figcaption className="font-mono text-xs text-app-body mt-2 text-center opacity-70 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// ─── BlogFigureGrid ──────────────────────────────────────────────────────────
interface FigureItem {
  src: string;
  label?: string;
  alt?: string;
}

interface BlogFigureGridProps {
  figures: FigureItem[];
  columns?: 2 | 3 | 4;
  caption?: string;
}

export function BlogFigureGrid({ figures, columns = 2, caption }: BlogFigureGridProps) {
  const colClass = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  }[columns];

  return (
    <figure className="my-6">
      <div className={`grid ${colClass} gap-2`}>
        {figures.map((fig, i) => (
          <div key={i} className="relative overflow-hidden bg-app-media">
            <img
              src={fig.src}
              alt={fig.alt ?? fig.label ?? `Figure ${i + 1}`}
              className="w-full h-auto block"
              loading="lazy"
            />
            <div className="absolute inset-0 portal-depth-inset pointer-events-none" />
            {fig.label && (
              <div className="absolute bottom-0 left-0 right-0 px-2 py-1 bg-app-media/70 backdrop-blur-sm">
                <span className="font-mono text-[10px] text-app-blogCaption opacity-80">
                  {fig.label}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      {caption && (
        <figcaption className="font-mono text-xs text-app-body mt-2 text-center opacity-70 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// ─── BlogDivider ─────────────────────────────────────────────────────────────
interface BlogDividerProps {
  color?: string;
}

export function BlogDivider({
  color = APP_PALETTE.categoryGraphics,
}: BlogDividerProps) {
  return (
    <div className="my-10 flex items-center justify-center gap-3">
      <Diamond size={12} style={{ color, fill: color }} />
      <Diamond size={16} style={{ color, fill: color }} />
      <Diamond size={12} style={{ color, fill: color }} />
    </div>
  );
}

// ─── BlogCallout ─────────────────────────────────────────────────────────────
interface BlogCalloutProps {
  children: React.ReactNode;
  accent?: string;
}

export function BlogCallout({
  children,
  accent = APP_PALETTE.categoryCv,
}: BlogCalloutProps) {
  return (
    <div
      className="my-4 pl-4 py-3 pr-4 rounded-sm font-mono text-sm text-app-body leading-relaxed"
      style={{ borderLeft: `3px solid ${accent}`, background: `${accent}08` }}
    >
      {children}
    </div>
  );
}

export { BlogChapterProvider, useBlogChapter } from "./BlogChapterContext";
export type { BlogChapterContextValue } from "./BlogChapterContext";
