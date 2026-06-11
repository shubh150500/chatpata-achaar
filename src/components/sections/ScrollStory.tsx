"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";

/**
 * Cinematic scroll-scrubbed storytelling.
 * A real product film (hero-story.mp4) is pinned to the viewport while the
 * section is tall (400vh). Instead of *playing*, the video's currentTime is
 * driven directly by scroll progress — so scrolling scrubs the film frame by
 * frame (Apple-style). Scene captions fade in/out over the matching moments.
 */

const stages = [
  {
    eyebrow: "Scene I",
    title: "Every Bite Tells A Story",
    text: "A jar of achaar is a jar of memory — of summer mangoes drying on terraces, of grandmothers' hands, of recipes never written down.",
    range: [0.0, 0.06, 0.16, 0.24] as const,
  },
  {
    eyebrow: "Scene II",
    title: "Sealed With Tradition",
    text: "Cold-pressed mustard oil, hand-pounded spices, sun-cured mango — pressed and sealed exactly as it's been since 1952.",
    range: [0.26, 0.34, 0.44, 0.52] as const,
  },
  {
    eyebrow: "Scene III",
    title: "The Perfect Splash",
    text: "Raw mango, red chilli and golden oil caught mid-air — that first tangy, fiery bite, frozen in time.",
    range: [0.54, 0.62, 0.72, 0.8] as const,
  },
  {
    eyebrow: "Scene IV",
    title: "Handcrafted Luxury",
    text: "Every jar settles into a moment worth savouring. This is achaar, elevated to an art.",
    range: [0.82, 0.9, 0.97, 1.0] as const,
  },
];

function StageText({
  progress,
  stage,
}: {
  progress: MotionValue<number>;
  stage: (typeof stages)[number];
}) {
  const [a, b, c, d] = stage.range;
  const opacity = useTransform(progress, [a, b, c, d], [0, 1, 1, 0]);
  const y = useTransform(progress, [a, b, c, d], [60, 0, 0, -60]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-none absolute inset-x-0 bottom-[12%] mx-auto max-w-3xl px-6 text-center"
    >
      <p className="eyebrow drop-shadow-lg">{stage.eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-brand-cream drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)] sm:text-6xl">
        {stage.title}
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-sm text-brand-cream/85 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] sm:text-lg">
        {stage.text}
      </p>
    </motion.div>
  );
}

export default function ScrollStory() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Load video metadata to know its duration
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onMeta = () => {
      setDuration(v.duration || 0);
      setReady(true);
    };
    if (v.readyState >= 1) onMeta();
    else v.addEventListener("loadedmetadata", onMeta);
    return () => v.removeEventListener("loadedmetadata", onMeta);
  }, []);

  // Scrub the video as the user scrolls
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    // leave a tiny margin so the last frame is reachable
    const target = Math.min(Math.max(p, 0), 1) * (duration - 0.05);
    // requestVideoFrameCallback-free smooth set
    if (Math.abs(v.currentTime - target) > 0.01) {
      v.currentTime = target;
    }
  });

  // progress rail + scroll hint
  const railHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const vignette = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0.5, 0.25, 0.25, 0.55]
  );

  return (
    <section ref={ref} id="story" className="relative h-[420vh] bg-black">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* pinned scrubbing video */}
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="/hero-story.mp4"
          poster="/hero-story-poster.jpg"
          muted
          playsInline
          preload="auto"
        />

        {/* dark vignette for text legibility */}
        <motion.div
          style={{ opacity: vignette }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40"
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.6))]" />

        {/* loading shimmer until first frame is ready */}
        {!ready && (
          <div className="absolute inset-0 grid place-items-center bg-luxury-gradient">
            <div className="h-12 w-12 animate-spin rounded-full border-2 border-brand-saffron border-t-transparent" />
          </div>
        )}

        {/* scene captions */}
        {stages.map((stage) => (
          <StageText key={stage.eyebrow} progress={scrollYProgress} stage={stage} />
        ))}

        {/* progress rail */}
        <div className="absolute right-6 top-1/2 hidden h-40 w-1 -translate-y-1/2 overflow-hidden rounded-full bg-white/15 sm:block">
          <motion.div
            style={{ height: railHeight }}
            className="w-full rounded-full bg-gradient-to-b from-brand-saffron to-brand-red"
          />
        </div>

        {/* scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-brand-cream/50"
        >
          Scroll to play the story
        </motion.div>
      </div>
    </section>
  );
}
