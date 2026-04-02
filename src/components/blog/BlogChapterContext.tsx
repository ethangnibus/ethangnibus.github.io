import { createContext, useContext } from "react";

import type { Chapter, Project } from "@/data/projects";

export interface BlogChapterContextValue {
  project: Project;
  chapter: Chapter;
  /** Zero-based index of this chapter within the project. */
  chapterIndex: number;
}

const BlogChapterContext = createContext<BlogChapterContextValue | null>(null);

export function BlogChapterProvider({
  value,
  children,
}: {
  value: BlogChapterContextValue;
  children: React.ReactNode;
}) {
  return (
    <BlogChapterContext.Provider value={value}>{children}</BlogChapterContext.Provider>
  );
}

export function useBlogChapter(): BlogChapterContextValue {
  const ctx = useContext(BlogChapterContext);
  if (!ctx) {
    throw new Error("useBlogChapter must be used within BlogChapterProvider");
  }
  return ctx;
}
