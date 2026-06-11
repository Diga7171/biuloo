import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CarSvg } from "@/components/CarSvg";
import { parseCarImages, formatPrice } from "@/lib/cars";
import { CAR_TYPE_LABELS, type CarType } from "@/lib/orderStages";
import { ArrowRightIcon } from "@/components/Icons";

export default async function AdminCarsPage() {
  const cars = await prisma.car.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Каталог
          </span>
          <h1 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
            Автомобили
          </h1>
        </div>
        <Link
          href="/admin/cars/new"
          className="rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-[0_4px_0_0_var(--color-primary-dark)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_var(--color-primary-dark)] active:translate-y-0 active:shadow-none"
        >
          + Добавить авто
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => {
          const image = parseCarImages(car)[0];
          return (
            <Link
              key={car.id}
              href={`/admin/cars/${car.id}`}
              className="rounded-3xl border-2 border-secondary/10 bg-white p-5 transition-colors hover:border-primary/30"
            >
              <div className="flex items-center justify-center rounded-2xl bg-primary-light p-4">
                <CarSvg variant={image.variant} accent={image.accent} className="h-20 w-full text-secondary/70" />
              </div>
              <div className="mt-3 flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-secondary/40">
                    {CAR_TYPE_LABELS[car.type as CarType] ?? car.type} · {car.year}
                  </p>
                  <h2 className="font-display text-base font-bold">
                    {car.brand} {car.model}
                  </h2>
                </div>
                <span className="font-display text-base font-extrabold text-primary">
                  {formatPrice(car.price, car.currency)}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                {car.featured && (
                  <span className="rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-secondary">
                    Хит
                  </span>
                )}
                {!car.inStock && (
                  <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                    Под заказ
                  </span>
                )}
                <span className="ml-auto inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-secondary/40">
                  Редактировать <ArrowRightIcon className="h-3 w-3" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
