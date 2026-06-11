import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { logoutAction } from "@/app/actions/auth";

const NAV = [
  { href: "/cabinet", label: "Мои заявки" },
  { href: "/cabinet/profile", label: "Профиль" },
];

export default async function CabinetLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/cabinet");

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="reveal flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Личный кабинет
          </span>
          <h1 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
            Здравствуйте, {session.user.name?.split(" ")[0] || "гость"}!
          </h1>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="rounded-full border-2 border-secondary/10 px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-secondary/60 transition-colors hover:border-primary/30 hover:text-primary"
          >
            Выйти
          </button>
        </form>
      </div>

      <div className="mt-8 flex gap-2 border-b-2 border-secondary/10">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-t-xl px-4 py-3 text-sm font-bold uppercase tracking-wide text-secondary/50 transition-colors hover:text-primary"
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="mt-8">{children}</div>
    </div>
  );
}
