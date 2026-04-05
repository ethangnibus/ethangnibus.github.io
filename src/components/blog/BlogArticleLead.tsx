import { ProjectedText } from "@/components/ProjectedText";
import { StaggerItem, StaggerOnView } from "@/components/StaggerOnView";
import { APP_PALETTE } from "@/theme";


export interface BlogArticleLeadProps {
  chapterOrdinal?: string;
  title: string;
  description: string;
}

export function BlogArticleLead({
  chapterOrdinal,
  title,
  description,
}: BlogArticleLeadProps) {
  return (
    <StaggerOnView className="px-3">
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
            color={APP_PALETTE.textStrong}
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
