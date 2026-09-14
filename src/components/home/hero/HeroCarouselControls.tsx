"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type HeroCarouselControlsProps = {
  currentSlide?: number;
  totalSlides?: number;
  onPrev?: () => void;
  onNext?: () => void;
};

export default function HeroCarouselControls({
  currentSlide = 1,
  totalSlides = 4,
  onPrev,
  onNext,
}: HeroCarouselControlsProps) {
  const [slide, setSlide] = useState(currentSlide);

  const handlePrev = () => {
    const next = slide > 1 ? slide - 1 : totalSlides;
    setSlide(next);
    onPrev?.();
  };

  const handleNext = () => {
    const next = slide < totalSlides ? slide + 1 : 1;
    setSlide(next);
    onNext?.();
  };

  const formattedCurrent = String(slide).padStart(2, "0");
  const formattedTotal = String(totalSlides).padStart(2, "0");

  return (
    <div className="flex items-center justify-center gap-5 select-none">
      {/* Prev Button */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous slide"
        className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] bg-[#090e1f]/70 text-white/70 shadow-sm backdrop-blur-md transition-all duration-200 hover:border-white/25 hover:bg-[#0c132a] hover:text-white active:scale-95"
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
      </button>

      {/* Slide Counter */}
      <div className="flex items-center gap-1.5 font-mono text-xs font-semibold tracking-widest text-white/80 sm:text-sm">
        <span className="text-white">{formattedCurrent}</span>
        <span className="text-white/40">/</span>
        <span className="text-white/60">{formattedTotal}</span>
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={handleNext}
        aria-label="Next slide"
        className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] bg-[#090e1f]/70 text-white/70 shadow-sm backdrop-blur-md transition-all duration-200 hover:border-white/25 hover:bg-[#0c132a] hover:text-white active:scale-95"
      >
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}
