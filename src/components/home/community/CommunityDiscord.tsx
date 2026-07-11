'use client';

import React from 'react';
import SectionEyebrow from '../shared/SectionEyebrow';
import GradientText from '../shared/GradientText';

export default function CommunityDiscord() {
  return (
    <div className="relative z-10 w-full flex flex-col items-center pt-12 lg:pt-16 font-sans">
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 mb-12 lg:mb-16 flex flex-col items-center text-center">
        <SectionEyebrow
          number="05"
          label="Community"
          accentColor="#3B82F6"
          className="mb-8 justify-center"
        />

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] max-w-4xl">
          Where traders and analysts
          <br />
          <GradientText from="#60A5FA" via="#3B82F6" to="#06B6D4">
            build together.
          </GradientText>
        </h2>

        <p className="mt-6 sm:mt-8 text-lg sm:text-xl lg:text-2xl text-white/55 leading-relaxed max-w-2xl font-medium">
          Different traders. Different analysts.
          <br className="hidden sm:block" />
          One Discord where ideas converge and everyone grows.
        </p>
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 relative">
        <div
          className="w-full rounded-2xl sm:rounded-[2rem] border border-white/5 overflow-hidden relative"
          style={{
            WebkitMaskImage: `
    linear-gradient(
      to bottom,
      black 0%,
      black 35%,
      rgba(0,0,0,0.95) 50%,
      rgba(0,0,0,0.8) 65%,
      rgba(0,0,0,0.55) 78%,
      rgba(0,0,0,0.25) 90%,
      transparent 100%
    )
  `,
            maskImage: `
    linear-gradient(
      to bottom,
      black 0%,
      black 35%,
      rgba(0,0,0,0.95) 50%,
      rgba(0,0,0,0.8) 65%,
      rgba(0,0,0,0.55) 78%,
      rgba(0,0,0,0.25) 90%,
      transparent 100%
    )
  `,
          }}
        >
          <img
            src="/images/Community/Discord.png"
            alt="TraderCity Discord Community"
            className="w-full h-auto object-cover block"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      </div>
    </div>
  );
}
