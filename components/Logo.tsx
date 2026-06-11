import Link from "next/link";

export function Logo({
  className = "",
  variant = "full",
}: {
  className?: string;
  variant?: "full" | "compact";
}) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-[0_4px_0_0_var(--color-primary-dark)] transition-transform group-hover:-translate-y-0.5 group-hover:shadow-[0_6px_0_0_var(--color-primary-dark)]">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <path
            d="M4 24c4-1 6-5 8-9s4-8 8-9c3-1 7 0 8 3"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeDasharray="4 4"
          />
          <path
            d="M24 5l4 4-4 4"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="flex items-baseline gap-1.5">
          <span className="font-display text-2xl font-bold lowercase tracking-tight text-primary">
            biuloo
          </span>
          <span className="font-display text-lg font-bold text-secondary">
            必有路
          </span>
        </span>
        {variant === "full" && (
          <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-secondary/60">
            Supply the Chinese good cars
          </span>
        )}
      </span>
    </Link>
  );
}
