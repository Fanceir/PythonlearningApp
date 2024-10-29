/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `email` VARCHAR(191) NOT NULL DEFAULT 'temp@example.com',
    ADD COLUMN `fullName` VARCHAR(191) NOT NULL DEFAULT 'Temporary Name';

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);
