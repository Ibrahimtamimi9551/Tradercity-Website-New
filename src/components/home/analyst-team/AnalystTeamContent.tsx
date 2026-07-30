"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { PublicAnalystCard } from "@/components/analysts/public-profile";
import { usePublishedPublicProfiles } from "@/lib/analysts/hooks/usePublishedPublicProfiles";
import {
  toPublicAnalystCardProps,
  type PublicAnalystProfile,
} from "@/types/analysts/public-profile";
import { cn } from "@/lib/admin/cn";

const GAP_PX = 28;
const EASE = [0.22, 1, 0.36, 1] as const;

function wrapIndex(index: number, length: number): number {
  if (length === 0) return 0;
  return ((index % length) + length) % length;
}

type SpotlightCarouselProps = {
  profiles: PublicAnalystProfile[];
};

/**
 * Three-window spotlight track (prev / active / next).
 * Profile-stable keys keep the centered card mounted across the reset,
 * so the slide feels continuous instead of a hard refresh.
 */
function SpotlightCarousel({ profiles }: SpotlightCarouselProps) {
  const count = profiles.length;
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [stageWidth, setStageWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [uniformHeight, setUniformHeight] = useState<number | undefined>();
  const [index, setIndex] = useState(0);
  const [slideOffset, setSlideOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [instant, setInstant] = useState(false);

  const measure = useCallback(() => {
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!stage || !track) return;

    const nextStage = stage.getBoundingClientRect().width;
    if (nextStage > 0) setStageWidth(nextStage);

    const cards = Array.from(
      track.querySelectorAll<HTMLElement>("[data-analyst-slide]")
    );
    if (cards.length === 0) return;

    const nextWidth = Math.max(
      ...cards.map((el) => el.getBoundingClientRect().width)
    );
    if (nextWidth > 0) setCardWidth(nextWidth);

    const heights = cards.map((el) => {
      const prev = el.style.minHeight;
      el.style.minHeight = "";
      const h = el.getBoundingClientRect().height;
      el.style.minHeight = prev;
      return h;
    });
    const maxH = Math.max(...heights, 0);
    if (maxH > 0) setUniformHeight(maxH);
  }, []);

  useLayoutEffect(() => {
    measure();
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(() => measure());
    observer.observe(stage);
    return () => observer.disconnect();
  }, [count, measure, profiles, index]);

  useEffect(() => {
    if (index >= count && count > 0) setIndex(0);
  }, [count, index]);

  const step = cardWidth + GAP_PX;
  const baseX =
    cardWidth > 0 && stageWidth > 0
      ? stageWidth / 2 - cardWidth - GAP_PX - cardWidth / 2
      : 0;
  const trackX = count === 1 ? 0 : baseX + slideOffset * step;

  const commitSlide = useCallback(
    (dir: -1 | 1) => {
      if (count < 2 || isAnimating || cardWidth <= 0) return;
      setIsAnimating(true);
      setInstant(false);
      setSlideOffset(dir);
    },
    [cardWidth, count, isAnimating]
  );

  const goPrev = useCallback(() => commitSlide(1), [commitSlide]);
  const goNext = useCallback(() => commitSlide(-1), [commitSlide]);

  const jumpTo = useCallback(
    (target: number) => {
      setInstant(true);
      setIndex(wrapIndex(target, count));
      setSlideOffset(0);
      setIsAnimating(false);
      requestAnimationFrame(() => setInstant(false));
    },
    [count]
  );

  const goTo = useCallback(
    (nextIndex: number) => {
      if (count < 2 || isAnimating) return;
      const target = wrapIndex(nextIndex, count);
      if (target === index) return;

      const forward = wrapIndex(target - index, count);
      const backward = wrapIndex(index - target, count);
      const nearest = Math.min(forward, backward);

      if (nearest === 1) {
        commitSlide(forward === 1 ? -1 : 1);
        return;
      }

      jumpTo(target);
    },
    [commitSlide, count, index, isAnimating, jumpTo]
  );

  const handleAnimationComplete = useCallback(() => {
    if (slideOffset === 0) return;
    const dir = slideOffset < 0 ? 1 : -1;
    setInstant(true);
    setIndex((prev) => wrapIndex(prev + dir, count));
    setSlideOffset(0);
    setIsAnimating(false);
    requestAnimationFrame(() => setInstant(false));
  }, [count, slideOffset]);

  useEffect(() => {
    if (count < 2) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count, goNext, goPrev]);

  if (count === 0) return null;

  const slots: PublicAnalystProfile[] =
    count === 1
      ? [profiles[0]!]
      : [
          profiles[wrapIndex(index - 1, count)]!,
          profiles[wrapIndex(index, count)]!,
          profiles[wrapIndex(index + 1, count)]!,
        ];

  const showNav = count > 1;
  const visualActiveSlot =
    count === 1 ? 0 : slideOffset === -1 ? 2 : slideOffset === 1 ? 0 : 1;

  return (
    <div
      className="relative w-full"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured analysts"
    >
      <div className="relative mx-auto w-full max-w-[1320px] overflow-x-clip">
        <div ref={stageRef} className="relative w-full overflow-hidden">
          <div
            className="pointer-events-none absolute left-1/2 top-[18%] z-0 hidden h-[70%] w-[min(640px,70%)] -translate-x-1/2 rounded-full bg-[#D4AF37]/[0.08] blur-[90px] md:block"
            aria-hidden
          />

          <motion.div
            ref={trackRef}
            className="relative z-10 flex items-stretch will-change-transform"
            style={{ gap: GAP_PX }}
            animate={{ x: trackX }}
            transition={instant ? { duration: 0 } : { duration: 0.5, ease: EASE }}
            onAnimationComplete={handleAnimationComplete}
          >
            {slots.map((profile, slotIndex) => {
              const isLogicalActive = count === 1 || slotIndex === 1;
              const isVisuallyActive = slotIndex === visualActiveSlot;

              return (
                <div
                  key={profile.id}
                  data-analyst-slide
                  className={cn(
                    "w-[min(700px,calc(100vw-2rem))] shrink-0 sm:w-[min(680px,78vw)] lg:w-[min(700px,52vw)] xl:w-[700px]",
                    isVisuallyActive ? "z-10" : "z-0",
                    isVisuallyActive
                      ? "opacity-100"
                      : "opacity-100 md:opacity-[0.4] md:brightness-[0.7] md:saturate-[0.5] md:blur-[1.5px]",
                    "md:transition-[filter,opacity] md:duration-500 md:ease-out"
                  )}
                  style={uniformHeight ? { minHeight: uniformHeight } : undefined}
                >
                  <div
                    className={cn(
                      "h-full rounded-[1.75rem]",
                      "md:transition-shadow md:duration-500",
                      isVisuallyActive
                        ? "md:shadow-[0_28px_90px_rgba(0,0,0,0.55),0_0_70px_rgba(212,175,55,0.14)]"
                        : "md:shadow-[0_12px_36px_rgba(0,0,0,0.35)]"
                    )}
                  >
                    <div
                      className={cn("h-full", !isLogicalActive && "cursor-pointer")}
                      aria-live={isLogicalActive ? "polite" : undefined}
                      aria-atomic={isLogicalActive ? true : undefined}
                      role={!isLogicalActive ? "button" : undefined}
                      tabIndex={!isLogicalActive ? (isAnimating ? -1 : 0) : undefined}
                      aria-label={
                        !isLogicalActive
                          ? slotIndex === 0
                            ? `Show previous analyst, ${profile.displayName}`
                            : `Show next analyst, ${profile.displayName}`
                          : undefined
                      }
                      onClick={
                        !isLogicalActive
                          ? slotIndex === 0
                            ? goPrev
                            : goNext
                          : undefined
                      }
                      onKeyDown={
                        !isLogicalActive
                          ? (event) => {
                              if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                if (slotIndex === 0) goPrev();
                                else goNext();
                              }
                            }
                          : undefined
                      }
                    >
                      <PublicAnalystCard
                        {...toPublicAnalystCardProps(profile)}
                        preview={!isLogicalActive}
                        className="h-full"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {showNav ? (
          <>
            <button
              type="button"
              onClick={goPrev}
              disabled={isAnimating}
              aria-label="Previous analyst"
              className="absolute left-1 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#D4AF37]/35 bg-black/60 text-[#D4AF37] backdrop-blur-md transition hover:border-[#D4AF37]/70 hover:bg-[#D4AF37]/10 disabled:opacity-40 sm:left-2 sm:h-12 sm:w-12 md:left-3 lg:left-4"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={isAnimating}
              aria-label="Next analyst"
              className="absolute right-1 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#D4AF37]/35 bg-black/60 text-[#D4AF37] backdrop-blur-md transition hover:border-[#D4AF37]/70 hover:bg-[#D4AF37]/10 disabled:opacity-40 sm:right-2 sm:h-12 sm:w-12 md:right-3 lg:right-4"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </>
        ) : null}
      </div>

      {showNav ? (
        <div
          className="mt-8 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Analyst slides"
        >
          {profiles.map((profile, i) => {
            const active = i === wrapIndex(index, count);
            return (
              <button
                key={profile.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`Show ${profile.displayName}`}
                disabled={isAnimating}
                onClick={() => goTo(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  active
                    ? "w-8 bg-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.45)]"
                    : "w-2.5 bg-white/20 hover:bg-white/35"
                )}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default function AnalystTeamContent() {
  const profiles = usePublishedPublicProfiles();

  return (
    <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 py-16 font-sans sm:px-8 lg:px-12 lg:py-24">
      <header className="mb-12 flex max-w-3xl flex-col items-center text-center lg:mb-16">
        <span className="mb-5 inline-flex items-center rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/[0.08] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E8C96A]">
          Meet the Analysts
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-[1.1]">
          The Minds Behind TraderCity
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
          Verified specialists who produce TraderCity&apos;s market intelligence
          and educational research — the human face of our research ecosystem.
        </p>
        <div
          className="mt-7 h-px w-16 bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent"
          aria-hidden
        />
      </header>

      {profiles.length === 0 ? (
        <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/[0.02] px-8 py-16 text-center">
          <p className="text-sm text-white/50">
            Published analyst profiles will appear here once they are curated and
            made publicly visible.
          </p>
        </div>
      ) : (
        <SpotlightCarousel profiles={profiles} />
      )}

      <div className="mt-14 w-full max-w-5xl lg:mt-16">
        <div className="flex flex-col items-start gap-5 rounded-2xl border border-white/[0.08] bg-gradient-to-r from-[#0C0E14] via-[#10131C] to-[#0C0E14] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-7 sm:py-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#D4AF37]/25 bg-[#D4AF37]/10 text-[#D4AF37]">
              <BookOpen className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <p className="text-base font-semibold text-white sm:text-lg">
                TraderCity Research Coverage
              </p>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-white/50">
                Members receive structured market reports, educational breakdowns,
                and multi-perspective analysis from this verified research team.
              </p>
            </div>
          </div>
          <Link
            href="/analysts"
            className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-6 py-3.5 text-sm font-semibold text-[#1A1408] transition hover:brightness-110 sm:w-auto"
          >
            Become an Analyst
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
