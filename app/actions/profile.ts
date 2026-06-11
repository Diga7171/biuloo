"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function updateProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Не авторизован");

  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim() || null;

  if (!name) throw new Error("Укажите имя");

  await prisma.user.update({
    where: { id: session.user.id },
    data: { name, phone },
  });

  revalidatePath("/cabinet/profile");
}
