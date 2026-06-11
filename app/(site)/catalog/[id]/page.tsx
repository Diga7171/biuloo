import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CarSvg } from "@/components/CarSvg";
import { OrderForm } from "@/components/OrderForm";
import { parseCarImages, parseCarSpecs, formatPrice } from "@/lib/cars";
import { CAR_TYPE_LABELS, type CarType } from "@/lib/orderStages";
import { ArrowRightIcon } from "@/components/Icons";

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const car = await prisma.car.findUnique({ where: { id } });
  if (!car) notFound();

  const [image] = parseCarImages(car);
  const specs = parseCarSpecs(car);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="reveal flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-secondary/40">
        <Link href="/catalog" className="hover:text-primary">
          Каталог
        </Link>
        <ArrowRightIcon className="h-3 w-3" />
        <span className="text-secondary">
          {car.brand} {car.model}
        </span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="reveal">
          <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl bg-primary-light p-10">
            {!car.inStock && (
              <span className="absolute left-5 top-5 rounded-full bg-secondary px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                Под заказ
              </span>
            )}
            <CarSvg
              variant={image.variant}
              accent={image.accent}
              className="w-full max-w-md text-secondary/70"
            />
          </div>
        </div>

        <div className="reveal" style={{ transitionDelay: "100ms" }}>
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            {CAR_TYPE_LABELS[car.type as CarType] ?? car.type} · {car.year} год
          </span>
          <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
            {car.brand} {car.model}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-secondary/60">
            {car.description}
          </p>

          <div className="mt-6 flex items-center gap-4 rounded-2xl border-2 border-secondary/10 bg-white p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-secondary/40">
                Цена под ключ
              </p>
              <p className="font-display text-3xl font-extrabold text-primary">
                {formatPrice(car.price, car.currency)}
              </p>
            </div>
            <span
              className={`ml-auto rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide ${
                car.inStock ? "bg-accent text-secondary" : "bg-secondary text-white"
              }`}
            >
              {car.inStock ? "В наличии" : "Под заказ из Китая"}
            </span>
          </div>

          {Object.keys(specs).length > 0 && (
            <div className="mt-6">
              <h2 className="font-display text-lg font-bold">Характеристики</h2>
              <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                {Object.entries(specs).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between gap-4 border-b border-dashed border-secondary/10 py-2 text-sm"
                  >
                    <dt className="text-secondary/50">{key}</dt>
                    <dd className="font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>

      <div className="reveal mt-14 max-w-2xl" style={{ transitionDelay: "150ms" }}>
        <OrderForm
          carId={car.id}
          redirectTo={`/catalog/${car.id}`}
          title={`Оставить заявку на ${car.brand} ${car.model}`}
          description="Зафиксируем цену, рассчитаем сроки доставки и подготовим договор. Менеджер свяжется с вами для уточнения деталей."
        />
      </div>
    </div>
  );
}
