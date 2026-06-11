import Link from "next/link";
import { auth } from "@/auth";
import { getSiteSettings } from "@/lib/settings";
import { HeaderNav } from "./HeaderNav";

export async function Header() {
  const [session, settings] = await Promise.all([auth(), getSiteSettings()]);

  let accountHref = "/login";
  let accountLabel = "Войти";
  if (session?.user) {
    accountHref = session.user.role === "ADMIN" ? "/admin" : "/cabinet";
    accountLabel = session.user.role === "ADMIN" ? "Админка" : "Личный кабинет";
  }

  return (
    <header className="sticky top-0 z-50 bg-bg/90 backdrop-blur-md">
      {settings.announcementActive && settings.announcementText && (
        <div className="overflow-hidden bg-secondary py-2 text-white">
          <div className="flex animate-marquee whitespace-nowrap text-xs font-semibold uppercase tracking-[0.2em]">
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i} className="mx-6 flex items-center gap-3">
                <span className="text-accent">★</span>
                {settings.announcementText}
                <Link href="/promotions" className="underline decoration-accent decoration-2 underline-offset-4">
                  Подробнее
                </Link>
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="relative border-b-2 border-secondary/10">
        <HeaderNav
          phone={settings.phone}
          accountHref={accountHref}
          accountLabel={accountLabel}
        />
      </div>
    </header>
  );
}
