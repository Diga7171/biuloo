import type { Car } from "@prisma/client";
import { CAR_TYPES, CAR_TYPE_LABELS } from "@/lib/orderStages";
import { parseCarImages, parseCarSpecs } from "@/lib/cars";

const inputClass =
  "rounded-xl border-2 border-secondary/10 bg-bg px-4 py-3 text-sm font-normal outline-none transition-colors focus:border-primary";

const VARIANTS = ["sedan", "crossover", "suv", "liftback", "hatchback"] as const;

const VARIANT_LABELS: Record<(typeof VARIANTS)[number], string> = {
  sedan: "Седан",
  crossover: "Кроссовер",
  suv: "Внедорожник",
  liftback: "Лифтбек",
  hatchback: "Хэтчбек",
};

export function CarForm({
  car,
  action,
  submitLabel,
}: {
  car?: Car;
  action: (formData: FormData) => void;
  submitLabel: string;
}) {
  const specs = car ? parseCarSpecs(car) : {};
  const specsText = Object.entries(specs)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  const image = car ? parseCarImages(car)[0] : { variant: "sedan", accent: "#E2231A" };

  return (
    <form action={action} className="flex flex-col gap-5">
      {car && <input type="hidden" name="id" value={car.id} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-semibold">
          Марка
          <input required name="brand" type="text" defaultValue={car?.brand} className={inputClass} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-semibold">
          Модель
          <input required name="model" type="text" defaultValue={car?.model} className={inputClass} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="flex flex-col gap-1.5 text-sm font-semibold">
          Год
          <input required name="year" type="number" defaultValue={car?.year ?? new Date().getFullYear()} className={inputClass} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-semibold">
          Цена
          <input required name="price" type="number" step="100" defaultValue={car?.price} className={inputClass} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-semibold">
          Валюта
          <input name="currency" type="text" defaultValue={car?.currency ?? "USD"} className={inputClass} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-semibold">
          Тип
          <select name="type" defaultValue={car?.type ?? "ICE"} className={inputClass}>
            {CAR_TYPES.map((t) => (
              <option key={t} value={t}>
                {CAR_TYPE_LABELS[t]}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-semibold">
          Иллюстрация (тип кузова)
          <select name="variant" defaultValue={image.variant} className={inputClass}>
            {VARIANTS.map((v) => (
              <option key={v} value={v}>
                {VARIANT_LABELS[v]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm font-semibold">
        Описание
        <textarea required name="description" rows={3} defaultValue={car?.description} className={inputClass} />
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-semibold">
        Характеристики (по одной на строку, формат «Название: значение»)
        <textarea
          name="specs"
          rows={5}
          defaultValue={specsText}
          placeholder={"Запас хода: 510 км\nМощность: 218 л.с.\nПривод: полный"}
          className={`${inputClass} font-mono`}
        />
      </label>

      <div className="flex flex-wrap items-end gap-6">
        <label className="flex flex-col gap-1.5 text-sm font-semibold">
          Цвет иллюстрации
          <input type="color" name="accent" defaultValue={image.accent} className="h-12 w-24 cursor-pointer rounded-xl border-2 border-secondary/10 bg-bg p-1" />
        </label>
        <label className="flex items-center gap-2 pb-3 text-sm font-semibold">
          <input type="checkbox" name="inStock" defaultChecked={car?.inStock ?? true} className="h-4 w-4 accent-primary" />
          В наличии
        </label>
        <label className="flex items-center gap-2 pb-3 text-sm font-semibold">
          <input type="checkbox" name="featured" defaultChecked={car?.featured ?? false} className="h-4 w-4 accent-primary" />
          Показывать на главной
        </label>
      </div>

      <button
        type="submit"
        className="self-start rounded-full bg-primary px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-[0_4px_0_0_var(--color-primary-dark)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_var(--color-primary-dark)] active:translate-y-0 active:shadow-none"
      >
        {submitLabel}
      </button>
    </form>
  );
}
