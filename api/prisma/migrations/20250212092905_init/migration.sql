-- CreateTable
CREATE TABLE `Client` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `link` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `img` VARCHAR(255) NULL,

    UNIQUE INDEX `Client_link_key`(`link`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
