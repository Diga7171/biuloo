"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Доступ запрещён");
}

export async function updateSiteSettings(formData: FormData) {
  await requireAdmin();

  const field = (name: string) => String(formData.get(name) ?? "").trim();

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      colorPrimary: field("colorPrimary"),
      colorSecondary: field("colorSecondary"),
      colorAccent: field("colorAccent"),
      colorBg: field("colorBg"),
      companyName: field("companyName"),
      phone: field("phone"),
      email: field("email"),
      address: field("address"),
      announcementText: field("announcementText"),
      announcementActive: formData.get("announcementActive") === "on",
      telegram: field("telegram"),
      instagram: field("instagram"),
      whatsapp: field("whatsapp"),
    },
    update: {
      colorPrimary: field("colorPrimary"),
      colorSecondary: field("colorSecondary"),
      colorAccent: field("colorAccent"),
      colorBg: field("colorBg"),
      companyName: field("companyName"),
      phone: field("phone"),
      email: field("email"),
      address: field("address"),
      announcementText: field("announcementText"),
      announcementActive: formData.get("announcementActive") === "on",
      telegram: field("telegram"),
      instagram: field("instagram"),
      whatsapp: field("whatsapp"),
    },
  });

  revalidatePath("/", "layout");
  redirect("/admin/settings?saved=1");
}
