import React from 'react';

type GradientTextProps = {
  children: React.ReactNode;
  className?: string;
  from?: string;
  via?: string;
  to?: string;
};

export default function GradientText({
  children,
  className = '',
  from = '#C084FC',
  via,
  to = '#A855F7',
}: GradientTextProps) {
  const gradient = via
    ? `linear-gradient(to right, ${from}, ${via}, ${to})`
    : `linear-gradient(to right, ${from}, ${to})`;

  return (
    <span
      className={`text-transparent bg-clip-text ${className}`.trim()}
      style={{ backgroundImage: gradient }}
    >
      {children}
    </span>
  );
}
