import Link from "next/link";
import { ProcessSteps } from "@/components/ProcessSteps";
import { ArrowRightIcon, ShipIcon, CustomsIcon, WarehouseIcon } from "@/components/Icons";

const TIMELINE = [
  {
    icon: ShipIcon,
    title: "Морская и автомобильная перевозка",
    text: "После выкупа автомобиль грузится на судно или автовоз и направляется в Беларусь. Средний срок транспортировки — 30-45 дней.",
  },
  {
    icon: CustomsIcon,
    title: "Таможенное оформление",
    text: "Берём на себя все пошлины, сборы и документы. Стоимость растаможки уже включена в итоговую цену по договору.",
  },
  {
    icon: WarehouseIcon,
    title: "Склад и предпродажная подготовка",
    text: "По прибытии в РБ автомобиль проходит мойку, диагностику, установку допоборудования (коврики, защита, сигнализация по запросу).",
  },
];

export default function DeliveryPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="reveal max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
          Доставка
        </span>
        <h1 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
          Как мы доставляем авто из Китая
        </h1>
        <p className="mt-3 text-sm text-secondary/55">
          Полный цикл — от выкупа на заводе до передачи ключей в Беларуси.
          Каждый этап фиксируется в личном кабинете, чтобы вы всегда знали,
          где находится ваш автомобиль.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {TIMELINE.map((item, i) => (
          <div
            key={item.title}
            className="reveal rounded-3xl border-2 border-secondary/10 bg-white p-6"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
              <item.icon className="h-6 w-6" />
            </span>
            <h2 className="mt-4 font-display text-base font-bold">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-secondary/55">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="reveal font-display text-2xl font-extrabold sm:text-3xl">
          Все 10 этапов сделки
        </h2>
        <p className="reveal mt-2 max-w-2xl text-sm text-secondary/55">
          Этот же таймлайн доступен в личном кабинете для каждого вашего
          заказа — с датами прохождения каждого шага.
        </p>
        <div className="mt-8">
          <ProcessSteps />
        </div>
      </div>

      <div className="reveal mt-14 flex flex-col items-start gap-4 rounded-3xl bg-secondary p-8 text-white sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-xl font-bold">Готовы оформить заявку?</h2>
          <p className="mt-1 text-sm text-white/60">
            Выберите автомобиль в каталоге, и мы рассчитаем точные сроки доставки.
          </p>
        </div>
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-white"
        >
          Перейти в каталог <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
