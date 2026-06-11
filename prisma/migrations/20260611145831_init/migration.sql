-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "type" TEXT NOT NULL DEFAULT 'ICE',
    "description" TEXT NOT NULL,
    "specs" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "inStock" BOOLEAN NOT NULL DEFAULT true,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Promotion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "discountText" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "validUntil" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "colorPrimary" TEXT NOT NULL DEFAULT '#E2231A',
    "colorSecondary" TEXT NOT NULL DEFAULT '#1A1A1A',
    "colorAccent" TEXT NOT NULL DEFAULT '#FFC400',
    "colorBg" TEXT NOT NULL DEFAULT '#F7F5F2',
    "companyName" TEXT NOT NULL DEFAULT 'ООО «Биулу Моторс»',
    "phone" TEXT NOT NULL DEFAULT '+375 (29) 000-00-00',
    "email" TEXT NOT NULL DEFAULT 'info@biuloo.by',
    "address" TEXT NOT NULL DEFAULT 'г. Минск, пр-т Победителей, 1',
    "announcementText" TEXT NOT NULL DEFAULT 'Акция: бесплатная оклейка кузова защитной плёнкой при заказе до конца месяца!',
    "announcementActive" BOOLEAN NOT NULL DEFAULT true,
    "telegram" TEXT NOT NULL DEFAULT 'https://t.me/biuloo_motors',
    "instagram" TEXT NOT NULL DEFAULT 'https://instagram.com/biuloo_motors',
    "whatsapp" TEXT NOT NULL DEFAULT 'https://wa.me/375290000000'
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "carId" TEXT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "message" TEXT,
    "stage" TEXT NOT NULL DEFAULT 'NEW',
    "price" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Order_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OrderStageHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "stage" TEXT NOT NULL,
    "changedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comment" TEXT,
    CONSTRAINT "OrderStageHistory_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Contract" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientPhone" TEXT NOT NULL,
    "clientPassport" TEXT,
    "carDescription" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "terms" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pdfGeneratedAt" DATETIME,
    CONSTRAINT "Contract_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Contract_orderId_key" ON "Contract"("orderId");
