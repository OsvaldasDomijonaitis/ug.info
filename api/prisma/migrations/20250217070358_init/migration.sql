/*
  Warnings:

  - Added the required column `renginioId` to the `Ivertinimai` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Ivertinimai` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Ivertinimai` ADD COLUMN `renginioId` INTEGER UNSIGNED NOT NULL,
    ADD COLUMN `userId` INTEGER UNSIGNED NOT NULL;

-- AddForeignKey
ALTER TABLE `Ivertinimai` ADD CONSTRAINT `Ivertinimai_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ivertinimai` ADD CONSTRAINT `Ivertinimai_renginioId_fkey` FOREIGN KEY (`renginioId`) REFERENCES `Renginiai`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
