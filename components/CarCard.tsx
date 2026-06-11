import Link from "next/link";
import type { Car } from "@prisma/client";
import { CarSvg } from "./CarSvg";
import { parseCarImages, formatPrice } from "@/lib/cars";
import { CAR_TYPE_LABELS, type CarType } from "@/lib/orderStages";
import { ArrowRightIcon } from "./Icons";

export function CarCard({ car, index = 0 }: { car: Car; index?: number }) {
  const [image] = parseCarImages(car);

  return (
    <Link
      href={`/catalog/${car.id}`}
      className="reveal group relative flex flex-col overflow-hidden rounded-3xl border-2 border-secondary/10 bg-white transition-all hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10"
      style={{ transitionDelay: `${(index % 3) * 80}ms` }}
    >
      {!car.inStock && (
        <span className="absolute left-4 top-4 z-10 rounded-full bg-secondary px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
          Под заказ
        </span>
      )}
      {car.featured && (
        <span className="absolute right-4 top-4 z-10 rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-secondary">
          Хит
        </span>
      )}
      <div className="relative flex aspect-[4/3] items-center justify-center bg-primary-light p-8">
        <CarSvg
          variant={image.variant}
          accent={image.accent}
          className="w-full max-w-[240px] text-secondary/70 transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            {CAR_TYPE_LABELS[car.type as CarType] ?? car.type}
          </span>
          <h3 className="mt-1 font-display text-lg font-bold leading-snug">
            {car.brand} {car.model}
          </h3>
          <p className="text-sm text-secondary/50">{car.year} год</p>
        </div>
        <div className="mt-auto flex items-center justify-between border-t-2 border-dashed border-secondary/10 pt-3">
          <span className="font-display text-xl font-extrabold text-secondary">
            {formatPrice(car.price, car.currency)}
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-white transition-colors group-hover:bg-primary">
            <ArrowRightIcon className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
