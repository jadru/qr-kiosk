/*
  Warnings:

  - A unique constraint covering the columns `[item_id]` on the table `Menu_Item` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Menu_Item_menu_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "Menu_Item_item_id_key" ON "Menu_Item"("item_id");
