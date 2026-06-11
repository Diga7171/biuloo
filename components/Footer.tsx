import Link from "next/link";
import { Logo } from "./Logo";
import { getSiteSettings } from "@/lib/settings";

const COLUMNS = [
  {
    title: "Каталог",
    links: [
      { href: "/catalog?type=ELECTRIC", label: "Электромобили" },
      { href: "/catalog?type=HYBRID", label: "Гибриды" },
      { href: "/catalog?type=ICE", label: "ДВС" },
      { href: "/catalog", label: "Все автомобили" },
    ],
  },
  {
    title: "Условия",
    links: [
      { href: "/payment", label: "Оплата" },
      { href: "/delivery", label: "Доставка" },
      { href: "/promotions", label: "Акции" },
      { href: "/contacts", label: "Контакты" },
    ],
  },
  {
    title: "Компания",
    links: [
      { href: "/about", label: "О компании" },
      { href: "/login", label: "Личный кабинет" },
      { href: "/register", label: "Регистрация" },
    ],
  },
];

export async function Footer() {
  const settings = await getSiteSettings();

  return (
    <footer className="relative mt-24 overflow-hidden bg-secondary text-white">
      <div className="diagonal-cut-rev absolute -top-[4vw] left-0 right-0 h-[4vw] bg-secondary" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-10 pt-16 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <Logo className="[&_span]:text-white [&_.text-secondary]:text-white" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
            {settings.companyName} — официальный поставщик новых автомобилей
            из Китая «под ключ»: подбор, выкуп, доставка, растаможка и
            предпродажная подготовка.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { href: settings.telegram, label: "TG" },
              { href: settings.instagram, label: "IG" },
              { href: settings.whatsapp, label: "WA" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-xs font-bold tracking-wide transition-colors hover:border-primary hover:text-primary"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-accent">
              {col.title}
            </h4>
            <ul className="mt-5 flex flex-col gap-3">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-accent">
            Контакты
          </h4>
          <ul className="mt-5 flex flex-col gap-3 text-sm text-white/70">
            <li>
              <a href={`tel:${settings.phone.replace(/[^+\d]/g, "")}`} className="hover:text-white">
                {settings.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${settings.email}`} className="hover:text-white">
                {settings.email}
              </a>
            </li>
            <li>{settings.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {settings.companyName}. Все права защищены.
          </p>
          <p>Автомобили из Китая под красный бантик biuloo 必有路</p>
        </div>
      </div>
    </footer>
  );
}
