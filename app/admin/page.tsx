import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ORDER_STAGE_LABELS, type OrderStage } from "@/lib/orderStages";
import { formatPrice } from "@/lib/cars";
import { ArrowRightIcon, DocumentIcon, CarFrontIcon, FilmIcon, KeyIcon } from "@/components/Icons";

export default async function AdminDashboardPage() {
  const [orderCount, activeOrders, carCount, promoCount, recentOrders] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { stage: { notIn: ["COMPLETED"] } } }),
    prisma.car.count(),
    prisma.promotion.count({ where: { active: true } }),
    prisma.order.findMany({
      include: { car: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
  ]);

  const stats = [
    { label: "Всего заявок", value: orderCount, icon: DocumentIcon },
    { label: "В работе", value: activeOrders, icon: KeyIcon },
    { label: "Автомобилей в каталоге", value: carCount, icon: CarFrontIcon },
    { label: "Активных акций", value: promoCount, icon: FilmIcon },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
          Дашборд
        </span>
        <h1 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
          Обзор сайта
        </h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-3xl border-2 border-secondary/10 bg-white p-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light text-primary">
              <stat.icon className="h-5 w-5" />
            </span>
            <p className="mt-3 font-display text-2xl font-extrabold">{stat.value}</p>
            <p className="text-xs font-semibold uppercase tracking-wide text-secondary/40">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border-2 border-secondary/10 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold">Последние заявки</h2>
          <Link href="/admin/orders" className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-primary">
            Все заявки <ArrowRightIcon className="h-3 w-3" />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="mt-6 text-sm text-secondary/50">Пока нет заявок.</p>
        ) : (
          <div className="mt-4 flex flex-col divide-y divide-secondary/5">
            {recentOrders.map((order) => (
              <Link
                key={order.id}
                href={`/admin/orders/${order.id}`}
                className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm transition-colors hover:text-primary"
              >
                <div>
                  <p className="font-bold">
                    {order.name} · {order.phone}
                  </p>
                  <p className="text-xs text-secondary/50">
                    {order.car ? `${order.car.brand} ${order.car.model}` : "Подбор автомобиля"} ·{" "}
                    {new Intl.DateTimeFormat("ru-RU").format(order.createdAt)}
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
