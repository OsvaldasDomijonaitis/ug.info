/*
  Warnings:

  - You are about to alter the column `date` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to drop the `ForumPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ForumPostMessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ForumPostTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ForumTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ForumPost` DROP FOREIGN KEY `ForumPost_userId_fkey`;

-- DropForeignKey
ALTER TABLE `ForumPostMessage` DROP FOREIGN KEY `ForumPostMessage_postId_fkey`;

-- DropForeignKey
ALTER TABLE `ForumPostMessage` DROP FOREIGN KEY `ForumPostMessage_userId_fkey`;

-- DropForeignKey
ALTER TABLE `ForumPostTag` DROP FOREIGN KEY `ForumPostTag_postId_fkey`;

-- DropForeignKey
ALTER TABLE `ForumPostTag` DROP FOREIGN KEY `ForumPostTag_tagId_fkey`;

-- AlterTable
ALTER TABLE `Event` MODIFY `date` TIMESTAMP NOT NULL;

-- DropTable
DROP TABLE `ForumPost`;

-- DropTable
DROP TABLE `ForumPostMessage`;

-- DropTable
DROP TABLE `ForumPostTag`;

-- DropTable
DROP TABLE `ForumTag`;

-- CreateTable
CREATE TABLE `Tag` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `Tag_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `userId` INTEGER UNSIGNED NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `body` TEXT NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PostTag` (
    `postId` INTEGER UNSIGNED NOT NULL,
    `tagId` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`postId`, `tagId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `postId` INTEGER UNSIGNED NOT NULL,
    `userId` INTEGER UNSIGNED NOT NULL,
    `body` TEXT NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostTag` ADD CONSTRAINT `PostTag_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostTag` ADD CONSTRAINT `PostTag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
