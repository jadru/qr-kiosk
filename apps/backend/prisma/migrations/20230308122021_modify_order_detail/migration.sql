/*
  Warnings:

  - You are about to drop the column `item_id` on the `Menu_Item` table. All the data in the column will be lost.
  - You are about to drop the column `order_DetailId` on the `Menu_Item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Menu_Item" DROP CONSTRAINT "Menu_Item_order_DetailId_fkey";

-- DropIndex
DROP INDEX "Menu_Item_item_id_key";

-- AlterTable
ALTER TABLE "Menu_Item" DROP COLUMN "item_id",
DROP COLUMN "order_DetailId";
