"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { CAR_TYPES, type CarType } from "@/lib/orderStages";

async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Доступ запрещён");
}

function specsFromText(text: string): string {
  const specs: Record<string, string> = {};
  for (const line of text.split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (key && value) specs[key] = value;
  }
  return JSON.stringify(specs);
}

function carDataFromForm(formData: FormData) {
  const field = (name: string) => String(formData.get(name) ?? "").trim();
  const type = field("type");

  return {
    brand: field("brand"),
    model: field("model"),
    year: Number(field("year")) || new Date().getFullYear(),
    price: Number(field("price")) || 0,
    currency: field("currency") || "USD",
    type: CAR_TYPES.includes(type as CarType) ? type : "ICE",
    description: field("description"),
    specs: specsFromText(field("specs")),
    images: JSON.stringify([{ variant: field("variant") || "sedan", accent: field("accent") || "#E2231A" }]),
    inStock: formData.get("inStock") === "on",
    featured: formData.get("featured") === "on",
  };
}

export async function createCar(formData: FormData) {
  await requireAdmin();

  const data = carDataFromForm(formData);
  if (!data.brand || !data.model || !data.description) {
    throw new Error("Заполните марку, модель и описание");
  }

  await prisma.car.create({ data });

  revalidatePath("/admin/cars");
  revalidatePath("/catalog");
  revalidatePath("/");
  redirect("/admin/cars");
}

export async function updateCar(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Не указан id");

  const data = carDataFromForm(formData);
  if (!data.brand || !data.model || !data.description) {
    throw new Error("Заполните марку, модель и описание");
  }

  await prisma.car.update({ where: { id }, data });

  revalidatePath("/admin/cars");
  revalidatePath("/catalog");
  revalidatePath(`/catalog/${id}`);
  revalidatePath("/");
  redirect("/admin/cars");
}

export async function deleteCar(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Не указан id");

  await prisma.car.delete({ where: { id } });

  revalidatePath("/admin/cars");
  revalidatePath("/catalog");
  revalidatePath("/");
  redirect("/admin/cars");
}
