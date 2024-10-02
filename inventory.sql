/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 50733
 Source Host           : 127.0.0.1:3306
 Source Schema         : inventory

 Target Server Type    : MySQL
 Target Server Version : 50733
 File Encoding         : 65001

 Date: 02/10/2024 10:39:55
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories`  (
  `CategoryID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `CategoryName` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`CategoryID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for knex_migrations
-- ----------------------------
DROP TABLE IF EXISTS `knex_migrations`;
CREATE TABLE `knex_migrations`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `batch` int(11) NULL DEFAULT NULL,
  `migration_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for knex_migrations_lock
-- ----------------------------
DROP TABLE IF EXISTS `knex_migrations_lock`;
CREATE TABLE `knex_migrations_lock`  (
  `index` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `is_locked` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`index`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for locations
-- ----------------------------
DROP TABLE IF EXISTS `locations`;
CREATE TABLE `locations`  (
  `LocationID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `LocationName` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`LocationID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products`  (
  `ProductID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `ProductName` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `Description` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  `CategoryID` int(10) UNSIGNED NULL DEFAULT NULL,
  `Price` int(11) NOT NULL,
  `StockQuantity` int(11) NOT NULL,
  `LocationID` int(10) UNSIGNED NULL DEFAULT NULL,
  `RfidTagID` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`ProductID`) USING BTREE,
  INDEX `products_categoryid_foreign`(`CategoryID`) USING BTREE,
  INDEX `products_locationid_foreign`(`LocationID`) USING BTREE,
  CONSTRAINT `products_categoryid_foreign` FOREIGN KEY (`CategoryID`) REFERENCES `categories` (`CategoryID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `products_locationid_foreign` FOREIGN KEY (`LocationID`) REFERENCES `locations` (`LocationID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for rfid
-- ----------------------------
DROP TABLE IF EXISTS `rfid`;
CREATE TABLE `rfid`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(200) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for suppliers
-- ----------------------------
DROP TABLE IF EXISTS `suppliers`;
CREATE TABLE `suppliers`  (
  `SupplierID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `SupplierName` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `ContactInfo` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `Address` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`SupplierID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for transactions
-- ----------------------------
DROP TABLE IF EXISTS `transactions`;
CREATE TABLE `transactions`  (
  `TransactionID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `ProductID` int(10) UNSIGNED NULL DEFAULT NULL,
  `Quantity` int(11) NOT NULL,
  `TransactionDate` datetime NOT NULL,
  `TransactionType` enum('IN','OUT') CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'IN',
  `UserID` int(10) UNSIGNED NULL DEFAULT NULL,
  `LocationID` int(10) UNSIGNED NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`TransactionID`) USING BTREE,
  INDEX `transactions_productid_foreign`(`ProductID`) USING BTREE,
  INDEX `transactions_locationid_foreign`(`LocationID`) USING BTREE,
  INDEX `transactions_userid_foreign`(`UserID`) USING BTREE,
  CONSTRAINT `transactions_locationid_foreign` FOREIGN KEY (`LocationID`) REFERENCES `locations` (`LocationID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `transactions_productid_foreign` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ProductID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `transactions_userid_foreign` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `UserID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `Username` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `Fullname` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `Email` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `Password` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `Role` enum('admin','operator') CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'admin',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`UserID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
