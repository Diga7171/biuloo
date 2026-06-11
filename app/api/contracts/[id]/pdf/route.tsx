import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/settings";
import { ContractDocument } from "@/lib/pdf/ContractDocument";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const contract = await prisma.contract.findUnique({
    where: { id },
    include: { order: true },
  });

  if (!contract) {
    return NextResponse.json({ error: "Договор не найден" }, { status: 404 });
  }

  const isOwner = contract.order.userId === session.user.id;
  const isAdmin = session.user.role === "ADMIN";
  if (!isOwner && !isAdmin) {
    return NextResponse.json({ error: "Доступ запрещён" }, { status: 403 });
  }

  const settings = await getSiteSettings();
  const buffer = await renderToBuffer(
    <ContractDocument
      contract={contract}
      company={{
        name: settings.companyName,
        address: settings.address,
        phone: settings.phone,
        email: settings.email,
      }}
    />
  );

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="contract-${contract.number}.pdf"`,
    },
  });
}
