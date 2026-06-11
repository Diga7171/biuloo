import { createOrder } from "@/app/actions/orders";

export function OrderForm({
  carId,
  redirectTo,
  title = "Оставить заявку",
  description = "Оставьте контакты — менеджер свяжется с вами в течение 30 минут и поможет с подбором и расчётом стоимости под ключ.",
  compact = false,
}: {
  carId?: string;
  redirectTo: string;
  title?: string;
  description?: string;
  compact?: boolean;
}) {
  return (
    <form
      action={createOrder}
      className={`flex flex-col gap-4 ${compact ? "" : "rounded-3xl border-2 border-secondary/10 bg-white p-6 sm:p-8"}`}
    >
      {!compact && (
        <div>
          <h3 className="font-display text-xl font-bold sm:text-2xl">{title}</h3>
          <p className="mt-2 text-sm text-secondary/60">{description}</p>
        </div>
      )}
      {carId && <input type="hidden" name="carId" value={carId} />}
      <input type="hidden" name="redirectTo" value={redirectTo} />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-semibold">
          Ваше имя
          <input
            required
            name="name"
            type="text"
            placeholder="Иван Иванов"
            className="rounded-xl border-2 border-secondary/10 bg-bg px-4 py-3 text-sm font-normal outline-none transition-colors focus:border-primary"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-semibold">
          Телефон
          <input
            required
            name="phone"
            type="tel"
            placeholder="+375 29 000-00-00"
            className="rounded-xl border-2 border-secondary/10 bg-bg px-4 py-3 text-sm font-normal outline-none transition-colors focus:border-primary"
          />
        </label>
      </div>
      <label className="flex flex-col gap-1.5 text-sm font-semibold">
        Email (необязательно)
        <input
          name="email"
          type="email"
          placeholder="you@example.com"
          className="rounded-xl border-2 border-secondary/10 bg-bg px-4 py-3 text-sm font-normal outline-none transition-colors focus:border-primary"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-semibold">
        Комментарий
        <textarea
          name="message"
          rows={3}
          placeholder="Какой автомобиль интересует, бюджет, пожелания..."
          className="rounded-xl border-2 border-secondary/10 bg-bg px-4 py-3 text-sm font-normal outline-none transition-colors focus:border-primary"
        />
      </label>
      <button
        type="submit"
        className="mt-1 w-full rounded-full bg-primary px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-[0_4px_0_0_var(--color-primary-dark)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_var(--color-primary-dark)] active:translate-y-0 active:shadow-none sm:w-auto sm:px-10"
      >
        Отправить заявку
      </button>
      <p className="text-xs text-secondary/40">
        Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.
      </p>
    </form>
  );
}
