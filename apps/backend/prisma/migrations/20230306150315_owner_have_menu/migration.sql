/*
  Warnings:

  - The primary key for the `Menu` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[owner_id]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[menu_id]` on the table `Menu_Item` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `owner_id` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Menu_Item" DROP CONSTRAINT "Menu_Item_menu_id_fkey";

-- AlterTable
ALTER TABLE "Menu" DROP CONSTRAINT "Menu_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "owner_id" INTEGER NOT NULL,
ALTER COLUMN "category_id" DROP DEFAULT,
ADD CONSTRAINT "Menu_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Menu_category_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Menu_owner_id_key" ON "Menu"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "Menu_Item_menu_id_key" ON "Menu_Item"("menu_id");

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Owner"("owner_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu_Item" ADD CONSTRAINT "Menu_Item_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
