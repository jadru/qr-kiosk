/*
  Warnings:

  - You are about to drop the `menu_item` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "menu_item" DROP CONSTRAINT "menu_item_menu_id_fkey";

-- DropTable
DROP TABLE "menu_item";

-- CreateTable
CREATE TABLE "Menu_Item" (
    "id" INTEGER NOT NULL,
    "item_id" TEXT NOT NULL,
    "photo" TEXT,
    "price" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "menu_id" INTEGER NOT NULL,

    CONSTRAINT "Menu_Item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Menu_Item" ADD CONSTRAINT "Menu_Item_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "Menu"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;
