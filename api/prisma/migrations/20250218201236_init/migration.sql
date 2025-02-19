/*
  Warnings:

  - You are about to drop the `Ivertinimai` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Renginiai` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Ivertinimai` DROP FOREIGN KEY `Ivertinimai_renginioId_fkey`;

-- DropForeignKey
ALTER TABLE `Ivertinimai` DROP FOREIGN KEY `Ivertinimai_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Renginiai` DROP FOREIGN KEY `Renginiai_userId_fkey`;

-- DropTable
DROP TABLE `Ivertinimai`;

-- DropTable
DROP TABLE `Renginiai`;

-- CreateTable
CREATE TABLE `Event` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `userId` INTEGER UNSIGNED NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `place` VARCHAR(225) NOT NULL,
    `description` TEXT NOT NULL,
    `img` VARCHAR(255) NULL,
    `status` INTEGER UNSIGNED NOT NULL DEFAULT 2,

    UNIQUE INDEX `Event_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rate` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `userId` INTEGER UNSIGNED NOT NULL,
    `rate` SMALLINT UNSIGNED NOT NULL DEFAULT 1,
    `eventId` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rate` ADD CONSTRAINT `Rate_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rate` ADD CONSTRAINT `Rate_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
