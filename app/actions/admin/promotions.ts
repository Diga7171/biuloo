"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Доступ запрещён");
}

function parseValidUntil(value: string): Date | null {
  return value ? new Date(value) : null;
}

export async function createPromotion(formData: FormData) {
  await requireAdmin();

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const discountText = String(formData.get("discountText") ?? "").trim();
  const validUntil = parseValidUntil(String(formData.get("validUntil") ?? ""));
  const active = formData.get("active") === "on";

  if (!title || !description || !discountText) {
    throw new Error("Заполните все обязательные поля");
  }

  await prisma.promotion.create({
    data: { title, description, discountText, validUntil, active },
  });

  revalidatePath("/admin/promotions");
  revalidatePath("/promotions");
  revalidatePath("/");
}

export async function updatePromotion(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const discountText = String(formData.get("discountText") ?? "").trim();
  const validUntil = parseValidUntil(String(formData.get("validUntil") ?? ""));
  const active = formData.get("active") === "on";

  if (!id || !title || !description || !discountText) {
    throw new Error("Заполните все обязательные поля");
  }

  await prisma.promotion.update({
    where: { id },
    data: { title, description, discountText, validUntil, active },
  });

  revalidatePath("/admin/promotions");
  revalidatePath("/promotions");
  revalidatePath("/");
}

export async function deletePromotion(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Не указан id");

  await prisma.promotion.delete({ where: { id } });

  revalidatePath("/admin/promotions");
  revalidatePath("/promotions");
  revalidatePath("/");
}
