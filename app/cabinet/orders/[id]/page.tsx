import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ProgressTracker } from "@/components/ProgressTracker";
import { CarSvg } from "@/components/CarSvg";
import { parseCarImages, formatPrice } from "@/lib/cars";
import { ORDER_STAGE_LABELS, type OrderStage } from "@/lib/orderStages";
import { ArrowRightIcon, DocumentIcon } from "@/components/Icons";

export default async function CabinetOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      car: true,
      contract: true,
      stageHistory: { orderBy: { changedAt: "asc" } },
    },
  });

  if (!order) notFound();
  if (order.userId !== session!.user!.id) redirect("/cabinet");

  const image = order.car ? parseCarImages(order.car)[0] : { variant: "sedan", accent: "#E2231A" };

  return (
    <div className="flex flex-col gap-8">
      <Link
        href="/cabinet"
        className="reveal inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-secondary/40 hover:text-primary"
      >
        ← Все заявки
      </Link>

      <div className="reveal grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-3xl border-2 border-secondary/10 bg-white p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-secondary/40">
                Заявка №{order.id.slice(-6).toUpperCase()} ·{" "}
                {new Intl.DateTimeFormat("ru-RU").format(order.createdAt)}
              </p>
              <h2 className="mt-1 font-display text-xl font-bold sm:text-2xl">
                {order.car ? `${order.car.brand} ${order.car.model}` : "Подбор автомобиля"}
              </h2>
            </div>
            <span className="rounded-full bg-accent px-4 py-2 text-xs font-bold uppercase tracking-wide text-secondary">
              {ORDER_STAGE_LABELS[order.stage as OrderStage]}
            </span>
          </div>

          <div className="mt-6 border-t-2 border-secondary/5 pt-6">
            <ProgressTracker currentStage={order.stage} history={order.stageHistory} />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          {order.car && (
            <div className="rounded-3xl border-2 border-secondary/10 bg-primary-light p-6">
              <CarSvg variant={image.variant} accent={image.accent} className="w-full text-secondary/70" />
              <div className="mt-3 flex items-center justify-between">
                <p className="font-display text-sm font-bold">
                  {order.car.brand} {order.car.model}
                </p>
                {order.price && (
                  <p className="font-display text-base font-extrabold text-primary">
                    {formatPrice(order.price, order.car.currency)}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="rounded-3xl border-2 border-secondary/10 bg-white p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-light text-primary">
              <DocumentIcon className="h-5 w-5" />
            </span>
            <h3 className="mt-3 font-display text-base font-bold">Договор</h3>
            {order.contract ? (
              <>
                <p className="mt-1 text-sm text-secondary/55">
                  № {order.contract.number} ·{" "}
                  {order.contract.status === "SIGNED" ? "подписан" : "черновик"}
                </p>
                {order.contract.status === "SIGNED" && (
                  <a
                    href={`/api/contracts/${order.contract.id}/pdf`}
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white"
                  >
                    Скачать PDF <ArrowRightIcon className="h-3 w-3" />
                  </a>
                )}
              </>
            ) : (
              <p className="mt-1 text-sm text-secondary/55">
                Договор появится здесь, когда менеджер подготовит документы.
              </p>
            )}
          </div>

          {order.message && (
            <div className="rounded-3xl border-2 border-secondary/10 bg-white p-6">
              <h3 className="font-display text-base font-bold">Комментарий</h3>
              <p className="mt-2 text-sm leading-relaxed text-secondary/55">{order.message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
