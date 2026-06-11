import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ORDER_STAGES, ORDER_STAGE_LABELS, type OrderStage } from "@/lib/orderStages";
import { formatPrice } from "@/lib/cars";

function filterClass(active: boolean) {
  return `rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
    active
      ? "bg-primary text-white"
      : "border-2 border-secondary/10 bg-white text-secondary/60 hover:border-primary/30"
  }`;
}

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ stage?: string }>;
}) {
  const { stage } = await searchParams;
  const activeStage = stage && ORDER_STAGES.includes(stage as OrderStage) ? (stage as OrderStage) : undefined;

  const orders = await prisma.order.findMany({
    where: activeStage ? { stage: activeStage } : {},
    include: { car: true, user: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Заявки</span>
        <h1 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
          Заявки и заказы
        </h1>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link href="/admin/orders" className={filterClass(!activeStage)}>
          Все
        </Link>
        {ORDER_STAGES.map((s) => (
          <Link key={s} href={`/admin/orders?stage=${s}`} className={filterClass(activeStage === s)}>
            {ORDER_STAGE_LABELS[s]}
          </Link>
        ))}
      </div>

      <div className="flex flex-col divide-y divide-secondary/5 rounded-3xl border-2 border-secondary/10 bg-white">
        {orders.length === 0 ? (
          <p className="p-6 text-sm text-secondary/50">Заявок не найдено.</p>
        ) : (
          orders.map((order) => (
            <Link
              key={order.id}
              href={`/admin/orders/${order.id}`}
              className="flex flex-wrap items-center justify-between gap-3 p-5 transition-colors hover:bg-bg"
            >
              <div>
                <p className="font-bold">
                  {order.name} · {order.phone}
                </p>
                <p className="text-xs text-secondary/50">
                  {order.car ? `${order.car.brand} ${order.car.model}` : "Подбор автомобиля"} ·{" "}
                  {new Intl.DateTimeFormat("ru-RU").format(order.createdAt)} ·{" "}
                  {order.user ? order.user.email : "гостевая заявка"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {order.price && (
                  <span className="font-display text-sm font-bold text-primary">
                    {formatPrice(order.price, order.car?.currency)}
                  </span>
                )}
                <span className="rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-secondary">
                  {ORDER_STAGE_LABELS[order.stage as OrderStage]}
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
