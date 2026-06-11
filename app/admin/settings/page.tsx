import { getSiteSettings } from "@/lib/settings";
import { updateSiteSettings } from "@/app/actions/admin/settings";

const inputClass =
  "rounded-xl border-2 border-secondary/10 bg-bg px-4 py-3 text-sm font-normal outline-none transition-colors focus:border-primary";

const colorClass =
  "h-12 w-full cursor-pointer rounded-xl border-2 border-secondary/10 bg-bg p-1";

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [settings, { saved }] = await Promise.all([getSiteSettings(), searchParams]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
          Настройки
        </span>
        <h1 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
          Настройки сайта
        </h1>
      </div>

      {saved === "1" && (
        <p className="rounded-2xl bg-accent/30 px-5 py-3 text-sm font-bold text-secondary">
          Настройки сохранены. Изменения уже применены на сайте.
        </p>
      )}

      <form action={updateSiteSettings} className="flex flex-col gap-6">
        <section className="rounded-3xl border-2 border-secondary/10 bg-white p-6 sm:p-8">
          <h2 className="font-display text-lg font-bold">Цветовая схема</h2>
          <p className="mt-1 text-sm text-secondary/55">
            Цвета применяются на всём сайте сразу после сохранения.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-4">
            <label className="flex flex-col gap-1.5 text-sm font-semibold">
              Основной (primary)
              <input type="color" name="colorPrimary" defaultValue={settings.colorPrimary} className={colorClass} />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-semibold">
              Тёмный (secondary)
              <input type="color" name="colorSecondary" defaultValue={settings.colorSecondary} className={colorClass} />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-semibold">
              Акцент
              <input type="color" name="colorAccent" defaultValue={settings.colorAccent} className={colorClass} />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-semibold">
              Фон
              <input type="color" name="colorBg" defaultValue={settings.colorBg} className={colorClass} />
            </label>
          </div>
        </section>

        <section className="rounded-3xl border-2 border-secondary/10 bg-white p-6 sm:p-8">
          <h2 className="font-display text-lg font-bold">Контакты компании</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-sm font-semibold sm:col-span-2">
              Название компании
              <input name="companyName" type="text" defaultValue={settings.companyName} className={inputClass} />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-semibold">
              Телефон
              <input name="phone" type="text" defaultValue={settings.phone} className={inputClass} />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-semibold">
              Email
              <input name="email" type="email" defaultValue={settings.email} className={inputClass} />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-semibold sm:col-span-2">
              Адрес
              <input name="address" type="text" defaultValue={settings.address} className={inputClass} />
            </label>
          </div>
        </section>

        <section className="rounded-3xl border-2 border-secondary/10 bg-white p-6 sm:p-8">
          <h2 className="font-display text-lg font-bold">Объявление / акция в шапке сайта</h2>
          <div className="mt-5 flex flex-col gap-4">
            <label className="flex flex-col gap-1.5 text-sm font-semibold">
              Текст объявления
              <input name="announcementText" type="text" defaultValue={settings.announcementText} className={inputClass} />
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold">
              <input type="checkbox" name="announcementActive" defaultChecked={settings.announcementActive} className="h-4 w-4 accent-primary" />
              Показывать бегущую строку с объявлением на сайте
            </label>
          </div>
        </section>

        <section className="rounded-3xl border-2 border-secondary/10 bg-white p-6 sm:p-8">
          <h2 className="font-display text-lg font-bold">Социальные сети</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <label className="flex flex-col gap-1.5 text-sm font-semibold">
              Telegram
              <input name="telegram" type="url" defaultValue={settings.telegram} className={inputClass} />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-semibold">
              Instagram
              <input name="instagram" type="url" defaultValue={settings.instagram} className={inputClass} />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-semibold">
              WhatsApp
              <input name="whatsapp" type="url" defaultValue={settings.whatsapp} className={inputClass} />
            </label>
          </div>
        </section>

        <button
          type="submit"
          className="self-start rounded-full bg-primary px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-[0_4px_0_0_var(--color-primary-dark)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_var(--color-primary-dark)] active:translate-y-0 active:shadow-none"
        >
          Сохранить настройки
        </button>
      </form>
    </div>
  );
}
