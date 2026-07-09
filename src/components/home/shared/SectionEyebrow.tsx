import React from 'react';

type SectionEyebrowVariant = 'muted-label' | 'accent-label';

export type SectionEyebrowProps = {
  number: string;
  label: string;
  accentColor: string;
  variant?: SectionEyebrowVariant;
  className?: string;
};

export default function SectionEyebrow({
  number,
  label,
  accentColor,
  variant = 'accent-label',
  className = '',
}: SectionEyebrowProps) {
  if (variant === 'muted-label') {
    return (
      <div className={`flex items-center gap-4 opacity-80 ${className}`}>
        <span className="font-semibold text-sm" style={{ color: accentColor }}>
          {number}
        </span>
        <div className="w-12 h-px" style={{ backgroundColor: `${accentColor}4D` }} />
        <span className="text-tc-muted uppercase text-base font-semibold tracking-[0.2em]">
          {label}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 sm:gap-4 ${className}`}>
      <span
        className="font-semibold tracking-[0.3em] text-sm"
        style={{ color: accentColor }}
      >
        {number}
      </span>
      <div className="h-px w-10 sm:w-16" style={{ backgroundColor: accentColor }} />
      <span
        className="font-semibold tracking-[0.2em] text-xs uppercase"
        style={{ color: accentColor }}
      >
        {label}
      </span>
    </div>
  );
}
