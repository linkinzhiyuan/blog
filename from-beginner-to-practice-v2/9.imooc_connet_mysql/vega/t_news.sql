/*
 Navicat Premium Dump SQL

 Source Server         : 本地
 Source Server Type    : MySQL
 Source Server Version : 90300 (9.3.0)
 Source Host           : localhost:3306
 Source Schema         : vega

 Target Server Type    : MySQL
 Target Server Version : 90300 (9.3.0)
 File Encoding         : 65001

 Date: 28/05/2025 15:21:39
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_news
-- ----------------------------
DROP TABLE IF EXISTS `t_news`;
CREATE TABLE `t_news` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(40) NOT NULL,
  `editor_id` int unsigned NOT NULL,
  `type_id` int unsigned NOT NULL,
  `content_id` char(12) NOT NULL,
  `is_top` tinyint unsigned NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `state` enum('草稿','待审批','已审批','隐藏') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `editor_id` (`editor_id`),
  KEY `type_id` (`type_id`),
  KEY `state` (`state`),
  KEY `create_time` (`create_time`),
  KEY `is_top` (`is_top`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

SET FOREIGN_KEY_CHECKS = 1;
