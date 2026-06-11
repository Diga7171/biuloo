import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CarCard } from "@/components/CarCard";
import { CAR_TYPES, CAR_TYPE_LABELS, type CarType } from "@/lib/orderStages";

const SORTS = {
  new: { label: "Сначала новые", orderBy: { createdAt: "desc" as const } },
  price_asc: { label: "Сначала дешевле", orderBy: { price: "asc" as const } },
  price_desc: { label: "Сначала дороже", orderBy: { price: "desc" as const } },
};

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; brand?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const type = params.type && CAR_TYPES.includes(params.type as CarType) ? params.type : undefined;
  const brand = params.brand;
  const sortKey = (params.sort && params.sort in SORTS ? params.sort : "new") as keyof typeof SORTS;

  const [cars, brands] = await Promise.all([
    prisma.car.findMany({
      where: {
        ...(type ? { type } : {}),
        ...(brand ? { brand } : {}),
      },
      orderBy: SORTS[sortKey].orderBy,
    }),
    prisma.car.findMany({ select: { brand: true }, distinct: ["brand"] }),
  ]);

  const buildHref = (overrides: Record<string, string | undefined>) => {
    const next = new URLSearchParams();
    const merged = { type, brand, sort: params.sort, ...overrides };
    Object.entries(merged).forEach(([key, value]) => {
      if (value) next.set(key, value);
    });
    const qs = next.toString();
    return qs ? `/catalog?${qs}` : "/catalog";
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="reveal max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
          Каталог
        </span>
        <h1 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
          Автомобили в наличии и под заказ
        </h1>
        <p className="mt-3 text-sm text-secondary/55">
          Все цены указаны с учётом доставки в Республику Беларусь, растаможки
          и предпродажной подготовки.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-2">
        <Link
          href={buildHref({ type: undefined })}
          className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
            !type ? "bg-primary text-white" : "bg-white text-secondary/60 hover:text-primary"
          }`}
        >
          Все типы
        </Link>
        {CAR_TYPES.map((t) => (
          <Link
            key={t}
            href={buildHref({ type: type === t ? undefined : t })}
            className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
              type === t ? "bg-primary text-white" : "bg-white text-secondary/60 hover:text-primary"
            }`}
          >
            {CAR_TYPE_LABELS[t]}
          </Link>
        ))}

        <span className="mx-2 hidden h-5 w-px bg-secondary/15 sm:block" />

        {brands.map(({ brand: b }) => (
          <Link
            key={b}
            href={buildHref({ brand: brand === b ? undefined : b })}
            className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
              brand === b ? "bg-secondary text-white" : "bg-white text-secondary/60 hover:text-secondary"
            }`}
          >
            {b}
          </Link>
        ))}

        <div className="ml-auto flex gap-2">
          {Object.entries(SORTS).map(([key, { label }]) => (
            <Link
              key={key}
              href={buildHref({ sort: key })}
              className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
                sortKey === key ? "bg-secondary text-white" : "bg-white text-secondary/60 hover:text-secondary"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {cars.length === 0 ? (
        <div className="mt-16 rounded-3xl border-2 border-dashed border-secondary/15 bg-white p-12 text-center text-secondary/50">
          По выбранным фильтрам автомобили не найдены.
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car, i) => (
            <CarCard key={car.id} car={car} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
