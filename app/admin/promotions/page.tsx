import { prisma } from "@/lib/prisma";
import { createPromotion, updatePromotion, deletePromotion } from "@/app/actions/admin/promotions";

const inputClass =
  "rounded-xl border-2 border-secondary/10 bg-bg px-4 py-3 text-sm font-normal outline-none transition-colors focus:border-primary";

function toDateInputValue(date: Date | null) {
  if (!date) return "";
  return date.toISOString().slice(0, 10);
}

export default async function AdminPromotionsPage() {
  const promotions = await prisma.promotion.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
          Акции
        </span>
        <h1 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
          Управление акциями
        </h1>
      </div>

      <section className="rounded-3xl border-2 border-primary/15 bg-white p-6 sm:p-8">
        <h2 className="font-display text-lg font-bold">Новая акция</h2>
        <form action={createPromotion} className="mt-5 flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-sm font-semibold">
              Заголовок
              <input required name="title" type="text" className={inputClass} />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-semibold">
              Текст бейджа (например, «-10%»)
              <input required name="discountText" type="text" className={inputClass} />
            </label>
          </div>
          <label className="flex flex-col gap-1.5 text-sm font-semibold">
            Описание
            <textarea required name="description" rows={2} className={inputClass} />
          </label>
          <div className="flex flex-wrap items-end gap-4">
            <label className="flex flex-col gap-1.5 text-sm font-semibold">
              Действует до
              <input name="validUntil" type="date" className={inputClass} />
            </label>
            <label className="flex items-center gap-2 pb-3 text-sm font-semibold">
              <input type="checkbox" name="active" defaultChecked className="h-4 w-4 accent-primary" />
              Активна
            </label>
            <button
              type="submit"
              className="ml-auto rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-[0_4px_0_0_var(--color-primary-dark)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_var(--color-primary-dark)] active:translate-y-0 active:shadow-none"
            >
              Добавить
            </button>
          </div>
        </form>
      </section>

      <div className="flex flex-col gap-4">
        {promotions.length === 0 && (
          <p className="rounded-3xl border-2 border-dashed border-secondary/15 bg-white p-8 text-center text-secondary/50">
            Акций пока нет.
          </p>
        )}
        {promotions.map((promo) => (
          <section key={promo.id} className="rounded-3xl border-2 border-secondary/10 bg-white p-6 sm:p-8">
            <form action={updatePromotion} className="flex flex-col gap-4">
              <input type="hidden" name="id" value={promo.id} />
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-sm font-semibold">
                  Заголовок
                  <input required name="title" type="text" defaultValue={promo.title} className={inputClass} />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-semibold">
                  Текст бейджа
                  <input required name="discountText" type="text" defaultValue={promo.discountText} className={inputClass} />
                </label>
              </div>
              <label className="flex flex-col gap-1.5 text-sm font-semibold">
                Описание
                <textarea required name="description" rows={2} defaultValue={promo.description} className={inputClass} />
              </label>
              <div className="flex flex-wrap items-end gap-4">
                <label className="flex flex-col gap-1.5 text-sm font-semibold">
                  Действует до
                  <input name="validUntil" type="date" defaultValue={toDateInputValue(promo.validUntil)} className={inputClass} />
                </label>
                <label className="flex items-center gap-2 pb-3 text-sm font-semibold">
                  <input type="checkbox" name="active" defaultChecked={promo.active} className="h-4 w-4 accent-primary" />
                  Активна
                </label>
                <button
                  type="submit"
                  className="ml-auto rounded-full bg-secondary px-6 py-3 text-sm font-bold uppercase tracking-wide text-white"
                >
                  Сохранить
                </button>
              </div>
            </form>
            <form action={deletePromotion} className="mt-3">
              <input type="hidden" name="id" value={promo.id} />
              <button
                type="submit"
                className="text-xs font-bold uppercase tracking-wide text-primary/60 hover:text-primary"
              >
                Удалить акцию
              </button>
            </form>
          </section>
        ))}
      </div>
    </div>
  );
}
