import { useId } from 'react';
import { cn } from '@/lib/utils';

type BrandMarkProps = {
  className?: string;
};

type BrandLogoProps = {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  label?: string;
};

export function BrandMark({ className }: BrandMarkProps) {
  const id = useId().replace(/:/g, '');
  const backStrokeId = `nb-back-${id}`;
  const frontStrokeId = `nb-front-${id}`;

  return (
    <svg
      viewBox="0 0 64 56"
      fill="none"
      aria-hidden="true"
      className={cn('h-9 w-9 shrink-0', className)}
    >
      <defs>
        <linearGradient id={backStrokeId} x1="8" y1="4" x2="40" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7c3aed" />
          <stop offset="0.6" stopColor="#5f2fd6" />
          <stop offset="1" stopColor="#352064" />
        </linearGradient>
        <linearGradient id={frontStrokeId} x1="24" y1="20" x2="56" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00f5d4" />
          <stop offset="0.55" stopColor="#6fffe9" />
          <stop offset="1" stopColor="#f5a623" />
        </linearGradient>
      </defs>

      <rect
        x="8"
        y="4"
        width="32"
        height="32"
        rx="9"
        stroke={`url(#${backStrokeId})`}
        strokeWidth="5"
      />
      <rect
        x="24"
        y="20"
        width="32"
        height="32"
        rx="9"
        stroke={`url(#${frontStrokeId})`}
        strokeWidth="5"
      />
    </svg>
  );
}

export function BrandLogo({
  className,
  iconClassName,
  textClassName,
  label = 'NativeBits',
}: BrandLogoProps) {
  const [left, ...rest] = label.split('B');
  const right = rest.length ? `B${rest.join('B')}` : '';

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <BrandMark className={iconClassName} />
      <span
        className={cn(
          'font-display text-2xl leading-none font-normal uppercase tracking-[0.08em] text-[var(--text-primary)]',
          textClassName
        )}
      >
        {left}
        {right ? <span style={{ color: 'var(--accent)' }}>{right}</span> : null}
      </span>
    </span>
  );
}
