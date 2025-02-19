/*
  Warnings:

  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Client`;

-- CreateTable
CREATE TABLE `Renginiai` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `link` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `img` VARCHAR(255) NULL,

    UNIQUE INDEX `Renginiai_link_key`(`link`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ivertinimai` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `rate` SMALLINT UNSIGNED NOT NULL DEFAULT 1,
    `description` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
