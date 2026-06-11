import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ORDER_STAGE_LABELS, stageIndex, ORDER_STAGES, type OrderStage } from "@/lib/orderStages";
import { formatPrice } from "@/lib/cars";
import { ArrowRightIcon, DocumentIcon } from "@/components/Icons";

export default async function CabinetPage() {
  const session = await auth();

  const orders = await prisma.order.findMany({
    where: { userId: session!.user!.id },
    include: { car: true, contract: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-5">
      {orders.length === 0 && (
        <div className="rounded-3xl border-2 border-dashed border-secondary/15 bg-white p-12 text-center text-secondary/50">
          У вас пока нет заявок.{" "}
          <Link href="/catalog" className="font-bold text-primary">
            Выбрать автомобиль
          </Link>
        </div>
      )}

      {orders.map((order) => {
        const idx = stageIndex(order.stage);
        const progress = Math.round(((idx + 1) / ORDER_STAGES.length) * 100);

        return (
          <Link
            key={order.id}
            href={`/cabinet/orders/${order.id}`}
            className="reveal flex flex-col gap-4 rounded-3xl border-2 border-secondary/10 bg-white p-6 transition-colors hover:border-primary/30 sm:flex-row sm:items-center sm:p-8"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-primary">
              <DocumentIcon className="h-6 w-6" />
            </span>
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-wide text-secondary/40">
                Заявка №{order.id.slice(-6).toUpperCase()} ·{" "}
                {new Intl.DateTimeFormat("ru-RU").format(order.createdAt)}
              </p>
              <h2 className="mt-1 font-display text-lg font-bold">
                {order.car ? `${order.car.brand} ${order.car.model}` : "Подбор автомобиля"}
              </h2>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-secondary/10">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
                </div>
                <span className="shrink-0 text-xs font-bold uppercase tracking-wide text-primary">
                  {ORDER_STAGE_LABELS[order.stage as OrderStage]}
                </span>
              </div>
              {order.contract && (
                <p className="mt-2 text-xs font-semibold text-secondary/40">
                  Договор № {order.contract.number} ·{" "}
                  {order.contract.status === "SIGNED" ? "подписан" : "черновик"}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-1">
              {order.price && (
                <p className="font-display text-xl font-extrabold text-primary">
                  {formatPrice(order.price, order.car?.currency)}
                </p>
              )}
              <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-secondary/50">
                Подробнее <ArrowRightIcon className="h-3 w-3" />
              </span>
            </div>
          </Link>
        );
      })}

      <Link
        href="/catalog"
        className="reveal flex items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-secondary/15 bg-white/50 p-6 text-sm font-bold uppercase tracking-wide text-secondary/50 transition-colors hover:border-primary/30 hover:text-primary"
      >
        Оставить новую заявку <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </div>
  );
}
