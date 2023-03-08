/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Owner` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Owner_username_key" ON "Owner"("username");
