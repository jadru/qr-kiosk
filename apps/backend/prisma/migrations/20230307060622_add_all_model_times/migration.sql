/*
  Warnings:

  - Added the required column `updatedTime` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedTime` to the `Menu_Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedTime` to the `Owner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "createdTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedTime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Menu_Item" ADD COLUMN     "createdTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedTime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Owner" ADD COLUMN     "updatedTime" TIMESTAMP(3) NOT NULL;
