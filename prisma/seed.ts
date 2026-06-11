import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { ORDER_STAGES } from "../lib/orderStages";

const prisma = new PrismaClient();

type CarSeed = {
  brand: string;
  model: string;
  year: number;
  price: number;
  type: "ELECTRIC" | "HYBRID" | "ICE";
  description: string;
  specs: Record<string, string>;
  images: { variant: string; accent: string }[];
  inStock: boolean;
  featured: boolean;
};

const cars: CarSeed[] = [
  {
    brand: "BYD",
    model: "Song Plus Champion",
    year: 2025,
    price: 32900,
    type: "ELECTRIC",
    description:
      "Электрический кроссовер с запасом хода свыше 500 км и фирменной батареей Blade. Идеален для города и трассы.",
    specs: {
      "Запас хода": "505 км",
      "Мощность": "218 л.с.",
      "Разгон 0-100": "8.5 с",
      "Привод": "Передний",
      "Батарея": "Blade Battery 71.8 кВт·ч",
      "Гарантия на батарею": "8 лет / 200 000 км",
    },
    images: [{ variant: "crossover", accent: "#E2231A" }],
    inStock: true,
    featured: true,
  },
  {
    brand: "BYD",
    model: "Seal",
    year: 2025,
    price: 36500,
    type: "ELECTRIC",
    description:
      "Спортивный электроседан с полным приводом, платформой e-Platform 3.0 и динамикой спорткара.",
    specs: {
      "Запас хода": "520 км",
      "Мощность": "530 л.с.",
      "Разгон 0-100": "3.8 с",
      "Привод": "Полный",
      "Батарея": "Blade Battery 82.5 кВт·ч",
      "Гарантия на батарею": "8 лет / 200 000 км",
    },
    images: [{ variant: "sedan", accent: "#1A1A1A" }],
    inStock: true,
    featured: true,
  },
  {
    brand: "Geely",
    model: "Monjaro",
    year: 2025,
    price: 39900,
    type: "HYBRID",
    description:
      "Премиальный полноразмерный SUV с богатой комплектацией, панорамной крышей и мягкой гибридной установкой.",
    specs: {
      "Двигатель": "2.0T MHEV",
      "Мощность": "238 л.с.",
      "Привод": "Полный AWD",
      "Расход топлива": "8.9 л/100км",
      "Коробка": "8-АКПП",
      "Клиренс": "190 мм",
    },
    images: [{ variant: "suv", accent: "#1A1A1A" }],
    inStock: true,
    featured: true,
  },
  {
    brand: "Geely",
    model: "Coolray",
    year: 2025,
    price: 24500,
    type: "ICE",
    description:
      "Компактный кроссовер-бестселлер с турбомотором, спортивным характером и доступной ценой.",
    specs: {
      "Двигатель": "1.5T",
      "Мощность": "177 л.с.",
      "Привод": "Передний",
      "Расход топлива": "7.0 л/100км",
      "Коробка": "7-DCT",
      "Клиренс": "180 мм",
    },
    images: [{ variant: "crossover", accent: "#E2231A" }],
    inStock: true,
    featured: false,
  },
  {
    brand: "Omoda",
    model: "C5",
    year: 2025,
    price: 26900,
    type: "ICE",
    description:
      "Стильный кроссовер с ярким дизайном, цифровой панелью приборов и щедрым набором ассистентов.",
    specs: {
      "Двигатель": "1.6T",
      "Мощность": "186 л.с.",
      "Привод": "Передний",
      "Расход топлива": "7.4 л/100км",
      "Коробка": "7-DCT",
      "Клиренс": "190 мм",
    },
    images: [{ variant: "crossover", accent: "#FFC400" }],
    inStock: true,
    featured: true,
  },
  {
    brand: "Jaecoo",
    model: "J7",
    year: 2025,
    price: 34900,
    type: "HYBRID",
    description:
      "Гибридный SUV в стиле «городского внедорожника» с увеличенным запасом хода и премиальной отделкой салона.",
    specs: {
      "Силовая установка": "1.5T HEV",
      "Мощность": "245 л.с.",
      "Привод": "Полный",
      "Расход топлива": "5.8 л/100км",
      "Коробка": "E-CVT",
      "Клиренс": "192 мм",
    },
    images: [{ variant: "suv", accent: "#E2231A" }],
    inStock: false,
    featured: false,
  },
  {
    brand: "Haval",
    model: "Jolion",
    year: 2025,
    price: 23900,
    type: "ICE",
    description:
      "Один из самых популярных кроссоверов на рынке: практичный, экономичный и надёжный.",
    specs: {
      "Двигатель": "1.5T",
      "Мощность": "150 л.с.",
      "Привод": "Передний",
      "Расход топлива": "6.7 л/100км",
      "Коробка": "7-DCT",
      "Клиренс": "172 мм",
    },
    images: [{ variant: "crossover", accent: "#1A1A1A" }],
    inStock: true,
    featured: false,
  },
  {
    brand: "Zeekr",
    model: "001",
    year: 2025,
    price: 54900,
    type: "ELECTRIC",
    description:
      "Премиальный электролифтбек от Geely Group: запредельная динамика, флагманские технологии и запас хода более 700 км.",
    specs: {
      "Запас хода": "710 км",
      "Мощность": "544 л.с.",
      "Разгон 0-100": "3.8 с",
      "Привод": "Полный",
      "Батарея": "100 кВт·ч",
      "Зарядка 10-80%": "30 мин",
    },
    images: [{ variant: "liftback", accent: "#1A1A1A" }],
    inStock: true,
    featured: true,
  },
  {
    brand: "Chery",
    model: "Tiggo 7 Pro Max",
    year: 2025,
    price: 25900,
    type: "ICE",
    description:
      "Семейный кроссовер с просторным салоном, большим мультимедийным экраном и богатой базовой комплектацией.",
    specs: {
      "Двигатель": "1.6T",
      "Мощность": "197 л.с.",
      "Привод": "Передний",
      "Расход топлива": "7.6 л/100км",
      "Коробка": "7-DCT",
      "Клиренс": "185 мм",
    },
    images: [{ variant: "crossover", accent: "#E2231A" }],
    inStock: true,
    featured: false,
  },
  {
    brand: "Chery",
    model: "Tiggo 8 Pro Max",
    year: 2025,
    price: 37900,
    type: "HYBRID",
    description:
      "Семиместный флагманский SUV с гибридной установкой, панорамной крышей и премиальной шумоизоляцией.",
    specs: {
      "Силовая установка": "1.5T HEV",
      "Мощность": "252 л.с.",
      "Привод": "Полный",
      "Расход топлива": "5.6 л/100км",
      "Коробка": "E-CVT",
      "Клиренс": "188 мм",
      "Количество мест": "7",
    },
    images: [{ variant: "suv", accent: "#1A1A1A" }],
    inStock: true,
    featured: true,
  },
  {
    brand: "Changan",
    model: "CS75 Plus",
    year: 2025,
    price: 25500,
    type: "ICE",
    description:
      "Динамичный кроссовер со спортивным дизайном, современной мультимедийной системой и высоким уровнем безопасности.",
    specs: {
      "Двигатель": "1.5T",
      "Мощность": "178 л.с.",
      "Привод": "Передний",
      "Расход топлива": "7.2 л/100км",
      "Коробка": "8-АКПП",
      "Клиренс": "200 мм",
    },
    images: [{ variant: "crossover", accent: "#FFC400" }],
    inStock: true,
    featured: false,
  },
  {
    brand: "Changan",
    model: "UNI-V",
    year: 2025,
    price: 28900,
    type: "ICE",
    description:
      "Эффектный лифтбек купеобразного силуэта со спортивной подвеской и полностью цифровым салоном.",
    specs: {
      "Двигатель": "1.5T",
      "Мощность": "197 л.с.",
      "Привод": "Передний",
      "Расход топлива": "6.8 л/100км",
      "Коробка": "7-DCT",
      "Клиренс": "165 мм",
    },
    images: [{ variant: "liftback", accent: "#1A1A1A" }],
    inStock: true,
    featured: false,
  },
  {
    brand: "Exeed",
    model: "VX",
    year: 2025,
    price: 42900,
    type: "ICE",
    description:
      "Премиальный полноразмерный SUV на 6-7 мест с мощным турбомотором и роскошной отделкой салона.",
    specs: {
      "Двигатель": "2.0T",
      "Мощность": "254 л.с.",
      "Привод": "Полный AWD",
      "Расход топлива": "9.5 л/100км",
      "Коробка": "8-АКПП",
      "Клиренс": "195 мм",
      "Количество мест": "7",
    },
    images: [{ variant: "suv", accent: "#E2231A" }],
    inStock: false,
    featured: true,
  },
  {
    brand: "GAC",
    model: "Aion Y Plus",
    year: 2025,
    price: 29900,
    type: "ELECTRIC",
    description:
      "Электрический кроссовер с просторным салоном «без туннеля» и доступной ценой для городской эксплуатации.",
    specs: {
      "Запас хода": "480 км",
      "Мощность": "184 л.с.",
      "Разгон 0-100": "7.9 с",
      "Привод": "Передний",
      "Батарея": "63.2 кВт·ч",
      "Гарантия на батарею": "8 лет / 200 000 км",
    },
    images: [{ variant: "crossover", accent: "#1A1A1A" }],
    inStock: true,
    featured: false,
  },
  {
    brand: "Hongqi",
    model: "H5",
    year: 2025,
    price: 31900,
    type: "ICE",
    description:
      "Представительский седан с классическим дизайном, комфортной подвеской и просторным задним рядом.",
    specs: {
      "Двигатель": "2.0T",
      "Мощность": "184 л.с.",
      "Привод": "Передний",
      "Расход топлива": "7.8 л/100км",
      "Коробка": "6-АКПП",
      "Клиренс": "150 мм",
    },
    images: [{ variant: "sedan", accent: "#1A1A1A" }],
    inStock: true,
    featured: false,
  },
  {
    brand: "Great Wall",
    model: "Poer",
    year: 2025,
    price: 33900,
    type: "ICE",
    description:
      "Надёжный пикап повышенной проходимости с просторным грузовым кузовом и подключаемым полным приводом.",
    specs: {
      "Двигатель": "2.0T дизель",
      "Мощность": "184 л.с.",
      "Привод": "Подключаемый полный",
      "Расход топлива": "8.9 л/100км",
      "Коробка": "8-АКПП",
      "Грузоподъёмность": "1000 кг",
    },
    images: [{ variant: "pickup", accent: "#1A1A1A" }],
    inStock: true,
    featured: false,
  },
  {
    brand: "Maxus",
    model: "Mifa 9",
    year: 2025,
    price: 56900,
    type: "ELECTRIC",
    description:
      "Премиальный электрический минивэн для бизнеса и большой семьи с салоном класса люкс на 6 мест.",
    specs: {
      "Запас хода": "502 км",
      "Мощность": "245 л.с.",
      "Разгон 0-100": "8.0 с",
      "Привод": "Передний",
      "Батарея": "90 кВт·ч",
      "Количество мест": "6",
    },
    images: [{ variant: "minivan", accent: "#FFC400" }],
    inStock: false,
    featured: true,
  },
  {
    brand: "Dongfeng",
    model: "Forthing T5 EVO",
    year: 2025,
    price: 21900,
    type: "ICE",
    description:
      "Доступный компактный кроссовер-хэтчбек для города с экономичным мотором и хорошей оснащённостью.",
    specs: {
      "Двигатель": "1.5",
      "Мощность": "116 л.с.",
      "Привод": "Передний",
      "Расход топлива": "6.5 л/100км",
      "Коробка": "CVT",
      "Клиренс": "190 мм",
    },
    images: [{ variant: "hatchback", accent: "#E2231A" }],
    inStock: true,
    featured: false,
  },
];

async function main() {
  console.log("Seeding database...");

  // Site settings
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      colorPrimary: "#E2231A",
      colorSecondary: "#1A1A1A",
      colorAccent: "#FFC400",
      colorBg: "#F7F5F2",
      companyName: "ООО «Биулу Моторс»",
      phone: "+375 (29) 000-00-00",
      email: "info@biuloo.by",
      address: "г. Минск, пр-т Победителей, 1",
      announcementText:
        "Акция: бесплатная оклейка кузова защитной плёнкой при заказе автомобиля до конца месяца!",
      announcementActive: true,
      telegram: "https://t.me/biuloo_motors",
      instagram: "https://instagram.com/biuloo_motors",
      whatsapp: "https://wa.me/375290000000",
    },
  });

  // Promotions
  await prisma.promotion.deleteMany();
  await prisma.promotion.createMany({
    data: [
      {
        title: "Бесплатная оклейка кузова",
        description:
          "При заказе любого автомобиля из каталога — полная оклейка кузова защитной плёнкой в подарок (стоимость услуги ~2500$).",
        discountText: "Подарок на 2500$",
        active: true,
      },
      {
        title: "Зимний пакет в подарок",
        description:
          "Комплект зимних ковриков, второй комплект ключей и предпродажная подготовка — бесплатно при заказе до конца месяца.",
        discountText: "Скидка 0%, подарки включены",
        active: true,
      },
    ],
  });

  // Cars
  await prisma.order.deleteMany();
  await prisma.contract.deleteMany();
  await prisma.car.deleteMany();

  const createdCars = [];
  for (const car of cars) {
    const created = await prisma.car.create({
      data: {
        brand: car.brand,
        model: car.model,
        year: car.year,
        price: car.price,
        type: car.type,
        description: car.description,
        specs: JSON.stringify(car.specs),
        images: JSON.stringify(car.images),
        inStock: car.inStock,
        featured: car.featured,
      },
    });
    createdCars.push(created);
  }

  // Users
  const adminPassword = "admin12345";
  const clientPassword = "client12345";

  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      email: "admin@biuloo.by",
      passwordHash: bcrypt.hashSync(adminPassword, 10),
      name: "Администратор",
      phone: "+375290000001",
      role: "ADMIN",
    },
  });

  const client = await prisma.user.create({
    data: {
      email: "client@example.com",
      passwordHash: bcrypt.hashSync(clientPassword, 10),
      name: "Иван Иванов",
      phone: "+375291112233",
      role: "USER",
    },
  });

  // Demo order in progress (PURCHASING stage)
  const demoCar = createdCars[0];
  const demoOrder = await prisma.order.create({
    data: {
      userId: client.id,
      carId: demoCar.id,
      name: client.name,
      phone: client.phone!,
      email: client.email,
      message: "Интересует комплектация Champion, цвет белый.",
      stage: "PURCHASING",
      price: demoCar.price,
    },
  });

  // Stage history up to PURCHASING
  const stagesPassed = ORDER_STAGES.slice(
    0,
    ORDER_STAGES.indexOf("PURCHASING") + 1
  );
  const now = Date.now();
  for (let i = 0; i < stagesPassed.length; i++) {
    await prisma.orderStageHistory.create({
      data: {
        orderId: demoOrder.id,
        stage: stagesPassed[i],
        changedAt: new Date(now - (stagesPassed.length - i) * 86400000),
        comment:
          i === stagesPassed.length - 1
            ? "Автомобиль выкуплен у поставщика, ожидаем отгрузку."
            : undefined,
      },
    });
  }

  // Draft contract for the demo order
  await prisma.contract.create({
    data: {
      orderId: demoOrder.id,
      number: `BM-${new Date().getFullYear()}-0001`,
      clientName: client.name,
      clientPhone: client.phone!,
      carDescription: `${demoCar.brand} ${demoCar.model}, ${demoCar.year} г.в.`,
      price: demoCar.price,
      terms:
        "Договор купли-продажи автомобиля с условием поставки из КНР. Оплата производится в два этапа: 50% аванс, 50% по прибытии автомобиля на склад в Республике Беларусь.",
      status: "SIGNED",
    },
  });

  console.log("Seed complete.");
  console.log("Admin login: admin@biuloo.by / " + adminPassword);
  console.log("Client login: client@example.com / " + clientPassword);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
