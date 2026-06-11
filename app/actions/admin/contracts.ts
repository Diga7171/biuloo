"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { CONTRACT_STATUSES, type ContractStatus } from "@/lib/orderStages";

async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Доступ запрещён");
}

function contractDataFromForm(formData: FormData) {
  const field = (name: string) => String(formData.get(name) ?? "").trim();
  const status = field("status");

  return {
    number: field("number"),
    clientName: field("clientName"),
    clientPhone: field("clientPhone"),
    clientPassport: field("clientPassport") || null,
    carDescription: field("carDescription"),
    price: Number(field("price")) || 0,
    terms: field("terms"),
    status: CONTRACT_STATUSES.includes(status as ContractStatus) ? status : "DRAFT",
  };
}

function revalidateOrder(orderId: string) {
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath(`/cabinet/orders/${orderId}`);
  revalidatePath("/cabinet");
}

export async function saveContract(formData: FormData) {
  await requireAdmin();

  const orderId = String(formData.get("orderId") ?? "");
  if (!orderId) throw new Error("Не указан заказ");

  const data = contractDataFromForm(formData);
  if (!data.number || !data.clientName || !data.clientPhone || !data.carDescription || !data.terms) {
    throw new Error("Заполните все обязательные поля договора");
  }

  await prisma.contract.upsert({
    where: { orderId },
    create: { orderId, ...data },
    update: data,
  });

  revalidateOrder(orderId);
}

export async function deleteContract(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const orderId = String(formData.get("orderId") ?? "");
  if (!id || !orderId) throw new Error("Некорректные данные");

  await prisma.contract.delete({ where: { id } });

  revalidateOrder(orderId);
}
