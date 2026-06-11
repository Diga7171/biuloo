import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/settings";
import { CarCard } from "@/components/CarCard";
import { CarSvg } from "@/components/CarSvg";
import { OrderForm } from "@/components/OrderForm";
import { ProcessSteps } from "@/components/ProcessSteps";
import {
  ShieldIcon,
  ChargerIcon,
  MatIcon,
  KeyIcon,
  FilmIcon,
  RouteIcon,
  StarIcon,
  ArrowRightIcon,
} from "@/components/Icons";

const PERKS = [
  {
    icon: ShieldIcon,
    title: "Антикоррозийная обработка",
    text: "Полная обработка кузова и днища с гарантией 5 лет — защита от белорусских дорог и реагентов.",
  },
  {
    icon: ChargerIcon,
    title: "Зарядная станция в подарок",
    text: "Для электромобилей и гибридов — настенная зарядная станция входит в комплект поставки.",
  },
  {
    icon: MatIcon,
    title: "Заводские коврики",
    text: "Оригинальные ковры салона и багажника устанавливаются перед выдачей автомобиля.",
  },
  {
    icon: KeyIcon,
    title: "Второй комплект ключей",
    text: "Дублирующий комплект ключей или карт доступа — в подарок к каждому автомобилю.",
  },
  {
    icon: FilmIcon,
    title: "Защитная плёнка кузова",
    text: "Полная оклейка кузова прозрачной плёнкой — машина приедет к вам в идеальном виде.",
  },
  {
    icon: RouteIcon,
    title: "Доставка под ключ",
    text: "Полное сопровождение: выкуп, логистика, растаможка, постановка на учёт в РБ.",
  },
];

const REVIEWS = [
  {
    name: "Алексей М.",
    car: "BYD Song Plus",
    text: "Заказывал электромобиль через Биулу Моторс — на каждом этапе приходили уведомления в личном кабинете, всегда знал где находится машина. Привезли быстрее обещанного срока.",
  },
  {
    name: "Дарья К.",
    car: "Geely Monjaro",
    text: "Понравился прозрачный договор и фиксированная цена без доплат. Менеджер подробно объяснил все этапы растаможки. Машина пришла полностью укомплектованной.",
  },
  {
    name: "Сергей В.",
    car: "Omoda C5",
    text: "Хорошая команда, отвечают быстро, помогли подобрать комплектацию под бюджет. Подарили оклейку плёнкой и зимний комплект — приятный бонус.",
  },
];

export default async function HomePage() {
  const [settings, featuredCars, promotions] = await Promise.all([
    getSiteSettings(),
    prisma.car.findMany({
      where: { featured: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
    prisma.promotion.findMany({ where: { active: true }, take: 2 }),
  ]);

  return (
    <div>
      {/* HERO */}
      <section className="diagonal-cut grain relative overflow-hidden bg-secondary pb-24 pt-16 text-white sm:pb-32 sm:pt-20">
        <div className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div className="reveal">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-accent">
              必有路 · Biuloo Motors
            </span>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
              Новые автомобили
              <br />
              из Китая <span className="text-primary">под красный бантик</span>
            </h1>
            <p className="mt-6 max-w-lg text-base text-white/65 sm:text-lg">
              Подбор, выкуп, доставка и растаможка под ключ. Полное
              сопровождение сделки — от заявки до передачи ключей, с
              отслеживанием каждого шага в личном кабинете.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/catalog"
                className="rounded-full bg-primary px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-[0_4px_0_0_var(--color-primary-dark)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_var(--color-primary-dark)] active:translate-y-0 active:shadow-none"
              >
                Смотреть каталог
              </Link>
              <a
                href="#order"
                className="rounded-full border-2 border-white/20 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-accent hover:text-accent"
              >
                Оставить заявку
              </a>
            </div>
            <div className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-8">
              <div>
                <p className="font-display text-3xl font-extrabold text-accent">5</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-white/50">
                  лет на рынке
                </p>
              </div>
              <div>
                <p className="font-display text-3xl font-extrabold text-accent">800+</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-white/50">
                  доставленных авто
                </p>
              </div>
              <div>
                <p className="font-display text-3xl font-extrabold text-accent">10</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-white/50">
                  этапов под контролем
                </p>
              </div>
            </div>
          </div>
          <div className="reveal relative hidden lg:block" style={{ transitionDelay: "120ms" }}>
            <div className="animate-float rounded-[2rem] bg-white/5 p-10 backdrop-blur">
              <CarSvg variant="crossover" accent="#E2231A" className="w-full text-white/80" />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-2xl bg-accent px-5 py-4 text-secondary shadow-xl">
              <p className="font-display text-xl font-extrabold">必有路</p>
              <p className="text-[10px] font-bold uppercase tracking-widest">
                Дорога всегда найдётся
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROMOTIONS */}
      {promotions.length > 0 && (
        <section className="mx-auto -mt-12 max-w-7xl px-4 sm:-mt-16 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {promotions.map((promo, i) => (
              <div
                key={promo.id}
                className="reveal flex flex-col justify-between gap-4 rounded-3xl bg-white p-6 shadow-xl shadow-secondary/5 sm:flex-row sm:items-center"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
                    Акция
                  </span>
                  <h3 className="mt-1 font-display text-lg font-bold">{promo.title}</h3>
                  <p className="mt-1 max-w-md text-sm text-secondary/55">{promo.description}</p>
                </div>
                <span className="shrink-0 rounded-full bg-accent px-4 py-2 text-center text-xs font-bold uppercase tracking-wide text-secondary">
                  {promo.discountText}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PERKS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="reveal max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Что входит в стоимость
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
            Каждый автомобиль приезжает «под красный бантик»
          </h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PERKS.map((perk, i) => (
            <div
              key={perk.title}
              className="reveal rounded-3xl border-2 border-secondary/10 bg-white p-6 transition-colors hover:border-primary/30"
              style={{ transitionDelay: `${(i % 3) * 80}ms` }}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
                <perk.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-base font-bold">{perk.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-secondary/55">{perk.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED CARS */}
      {featuredCars.length > 0 && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="reveal flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                  Популярные модели
                </span>
                <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
                  В наличии и под заказ
                </h2>
              </div>
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-primary hover:underline"
              >
                Весь каталог <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredCars.map((car, i) => (
                <CarCard key={car.id} car={car} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROCESS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="reveal max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Как мы работаем
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
            10 шагов от заявки до передачи ключей
          </h2>
          <p className="mt-3 text-sm text-secondary/55">
            Каждый шаг отображается в личном кабинете в режиме реального
            времени — вы всегда знаете, на каком этапе находится ваш автомобиль.
          </p>
        </div>
        <div className="mt-10">
          <ProcessSteps />
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-secondary py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="reveal max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Отзывы клиентов
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
              Нам доверяют
            </h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((review, i) => (
              <div
                key={review.name}
                className="reveal rounded-3xl border border-white/10 bg-white/5 p-6"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex gap-1 text-accent">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <StarIcon key={idx} className="h-4 w-4" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/75">
                  «{review.text}»
                </p>
                <p className="mt-4 font-display text-sm font-bold">{review.name}</p>
                <p className="text-xs text-white/40">{review.car}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ORDER FORM */}
      <section id="order" className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="reveal grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Свяжитесь с нами
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
              {settings.companyName}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-secondary/55">
              Оставьте заявку — поможем подобрать автомобиль под бюджет,
              рассчитаем полную стоимость с доставкой в Беларусь и оформим
              договор онлайн.
            </p>
            <div className="mt-6 flex flex-col gap-2 text-sm">
              <a href={`tel:${settings.phone.replace(/[^+\d]/g, "")}`} className="font-bold text-secondary">
                {settings.phone}
              </a>
              <a href={`mailto:${settings.email}`} className="text-secondary/60">
                {settings.email}
              </a>
              <p className="text-secondary/60">{settings.address}</p>
            </div>
          </div>
          <OrderForm redirectTo="/" title="Оставить заявку" />
        </div>
      </section>
    </div>
  );
}
