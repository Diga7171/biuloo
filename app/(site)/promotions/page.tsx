import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { FilmIcon, ArrowRightIcon } from "@/components/Icons";

export default async function PromotionsPage() {
  const promotions = await prisma.promotion.findMany({
    orderBy: { createdAt: "desc" },
  });

  const active = promotions.filter((p) => p.active);
  const past = promotions.filter((p) => !p.active);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="reveal max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
          Акции
        </span>
        <h1 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
          Текущие предложения
        </h1>
        <p className="mt-3 text-sm text-secondary/55">
          Все акции суммируются с базовыми преимуществами доставки «под ключ»
          и действуют при оформлении заявки через сайт.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-5">
        {active.length === 0 && (
          <div className="rounded-3xl border-2 border-dashed border-secondary/15 bg-white p-12 text-center text-secondary/50">
            На данный момент активных акций нет — следите за обновлениями.
          </div>
        )}
        {active.map((promo, i) => (
          <div
            key={promo.id}
            className="reveal flex flex-col gap-5 rounded-3xl border-2 border-primary/15 bg-white p-6 sm:flex-row sm:items-center sm:p-8"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-white">
              <FilmIcon className="h-7 w-7" />
            </span>
            <div className="flex-1">
              <h2 className="font-display text-xl font-bold">{promo.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-secondary/55">
                {promo.description}
              </p>
              {promo.validUntil && (
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-secondary/40">
                  Действует до {new Intl.DateTimeFormat("ru-RU").format(promo.validUntil)}
                </p>
              )}
            </div>
            <span className="shrink-0 rounded-full bg-accent px-5 py-2.5 text-center text-sm font-bold uppercase tracking-wide text-secondary">
              {promo.discountText}
            </span>
          </div>
        ))}
      </div>

      {past.length > 0 && (
        <div className="mt-14">
          <h2 className="font-display text-lg font-bold text-secondary/40">
            Прошедшие акции
          </h2>
          <div className="mt-5 flex flex-col gap-3">
            {past.map((promo) => (
              <div
                key={promo.id}
                className="rounded-2xl border-2 border-secondary/10 bg-white/60 p-5 opacity-60"
              >
                <h3 className="font-display text-sm font-bold">{promo.title}</h3>
                <p className="mt-1 text-xs text-secondary/50">{promo.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="reveal mt-14 flex flex-col items-start gap-4 rounded-3xl bg-secondary p-8 text-white sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-xl font-bold">
            Не нашли подходящий автомобиль?
          </h2>
          <p className="mt-1 text-sm text-white/60">
            Подберём модель под ваш бюджет и применим действующие акции.
          </p>
        </div>
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-white"
        >
          Перейти в каталог <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
