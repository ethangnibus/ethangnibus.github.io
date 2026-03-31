import { useState } from "react";
import { cn } from "@/lib/utils";

interface BlurImageProps {
  src: string;
  smallSrc: string;
  alt?: string;
  className?: string;
}

export function BlurImage({ src, smallSrc, alt = "", className }: BlurImageProps) {
  const [loaded, setLoaded] = useState(() => {
    if (typeof window === "undefined") return false;
    const img = new Image();
    img.src = src;
    return img.complete && img.naturalWidth > 0;
  });

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Blurred small-image placeholder */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage: `url(${smallSrc})`,
          filter: "blur(20px)",
          opacity: loaded ? 0 : 1,
          transition: "opacity 0.5s ease",
        }}
      />
      {/* Full-resolution image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${src})`,
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      />
      {/* Hidden img tag used solely for load detection */}
      <img
        src={src}
        alt={alt}
        className="sr-only"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
