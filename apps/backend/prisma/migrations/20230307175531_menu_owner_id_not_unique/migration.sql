/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Menu" DROP CONSTRAINT "Menu_owner_id_fkey";

-- DropIndex
DROP INDEX "Menu_owner_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "Menu_id_key" ON "Menu"("id");

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_id_fkey" FOREIGN KEY ("id") REFERENCES "Owner"("owner_id") ON DELETE RESTRICT ON UPDATE CASCADE;
