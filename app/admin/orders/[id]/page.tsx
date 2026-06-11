import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProgressTracker } from "@/components/ProgressTracker";
import { CarSvg } from "@/components/CarSvg";
import { parseCarImages, formatPrice } from "@/lib/cars";
import { ORDER_STAGES, ORDER_STAGE_LABELS, CONTRACT_STATUSES, CONTRACT_STATUS_LABELS, type OrderStage } from "@/lib/orderStages";
import { updateOrderStage, updateOrderDetails } from "@/app/actions/admin/orders";
import { saveContract, deleteContract } from "@/app/actions/admin/contracts";

const inputClass =
  "rounded-xl border-2 border-secondary/10 bg-bg px-4 py-3 text-sm font-normal outline-none transition-colors focus:border-primary";

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [order, cars] = await Promise.all([
    prisma.order.findUnique({
      where: { id },
      include: {
        car: true,
        user: true,
        contract: true,
        stageHistory: { orderBy: { changedAt: "asc" } },
      },
    }),
    prisma.car.findMany({ orderBy: { brand: "asc" } }),
  ]);

  if (!order) notFound();

  const image = order.car ? parseCarImages(order.car)[0] : { variant: "sedan", accent: "#E2231A" };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link
            href="/admin/orders"
            className="text-xs font-bold uppercase tracking-wide text-secondary/40 hover:text-primary"
          >
            ← Все заявки
          </Link>
          <h1 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
            Заявка №{order.id.slice(-6).toUpperCase()}
          </h1>
        </div>
        <span className="rounded-full bg-accent px-4 py-2 text-xs font-bold uppercase tracking-wide text-secondary">
          {ORDER_STAGE_LABELS[order.stage as OrderStage]}
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <section className="rounded-3xl border-2 border-secondary/10 bg-white p-6 sm:p-8">
            <h2 className="font-display text-lg font-bold">Клиент</h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2 text-sm">
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-secondary/40">Имя</dt>
                <dd className="mt-1 font-semibold">{order.name}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-secondary/40">Телефон</dt>
                <dd className="mt-1 font-semibold">{order.phone}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-secondary/40">Email</dt>
                <dd className="mt-1 font-semibold">{order.email ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-secondary/40">Аккаунт</dt>
                <dd className="mt-1 font-semibold">{order.user ? order.user.email : "Гостевая заявка"}</dd>
              </div>
            </dl>
            {order.message && (
              <div className="mt-4 rounded-2xl bg-bg p-4 text-sm text-secondary/70">{order.message}</div>
            )}
          </section>

          <section className="rounded-3xl border-2 border-secondary/10 bg-white p-6 sm:p-8">
            <h2 className="font-display text-lg font-bold">Прогресс заказа</h2>
            <div className="mt-6">
              <ProgressTracker currentStage={order.stage} history={order.stageHistory} />
            </div>
          </section>

          <section className="rounded-3xl border-2 border-secondary/10 bg-white p-6 sm:p-8">
            <h2 className="font-display text-lg font-bold">Изменить этап</h2>
            <p className="mt-1 text-sm text-secondary/55">
              Комментарий будет виден клиенту в личном кабинете.
            </p>
            <form action={updateOrderStage} className="mt-4 flex flex-col gap-4">
              <input type="hidden" name="id" value={order.id} />
              <label className="flex flex-col gap-1.5 text-sm font-semibold">
                Новый этап
                <select name="stage" defaultValue={order.stage} className={inputClass}>
                  {ORDER_STAGES.map((s) => (
                    <option key={s} value={s}>
                      {ORDER_STAGE_LABELS[s]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-semibold">
                Комментарий к этапу
                <textarea
                  name="comment"
                  rows={2}
                  placeholder="Например: автомобиль прибыл в порт, ожидаем растаможку"
                  className={inputClass}
                />
              </label>
              <button
                type="submit"
                className="self-start rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-[0_4px_0_0_var(--color-primary-dark)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_var(--color-primary-dark)] active:translate-y-0 active:shadow-none"
              >
                Обновить этап
              </button>
            </form>
          </section>
        </div>

        <div className="flex flex-col gap-6">
          {order.car && (
            <div className="rounded-3xl border-2 border-secondary/10 bg-primary-light p-6">
              <CarSvg variant={image.variant} accent={image.accent} className="w-full text-secondary/70" />
              <p className="mt-3 font-display text-sm font-bold">
                {order.car.brand} {order.car.model}
              </p>
            </div>
          )}

          <section className="rounded-3xl border-2 border-secondary/10 bg-white p-6">
            <h2 className="font-display text-base font-bold">Автомобиль и цена</h2>
            <form action={updateOrderDetails} className="mt-4 flex flex-col gap-4">
              <input type="hidden" name="id" value={order.id} />
              <label className="flex flex-col gap-1.5 text-sm font-semibold">
                Автомобиль
                <select name="carId" defaultValue={order.carId ?? ""} className={inputClass}>
                  <option value="">— не выбран —</option>
                  {cars.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.brand} {c.model} ({c.year})
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-semibold">
                Цена сделки, $
                <input
                  type="number"
                  name="price"
                  step="100"
                  defaultValue={order.price ?? ""}
                  className={inputClass}
                />
              </label>
              <button
                type="submit"
                className="self-start rounded-full bg-secondary px-6 py-3 text-xs font-bold uppercase tracking-wide text-white"
              >
                Сохранить
              </button>
            </form>
          </section>

          <section className="rounded-3xl border-2 border-secondary/10 bg-white p-6">
            <h2 className="font-display text-base font-bold">Договор</h2>
            {order.contract && (
              <a
                href={`/api/contracts/${order.contract.id}/pdf`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white"
              >
                Скачать PDF
              </a>
            )}
            <form action={saveContract} className="mt-4 flex flex-col gap-4">
              <input type="hidden" name="orderId" value={order.id} />
              <label className="flex flex-col gap-1.5 text-sm font-semibold">
                Номер договора
                <input
                  required
                  name="number"
                  type="text"
                  defaultValue={order.contract?.number ?? `BM-${new Date().getFullYear()}-${order.id.slice(-4).toUpperCase()}`}
                  className={inputClass}
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-semibold">
                ФИО клиента
                <input required name="clientName" type="text" defaultValue={order.contract?.clientName ?? order.name} className={inputClass} />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-semibold">
                Телефон клиента
                <input required name="clientPhone" type="text" defaultValue={order.contract?.clientPhone ?? order.phone} className={inputClass} />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-semibold">
                Паспортные данные
                <input name="clientPassport" type="text" defaultValue={order.contract?.clientPassport ?? ""} className={inputClass} />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-semibold">
                Описание автомобиля
                <input
                  required
                  name="carDescription"
                  type="text"
                  defaultValue={order.contract?.carDescription ?? (order.car ? `${order.car.brand} ${order.car.model}, ${order.car.year} г.в.` : "")}
                  className={inputClass}
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-semibold">
                Стоимость, $
                <input
                  required
                  name="price"
                  type="number"
                  step="100"
                  defaultValue={order.contract?.price ?? order.price ?? ""}
                  className={inputClass}
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-semibold">
                Условия договора
                <textarea required name="terms" rows={4} defaultValue={order.contract?.terms ?? ""} className={inputClass} />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-semibold">
                Статус
                <select name="status" defaultValue={order.contract?.status ?? "DRAFT"} className={inputClass}>
                  {CONTRACT_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {CONTRACT_STATUS_LABELS[s]}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="submit"
                className="self-start rounded-full bg-primary px-6 py-3 text-xs font-bold uppercase tracking-wide text-white shadow-[0_4px_0_0_var(--color-primary-dark)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_var(--color-primary-dark)] active:translate-y-0 active:shadow-none"
              >
                {order.contract ? "Сохранить договор" : "Сформировать договор"}
              </button>
            </form>
            {order.contract && (
              <form action={deleteContract} className="mt-3">
                <input type="hidden" name="id" value={order.contract.id} />
                <input type="hidden" name="orderId" value={order.id} />
                <button type="submit" className="text-xs font-bold uppercase tracking-wide text-primary/60 hover:text-primary">
                  Удалить договор
                </button>
              </form>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
