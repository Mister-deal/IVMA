-- CreateTable
CREATE TABLE `cart_items` (
    `id` VARCHAR(191) NOT NULL,
    `cart_id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `cart_items_cart_id_idx`(`cart_id`),
    INDEX `cart_items_product_id_idx`(`product_id`),
    UNIQUE INDEX `cart_items_cart_id_product_id_key`(`cart_id`, `product_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `carts` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `status` ENUM('pending', 'completed') NOT NULL DEFAULT 'pending',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `carts_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `categories_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `movements` (
    `id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `movement_type` ENUM('entry', 'exit') NOT NULL,
    `reason` VARCHAR(191) NULL,
    `movement_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `movements_product_id_idx`(`product_id`),
    INDEX `movements_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notifications` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NULL,
    `type` ENUM('stock_alert', 'movement_confirmation', 'system_alert') NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `is_read` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `notifications_user_id_idx`(`user_id`),
    INDEX `notifications_product_id_idx`(`product_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `password_resets` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires_at` DATETIME(3) NOT NULL,
    `used` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `password_resets_token_key`(`token`),
    INDEX `password_resets_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `sku` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `min_stock_alert` INTEGER NOT NULL DEFAULT 5,
    `supplier` VARCHAR(191) NULL,
    `category_id` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `products_sku_key`(`sku`),
    INDEX `products_category_id_idx`(`category_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `pseudo` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password_hash` VARCHAR(191) NOT NULL,
    `role` ENUM('admin', 'manager', 'employee') NOT NULL DEFAULT 'employee',
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_pseudo_key`(`pseudo`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cart_items` ADD CONSTRAINT `cart_items_cart_id_fkey` FOREIGN KEY (`cart_id`) REFERENCES `carts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart_items` ADD CONSTRAINT `cart_items_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `carts` ADD CONSTRAINT `carts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movements` ADD CONSTRAINT `movements_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movements` ADD CONSTRAINT `movements_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `password_resets` ADD CONSTRAINT `password_resets_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
