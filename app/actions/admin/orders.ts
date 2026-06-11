"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ORDER_STAGES, type OrderStage } from "@/lib/orderStages";

async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Доступ запрещён");
}

function revalidateOrder(id: string) {
  revalidatePath(`/admin/orders/${id}`);
  revalidatePath("/admin/orders");
  revalidatePath("/admin");
  revalidatePath(`/cabinet/orders/${id}`);
  revalidatePath("/cabinet");
}

export async function updateOrderStage(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const stage = String(formData.get("stage") ?? "");
  const comment = String(formData.get("comment") ?? "").trim();

  if (!id || !ORDER_STAGES.includes(stage as OrderStage)) {
    throw new Error("Некорректные данные");
  }

  await prisma.$transaction([
    prisma.order.update({ where: { id }, data: { stage } }),
    prisma.orderStageHistory.create({
      data: { orderId: id, stage, comment: comment || null },
    }),
  ]);

  revalidateOrder(id);
}

export async function updateOrderDetails(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Не указан id");

  const carId = String(formData.get("carId") ?? "").trim();
  const priceRaw = String(formData.get("price") ?? "").trim();

  await prisma.order.update({
    where: { id },
    data: {
      carId: carId || null,
      price: priceRaw ? Number(priceRaw) : null,
    },
  });

  revalidateOrder(id);
}
