import { Navigate, useParams } from "react-router-dom";

export function BlogIntroduction() {
  const { projectSlug } = useParams<{ projectSlug: string }>();
  if (!projectSlug) return <Navigate to="/blog" replace />;

  return <Navigate to={`/blog/${projectSlug}`} replace />;
}

export const BlogIntroductionAlias = BlogIntroduction;
