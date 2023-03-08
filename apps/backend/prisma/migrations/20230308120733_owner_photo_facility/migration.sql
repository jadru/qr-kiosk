-- AlterTable
ALTER TABLE "Owner" ADD COLUMN     "facility" TEXT,
ADD COLUMN     "photo" TEXT[];

-- CreateTable
CREATE TABLE "Order" (
    "order_id" TEXT NOT NULL,
    "status" TEXT,
    "approveAt" TEXT,
    "requestAt" TEXT,
    "totalAmount" TEXT NOT NULL,
    "order_name" TEXT NOT NULL,
    "method" TEXT,
    "menus" TEXT[],

    CONSTRAINT "Order_pkey" PRIMARY KEY ("order_id")
);
