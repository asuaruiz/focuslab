"use client";

import { useEffect, useRef, useState } from "react";

type LazyVideoProps = {
  src: string;
  poster: string;
  title: string;
};

// Loads and mounts the <video> source only once it enters the viewport,
// so testimonial-heavy pages don't pay the network cost for reels the
// visitor never scrolls to.
export default function LazyVideo({ src, poster, title }: LazyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="aspect-video w-full bg-charcoal">
      {isVisible ? (
        <video
          className="h-full w-full object-cover"
          controls
          preload="metadata"
          poster={poster}
          aria-label={title}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt={`Miniatura del testimonio: ${title}`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      )}
    </div>
  );
}
