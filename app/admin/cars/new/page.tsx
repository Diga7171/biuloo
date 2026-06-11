import { CarForm } from "@/components/admin/CarForm";
import { createCar } from "@/app/actions/admin/cars";

export default function NewCarPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
          Каталог
        </span>
        <h1 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
          Новый автомобиль
        </h1>
      </div>

      <div className="rounded-3xl border-2 border-secondary/10 bg-white p-6 sm:p-8">
        <CarForm action={createCar} submitLabel="Добавить автомобиль" />
      </div>
    </div>
  );
}
