import { getSiteSettings } from "@/lib/settings";
import { ShieldIcon, RouteIcon, DocumentIcon, StarIcon } from "@/components/Icons";

const VALUES = [
  {
    icon: RouteIcon,
    title: "Прямые поставки из Китая",
    text: "Работаем напрямую с заводами и официальными дилерами BYD, Geely, Chery, Haval, Omoda, Jaecoo и Zeekr — без посредников и переплат.",
  },
  {
    icon: DocumentIcon,
    title: "Прозрачный договор",
    text: "Фиксируем итоговую стоимость в договоре до начала сделки. Никаких скрытых платежей на этапе растаможки и доставки.",
  },
  {
    icon: ShieldIcon,
    title: "Гарантия и сервис",
    text: "Каждый автомобиль проходит предпродажную подготовку, а на ключевые узлы действует расширенная гарантия.",
  },
  {
    icon: StarIcon,
    title: "Личный кабинет клиента",
    text: "Отслеживайте статус договора и доставки автомобиля онлайн — от заявки до передачи ключей.",
  },
];

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="reveal max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
          О компании
        </span>
        <h1 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
          {settings.companyName}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-secondary/60 sm:text-base">
          Мы специализируемся на поставке новых легковых автомобилей из Китая
          в Республику Беларусь «под ключ». Название бренда — <b>biuloo 必有路</b>{" "}
          — переводится как «дорога всегда найдётся»: мы берём на себя всю
          логистику, документы и формальности, чтобы клиент получил готовый к
          эксплуатации автомобиль без лишних хлопот.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-secondary/60 sm:text-base">
          За 5 лет работы мы доставили более 800 автомобилей: от компактных
          кроссоверов до премиальных электромобилей. Каждая сделка
          сопровождается персональным менеджером и личным кабинетом, где
          клиент видит статус договора и доставки в реальном времени.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {VALUES.map((value, i) => (
          <div
            key={value.title}
            className="reveal rounded-3xl border-2 border-secondary/10 bg-white p-6"
            style={{ transitionDelay: `${(i % 2) * 80}ms` }}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
              <value.icon className="h-6 w-6" />
            </span>
            <h2 className="mt-4 font-display text-base font-bold">{value.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-secondary/55">{value.text}</p>
          </div>
        ))}
      </div>

      <div className="reveal mt-14 rounded-3xl bg-secondary p-8 text-white sm:p-10">
        <h2 className="font-display text-xl font-bold">Реквизиты компании</h2>
        <dl className="mt-5 grid gap-x-10 gap-y-3 text-sm sm:grid-cols-2">
          <div className="flex justify-between gap-4 border-b border-white/10 py-2">
            <dt className="text-white/50">Наименование</dt>
            <dd className="font-semibold text-right">{settings.companyName}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-white/10 py-2">
            <dt className="text-white/50">Адрес</dt>
            <dd className="font-semibold text-right">{settings.address}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-white/10 py-2">
            <dt className="text-white/50">Телефон</dt>
            <dd className="font-semibold text-right">{settings.phone}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-white/10 py-2">
            <dt className="text-white/50">Email</dt>
            <dd className="font-semibold text-right">{settings.email}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
