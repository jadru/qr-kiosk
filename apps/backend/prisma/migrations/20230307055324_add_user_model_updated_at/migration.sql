/*
  Warnings:

  - Made the column `updatedTime` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "updatedTime" SET NOT NULL;
