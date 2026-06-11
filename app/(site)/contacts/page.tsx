import { getSiteSettings } from "@/lib/settings";
import { OrderForm } from "@/components/OrderForm";
import { RouteIcon, KeyIcon, ShieldIcon } from "@/components/Icons";

export default async function ContactsPage() {
  const settings = await getSiteSettings();

  const social = [
    { label: "Telegram", href: settings.telegram },
    { label: "Instagram", href: settings.instagram },
    { label: "WhatsApp", href: settings.whatsapp },
  ].filter((s) => s.href);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="reveal max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
          Контакты
        </span>
        <h1 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
          Свяжитесь с нами
        </h1>
        <p className="mt-3 text-sm text-secondary/55">
          Ответим на вопросы по подбору авто, срокам доставки и условиям
          договора. Также можно сразу оставить заявку — перезвоним в течение
          рабочего дня.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-5">
        <div className="reveal lg:col-span-2">
          <div className="flex flex-col gap-4 rounded-3xl border-2 border-secondary/10 bg-white p-6 sm:p-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-secondary/40">
                Телефон
              </p>
              <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="font-display text-xl font-bold text-primary">
                {settings.phone}
              </a>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-secondary/40">
                Email
              </p>
              <a href={`mailto:${settings.email}`} className="font-semibold">
                {settings.email}
              </a>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-secondary/40">
                Адрес офиса
              </p>
              <p className="font-semibold">{settings.address}</p>
            </div>
            {social.length > 0 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-secondary/40">
                  Мы в сети
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {social.map((s) => (
                    <a
                      key={s.label}
                      href={s.href!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-secondary/5 px-4 py-2 text-xs font-bold uppercase tracking-wide text-secondary hover:bg-primary hover:text-white"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-2 grid grid-cols-3 gap-2 border-t border-secondary/10 pt-4 text-center">
              <div>
                <RouteIcon className="mx-auto h-5 w-5 text-primary" />
                <p className="mt-1 text-[11px] font-semibold text-secondary/50">
                  Доставка из Китая
                </p>
              </div>
              <div>
                <KeyIcon className="mx-auto h-5 w-5 text-primary" />
                <p className="mt-1 text-[11px] font-semibold text-secondary/50">
                  Под ключ
                </p>
              </div>
              <div>
                <ShieldIcon className="mx-auto h-5 w-5 text-primary" />
                <p className="mt-1 text-[11px] font-semibold text-secondary/50">
                  Гарантия
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="reveal lg:col-span-3" style={{ transitionDelay: "100ms" }}>
          <OrderForm
            redirectTo="/contacts"
            title="Оставить заявку"
            description="Расскажите, какой автомобиль вас интересует — подберём варианты и свяжемся с вами."
          />
        </div>
      </div>
    </div>
  );
}
