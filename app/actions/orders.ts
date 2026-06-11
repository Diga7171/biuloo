"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function createOrder(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim() || null;
  const message = String(formData.get("message") ?? "").trim() || null;
  const carId = String(formData.get("carId") ?? "").trim() || null;
  const redirectTo = String(formData.get("redirectTo") ?? "").trim();

  if (!name || !phone) {
    throw new Error("Имя и телефон обязательны");
  }

  const session = await auth();

  const order = await prisma.order.create({
    data: {
      name,
      phone,
      email,
      message,
      carId: carId || undefined,
      userId: session?.user?.id,
      stage: "NEW",
      stageHistory: {
        create: { stage: "NEW" },
      },
    },
  });

  revalidatePath("/cabinet");
  revalidatePath("/admin/orders");

  if (redirectTo) {
    redirect(`${redirectTo}?sent=1#order-${order.id}`);
  }

  return order;
}
