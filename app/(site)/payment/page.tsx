import Link from "next/link";
import { CardIcon, DocumentIcon, ShieldIcon, CheckIcon, ArrowRightIcon } from "@/components/Icons";

const STEPS = [
  {
    icon: DocumentIcon,
    title: "1. Договор",
    text: "После согласования модели и комплектации заключаем договор с фиксированной итоговой стоимостью — без скрытых доплат.",
  },
  {
    icon: CardIcon,
    title: "2. Внесение оплаты",
    text: "Доступна оплата в белорусских рублях по безналичному расчёту, а также рассрочка от партнёров-банков на отдельные модели.",
  },
  {
    icon: ShieldIcon,
    title: "3. Защита сделки",
    text: "Средства резервируются под выкуп конкретного автомобиля. Если поставка срывается по нашей вине — полный возврат суммы.",
  },
];

const INCLUDED = [
  "Стоимость автомобиля у завода-производителя",
  "Международная логистика и страхование груза",
  "Таможенные пошлины и сборы РБ",
  "Предпродажная подготовка и базовый комплект допоборудования",
];

export default function PaymentPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="reveal max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
          Оплата
        </span>
        <h1 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
          Условия оплаты и цена «под ключ»
        </h1>
        <p className="mt-3 text-sm text-secondary/55">
          Цена, указанная в каталоге, — итоговая. В неё уже включены все
          расходы по доставке автомобиля до клиента в Беларуси.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {STEPS.map((step, i) => (
          <div
            key={step.title}
            className="reveal rounded-3xl border-2 border-secondary/10 bg-white p-6"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
              <step.icon className="h-6 w-6" />
            </span>
            <h2 className="mt-4 font-display text-base font-bold">{step.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-secondary/55">{step.text}</p>
          </div>
        ))}
      </div>

      <div className="reveal mt-14 rounded-3xl bg-secondary p-8 text-white sm:p-10">
        <h2 className="font-display text-xl font-bold">Что входит в стоимость</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {INCLUDED.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-white/80">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-secondary">
                <CheckIcon className="h-3 w-3" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="reveal mt-14 flex flex-col items-start gap-4 rounded-3xl border-2 border-primary/15 bg-white p-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-xl font-bold">
            Хотите узнать точную цену для вашей модели?
          </h2>
          <p className="mt-1 text-sm text-secondary/55">
            Выберите автомобиль в каталоге — там указана полная цена с учётом доставки.
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
