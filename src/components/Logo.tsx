interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ className = '', size = 'md', showText = true }: LogoProps) {
  const sizes = {
    sm: { icon: 28, text: 'text-lg', gap: 'gap-1.5', mark: 20 },
    md: { icon: 36, text: 'text-xl', gap: 'gap-2', mark: 26 },
    lg: { icon: 44, text: 'text-2xl', gap: 'gap-2.5', mark: 32 },
  };

  const s = sizes[size];

  return (
    <div className={`flex items-center ${s.gap} ${className}`}>
      {/* Logo mark — minimal pulse icon */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="TechPulse logo"
      >
        {/* Background circle */}
        <rect width="36" height="36" rx="8" fill="#1a1a2e" />
        {/* Pulse line */}
        <path
          d="M8 18h6l2-6 4 12 3-8 2 4h3"
          stroke="#e63946"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      {/* Wordmark */}
      {showText && (
        <span className={`${s.text} font-bold tracking-tight text-[var(--text-primary)]`}>
          Tech<span className="text-[var(--accent)]">Pulse</span>
        </span>
      )}
    </div>
  );
}
