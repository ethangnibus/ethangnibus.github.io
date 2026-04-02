import { Link } from "react-router-dom";

import { ProjectedText } from "@/components/ProjectedText";
import { StaggerItem, StaggerOnView } from "@/components/StaggerOnView";
import { APP_COLORS } from "@/theme";

export interface BlogArticleLeadProps {
  backTo: string;
  backLabel: string;
  categoryLabel: string;
  categoryColor: string;
  chapterOrdinal?: string;
  title: string;
  description: string;
}

export function BlogArticleLead({
  backTo,
  backLabel,
  categoryLabel,
  categoryColor,
  chapterOrdinal,
  title,
  description,
}: BlogArticleLeadProps) {
  return (
    <StaggerOnView className="px-3">
      <StaggerItem>
        <Link
          to={backTo}
          className="inline-flex items-center gap-1 app-body text-app-body hover:text-app-strong transition-colors mb-8 md:mb-10"
        >
          <ProjectedText
            text={backLabel}
            color={APP_COLORS.textBody}
            intensity={0.3}
          />
        </Link>
      </StaggerItem>

      <StaggerItem>
        <span
          className="block app-eyebrow mb-2"
          style={{ color: categoryColor }}
        >
          <ProjectedText
            text={categoryLabel}
            color={categoryColor}
            intensity={0.3}
          />
        </span>
      </StaggerItem>

      {chapterOrdinal != null && chapterOrdinal !== "" && (
        <StaggerItem>
          <p className="font-mono text-sm md:text-base text-app-body/75 tabular-nums mb-2 md:mb-3">
            {chapterOrdinal}
          </p>
        </StaggerItem>
      )}

      <StaggerItem>
        <h1 className="app-title-1 app-text-strong mb-4 md:mb-5">
          <ProjectedText
            text={title}
            color={APP_COLORS.textStrong}
            intensity={0.4}
          />
        </h1>
      </StaggerItem>

      <StaggerItem>
        <p className="app-body-lg app-text-body mb-8 md:mb-10 max-w-xl">
          {description}
        </p>
      </StaggerItem>
    </StaggerOnView>
  );
}
