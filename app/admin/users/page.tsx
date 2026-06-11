import { prisma } from "@/lib/prisma";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    include: { _count: { select: { orders: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
          Пользователи
        </span>
        <h1 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
          Пользователи
        </h1>
      </div>

      <div className="flex flex-col divide-y divide-secondary/5 rounded-3xl border-2 border-secondary/10 bg-white">
        {users.map((user) => (
          <div key={user.id} className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div>
              <p className="font-bold">{user.name}</p>
              <p className="text-xs text-secondary/50">
                {user.email} · {user.phone ?? "телефон не указан"} ·{" "}
                {new Intl.DateTimeFormat("ru-RU").format(user.createdAt)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-bg px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-secondary/60">
                {user.role === "ADMIN" ? "Админ" : "Клиент"}
              </span>
              <span className="text-xs font-semibold text-secondary/50">
                {user._count.orders} заявок
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
