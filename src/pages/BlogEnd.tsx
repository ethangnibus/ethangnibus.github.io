import { Link } from "react-router-dom";

import { BlogPageNavigation } from "@/components/blog/BlogPageNavigation";
import { ProjectedText } from "@/components/ProjectedText";
import { StaggerItem, StaggerOnView } from "@/components/StaggerOnView";
import { woodPatternStyle } from "@/components/WoodPatternBackground";
import { getAdjacentForBlogEnd, PORTFOLIO_HOME_PATH } from "@/data/projects";
import { APP_COLORS } from "@/theme";

export function BlogEnd() {
  const adjacent = getAdjacentForBlogEnd();

  return (
    <div
      className="min-h-[100dvh] flex flex-col pb-28 md:pb-32"
      style={woodPatternStyle("far-grid")}
    >
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <StaggerOnView className="max-w-xl w-full text-center">
          <StaggerItem>
            <p
              className="app-text-strong font-bold leading-none mb-6 md:mb-8 tracking-tight"
              style={{
                fontFamily: '"IBM Plex Mono", ui-monospace, monospace',
                fontSize: "clamp(4.5rem, 18vw, 9rem)",
              }}
            >
              <ProjectedText
                text=":D"
                color={APP_COLORS.textStrong}
                intensity={0.4}
              />
            </p>
          </StaggerItem>
          <StaggerItem>
            <p className="app-body-lg app-text-body mb-10">
              <ProjectedText
                text="You've reached the end of my blog, thanks for reading."
                color={APP_COLORS.textBody}
                intensity={0.35}
              />
            </p>
          </StaggerItem>
          <StaggerItem>
            <Link
              to={PORTFOLIO_HOME_PATH}
              className="pill-btn pill-btn-default px-8 py-3.5 inline-flex"
            >
              <span className="pill-btn-inner">Back home</span>
            </Link>
          </StaggerItem>
        </StaggerOnView>
      </div>

      <BlogPageNavigation
        previous={adjacent.previous}
        next={adjacent.next}
      />
    </div>
  );
}
