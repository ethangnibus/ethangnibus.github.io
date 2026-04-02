import { APP_PALETTE } from "@/theme";
import { PortalProjectedBadge } from "./PortalProjectedBadge";
import { ProjectedText } from "./ProjectedText";
import { StaggerItem, StaggerOnView } from "./StaggerOnView";
import { WoodCloseUpForwardSlash } from "./WoodPatternBackground";

function ProjectedIcon({ src, alt, size = 96 }: { src: string; alt: string; size?: number }) {
  // Mirror ProjectedText — CMY layers at high opacity overlap to a dark center; fringes show chromatic color.
  const cOp = 0.96;
  const mOp = 0.96;
  const yOp = 0.90;

  const mask: React.CSSProperties = {
    position: "absolute", top: 0, left: 0,
    width: size, height: size,
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    pointerEvents: "none",
    userSelect: "none",
  };

  return (
    <span role="img" aria-label={alt} style={{ position: "relative", display: "inline-block", width: size, height: size }}>
      <span aria-hidden="true" style={{ ...mask, backgroundColor: APP_PALETTE.aboutMaskPurple, filter: "blur(8px)", opacity: 0.12 }} />
      <span aria-hidden="true" style={{ ...mask, backgroundColor: APP_PALETTE.aboutCyan, filter: "blur(0.3px)", mixBlendMode: "multiply", opacity: cOp, transform: "translateX(-0.8px)" }} />
      <span aria-hidden="true" style={{ ...mask, backgroundColor: APP_PALETTE.aboutCyan, filter: "blur(0.8px)", mixBlendMode: "multiply", opacity: cOp * 0.5, transform: "translateX(-1.6px)" }} />
      <span aria-hidden="true" style={{ ...mask, backgroundColor: APP_PALETTE.aboutMagenta, filter: "blur(0.3px)", mixBlendMode: "multiply", opacity: mOp, transform: "translateX(0.8px) translateY(-0.5px)" }} />
      <span aria-hidden="true" style={{ ...mask, backgroundColor: APP_PALETTE.aboutMagenta, filter: "blur(0.8px)", mixBlendMode: "multiply", opacity: mOp * 0.5, transform: "translateX(1.6px) translateY(-1px)" }} />
      <span aria-hidden="true" style={{ ...mask, backgroundColor: APP_PALETTE.aboutYellow, filter: "blur(0.3px)", mixBlendMode: "multiply", opacity: yOp, transform: "translateY(0.8px)" }} />
      <span aria-hidden="true" style={{ ...mask, backgroundColor: APP_PALETTE.aboutYellow, filter: "blur(0.8px)", mixBlendMode: "multiply", opacity: yOp * 0.5, transform: "translateY(1.6px)" }} />
    </span>
  );
}

const SKILLS = ["gamedev", "computer vision", "SWE"];

const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/in/ethangnibus",
    src: "/images/main/linkedin.svg",
    alt: "LinkedIn",
  },
  {
    href: "https://github.com/ethangnibus",
    src: "/images/main/github.svg",
    alt: "GitHub",
  },
  {
    href: "mailto:ethangnibus@berkeley.edu",
    src: "/images/main/email.svg",
    alt: "Email",
  },
];

export function AboutSection() {
  return (
    <>
      <WoodCloseUpForwardSlash id="about" className="relative overflow-hidden shadow-lg shadow-black/10">
        <StaggerOnView className="max-w-2xl mx-auto py-16 px-6 md:px-12 text-center">
          <StaggerItem>
            <div className="mb-5">
              <PortalProjectedBadge
                label="Subject Profile"
                textColor={APP_PALETTE.portalCosmo}
                intensity={0.4}
                badgeBg={`radial-gradient(ellipse 110% 160% at 45% 30%, rgba(${APP_PALETTE.portalCosmoRgb},0.28) 0%, rgba(${APP_PALETTE.portalCosmoRgb},0.10) 58%, rgba(${APP_PALETTE.portalCosmoRgb},0.03) 100%)`}
                alignClass="inline-block"
              />
            </div>
          </StaggerItem>

          <StaggerItem>
            <h1 className="font-mono text-5xl md:text-6xl font-bold mb-6">
              <ProjectedText text="Who am I?" color={APP_PALETTE.textInk} />
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="text-app-warm text-xl leading-relaxed mb-8">
              <ProjectedText color={APP_PALETTE.textBodyWarm} intensity={0.35}>
                Full-stack engineer building next-gen healthcare notetaking software.
                I also love{" "}
                {SKILLS.map((skill, i) => (
                  <span key={skill}>
                    <span className="font-mono font-semibold text-portal-cosmo">{skill}</span>
                    {i < SKILLS.length - 2 ? ", " : i === SKILLS.length - 2 ? " and " : ""}
                  </span>
                ))}
                . Say hi :)
              </ProjectedText>
            </p>
          </StaggerItem>

          <StaggerItem>
            <div className="flex justify-center items-center gap-8">
              {SOCIAL_LINKS.map(({ href, src, alt }) => (
                <a
                  key={alt}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform duration-300 hover:scale-110"
                >
                  <ProjectedIcon src={src} alt={alt} />
                </a>
              ))}
            </div>
          </StaggerItem>
        </StaggerOnView>
      </WoodCloseUpForwardSlash>
    </>
  );
}
