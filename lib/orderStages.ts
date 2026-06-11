export const ORDER_STAGES = [
  "NEW",
  "CONTRACT_DRAFT",
  "CONTRACT_SIGNED",
  "PAYMENT",
  "PURCHASING",
  "SHIPPING",
  "CUSTOMS",
  "ARRIVED",
  "READY",
  "COMPLETED",
] as const;

export type OrderStage = (typeof ORDER_STAGES)[number];

export const ORDER_STAGE_LABELS: Record<OrderStage, string> = {
  NEW: "Заявка получена",
  CONTRACT_DRAFT: "Договор формируется",
  CONTRACT_SIGNED: "Договор подписан",
  PAYMENT: "Оплата",
  PURCHASING: "Выкуп автомобиля в Китае",
  SHIPPING: "Транспортировка",
  CUSTOMS: "Таможенное оформление",
  ARRIVED: "Прибыл на склад в РБ",
  READY: "Готов к выдаче",
  COMPLETED: "Передан клиенту",
};

export const ORDER_STAGE_DESCRIPTIONS: Record<OrderStage, string> = {
  NEW: "Мы получили вашу заявку и уже изучаем детали.",
  CONTRACT_DRAFT: "Менеджер готовит договор на покупку автомобиля.",
  CONTRACT_SIGNED: "Договор подписан обеими сторонами.",
  PAYMENT: "Ожидаем поступление оплаты по договору.",
  PURCHASING: "Автомобиль выкупается у поставщика в Китае.",
  SHIPPING: "Автомобиль в пути: морская/жд перевозка до Беларуси.",
  CUSTOMS: "Автомобиль проходит таможенное оформление.",
  ARRIVED: "Автомобиль прибыл на склад в Беларуси.",
  READY: "Автомобиль подготовлен и готов к выдаче.",
  COMPLETED: "Автомобиль передан клиенту. Спасибо за покупку!",
};

export function stageIndex(stage: string): number {
  const idx = ORDER_STAGES.indexOf(stage as OrderStage);
  return idx === -1 ? 0 : idx;
}

export const ROLES = ["ADMIN", "USER"] as const;
export type Role = (typeof ROLES)[number];

export const CAR_TYPES = ["ELECTRIC", "HYBRID", "ICE"] as const;
export type CarType = (typeof CAR_TYPES)[number];

export const CAR_TYPE_LABELS: Record<CarType, string> = {
  ELECTRIC: "Электромобиль",
  HYBRID: "Гибрид",
  ICE: "ДВС",
};

export const CONTRACT_STATUSES = ["DRAFT", "SIGNED"] as const;
export type ContractStatus = (typeof CONTRACT_STATUSES)[number];

export const CONTRACT_STATUS_LABELS: Record<ContractStatus, string> = {
  DRAFT: "Черновик",
  SIGNED: "Подписан",
};
