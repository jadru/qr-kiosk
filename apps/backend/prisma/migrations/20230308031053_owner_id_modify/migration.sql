/*
  Warnings:

  - The primary key for the `Owner` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `owner_id` on the `Owner` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Menu" DROP CONSTRAINT "Menu_id_fkey";

-- AlterTable
ALTER TABLE "Owner" DROP CONSTRAINT "Owner_pkey",
DROP COLUMN "owner_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Owner_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_id_fkey" FOREIGN KEY ("id") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
