import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { logoutAction } from "@/app/actions/auth";
import { Logo } from "@/components/Logo";

const NAV = [
  { href: "/admin", label: "Дашборд" },
  { href: "/admin/orders", label: "Заявки" },
  { href: "/admin/cars", label: "Автомобили" },
  { href: "/admin/promotions", label: "Акции" },
  { href: "/admin/users", label: "Пользователи" },
  { href: "/admin/settings", label: "Настройки" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/login?callbackUrl=/admin");
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:px-8">
      <aside className="shrink-0 lg:w-60">
        <div className="flex flex-col gap-4 rounded-3xl border-2 border-secondary/10 bg-white p-5 lg:sticky lg:top-24">
          <Logo variant="compact" className="px-1" />
          <p className="px-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Админ-панель
          </p>
          <nav className="flex flex-row flex-wrap gap-1 lg:flex-col">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2.5 text-sm font-bold uppercase tracking-wide text-secondary/60 transition-colors hover:bg-primary-light hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <form action={logoutAction} className="px-1">
            <button
              type="submit"
              className="w-full rounded-full border-2 border-secondary/10 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-secondary/60 transition-colors hover:border-primary/30 hover:text-primary"
            >
              Выйти
            </button>
          </form>
        </div>
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
