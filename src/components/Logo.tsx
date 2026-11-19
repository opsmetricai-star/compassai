export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 text-brand ${className}`}>
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden>
        <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="3" />
        <path d="M16 7l3.2 7.8L16 25l-3.2-10.2L16 7z" fill="currentColor" />
      </svg>
      <span className="text-[28px] font-semibold tracking-tight leading-none">compassai</span>
    </span>
  );
}
