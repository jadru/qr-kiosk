-- AlterTable
ALTER TABLE "Menu_Item" ADD COLUMN     "order_DetailId" INTEGER;

-- CreateTable
CREATE TABLE "Order_Detail" (
    "id" SERIAL NOT NULL,
    "toss_status" TEXT NOT NULL,
    "order_status" TEXT NOT NULL,
    "total_amount" INTEGER NOT NULL,
    "order_name" TEXT NOT NULL,
    "approveAt" TIMESTAMP(3),
    "requestAt" TIMESTAMP(3),
    "owner_id" INTEGER NOT NULL,

    CONSTRAINT "Order_Detail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order_Detail" ADD CONSTRAINT "Order_Detail_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu_Item" ADD CONSTRAINT "Menu_Item_order_DetailId_fkey" FOREIGN KEY ("order_DetailId") REFERENCES "Order_Detail"("id") ON DELETE SET NULL ON UPDATE CASCADE;
