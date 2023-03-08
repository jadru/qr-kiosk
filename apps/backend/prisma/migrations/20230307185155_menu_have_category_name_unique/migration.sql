/*
  Warnings:

  - A unique constraint covering the columns `[category_name]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.
  - Made the column `category_name` on table `Menu` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `category_name` to the `Menu_Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Menu" ALTER COLUMN "category_name" SET NOT NULL;

-- AlterTable
ALTER TABLE "Menu_Item" ADD COLUMN     "category_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Menu_category_name_key" ON "Menu"("category_name");
