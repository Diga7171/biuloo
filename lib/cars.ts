import type { Car } from "@prisma/client";

export type CarImage = { variant: string; accent: string };

export function parseCarSpecs(car: Pick<Car, "specs">): Record<string, string> {
  try {
    return JSON.parse(car.specs) as Record<string, string>;
  } catch {
    return {};
  }
}

export function parseCarImages(car: Pick<Car, "images">): CarImage[] {
  try {
    const parsed = JSON.parse(car.images) as CarImage[];
    return Array.isArray(parsed) && parsed.length > 0
      ? parsed
      : [{ variant: "sedan", accent: "#E2231A" }];
  } catch {
    return [{ variant: "sedan", accent: "#E2231A" }];
  }
}

export function formatPrice(price: number, currency: string = "USD") {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}
