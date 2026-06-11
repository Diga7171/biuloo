"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { href: "/catalog", label: "Каталог" },
  { href: "/promotions", label: "Акции" },
  { href: "/delivery", label: "Доставка" },
  { href: "/payment", label: "Оплата" },
  { href: "/about", label: "О компании" },
  { href: "/contacts", label: "Контакты" },
];

export function HeaderNav({
  phone,
  accountHref,
  accountLabel,
}: {
  phone: string;
  accountHref: string;
  accountLabel: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
      <Logo />

      <nav className="hidden items-center gap-7 lg:flex">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-semibold uppercase tracking-wide text-secondary/80 transition-colors hover:text-primary"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="hidden items-center gap-4 lg:flex">
        <a
          href={`tel:${phone.replace(/[^+\d]/g, "")}`}
          className="text-sm font-bold tracking-wide text-secondary"
        >
          {phone}
        </a>
        <Link
          href={accountHref}
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-[0_4px_0_0_var(--color-primary-dark)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_var(--color-primary-dark)] active:translate-y-0 active:shadow-none"
        >
          {accountLabel}
        </Link>
      </div>

      <button
        type="button"
        aria-label="Открыть меню"
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-secondary/10 lg:hidden"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          {open ? (
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full z-40 border-t-2 border-secondary/10 bg-bg px-4 py-4 shadow-xl lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-bold uppercase tracking-wide text-secondary/80 hover:bg-primary-light hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <div className="my-2 h-px bg-secondary/10" />
            <a
              href={`tel:${phone.replace(/[^+\d]/g, "")}`}
              className="px-3 py-2 text-sm font-bold text-secondary"
            >
              {phone}
            </a>
            <Link
              href={accountHref}
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-primary px-5 py-3 text-center text-sm font-bold text-white"
            >
              {accountLabel}
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
