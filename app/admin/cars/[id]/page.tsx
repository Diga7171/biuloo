import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CarForm } from "@/components/admin/CarForm";
import { updateCar, deleteCar } from "@/app/actions/admin/cars";

export default async function EditCarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const car = await prisma.car.findUnique({ where: { id } });
  if (!car) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
          Каталог
        </span>
        <h1 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
          {car.brand} {car.model}
        </h1>
      </div>

      <div className="rounded-3xl border-2 border-secondary/10 bg-white p-6 sm:p-8">
        <CarForm car={car} action={updateCar} submitLabel="Сохранить изменения" />
      </div>

      <form action={deleteCar} className="self-start">
        <input type="hidden" name="id" value={car.id} />
        <button
          type="submit"
          className="text-xs font-bold uppercase tracking-wide text-primary/60 hover:text-primary"
        >
          Удалить автомобиль
        </button>
      </form>
    </div>
  );
}
