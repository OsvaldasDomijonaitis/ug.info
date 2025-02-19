/*
  Warnings:

  - Added the required column `userId` to the `Renginiai` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Renginiai` ADD COLUMN `userId` INTEGER UNSIGNED NOT NULL;

-- AddForeignKey
ALTER TABLE `Renginiai` ADD CONSTRAINT `Renginiai_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
