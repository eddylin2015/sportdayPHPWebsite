CREATE TABLE `field_rc` (
  `frc_id` int(11) NOT NULL AUTO_INCREMENT,
  `fi_id` int(11) DEFAULT NULL,
  `rank` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `group_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `road` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `s_number` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `number` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `classno` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `rc` varchar(32) CHARACTER SET big5 COLLATE big5_bin DEFAULT NULL,
  `grk` varchar(32) CHARACTER SET big5 COLLATE big5_bin DEFAULT NULL,
  `note` varchar(32) CHARACTER SET big5 COLLATE big5_bin DEFAULT NULL,
  `RCX` varchar(3) CHARACTER SET big5 COLLATE big5_bin DEFAULT NULL,
  `h1` varchar(8) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `h2` varchar(8) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `h3` varchar(8) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `h4` varchar(8) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `h5` varchar(8) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `h6` varchar(8) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `h7` varchar(8) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `h8` varchar(8) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `h9` varchar(8) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `h10` varchar(8) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `h11` varchar(8) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `h12` varchar(8) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `h13` varchar(8) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `h14` varchar(8) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `h15` varchar(8) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `h16` varchar(8) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `B3` varchar(8) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `B5` varchar(8) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `stud_ref` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `gi` int(11) DEFAULT NULL,
  PRIMARY KEY (`frc_id`),
  UNIQUE KEY `si_id` (`fi_id`,`group_id`,`road`,`number`,`name`,`classno`)
) ENGINE=MyISAM AUTO_INCREMENT=387 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
CREATE TABLE `field_item` (
  `fi_id` int(11) DEFAULT NULL,
  `f_item` varchar(64) CHARACTER SET big5 COLLATE big5_bin DEFAULT NULL,
  `filename` varchar(128) CHARACTER SET big5 COLLATE big5_bin DEFAULT NULL,
  `rcx` varchar(8) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `title` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `gi` smallint(6) DEFAULT NULL,
  `lock_item` int(11) DEFAULT NULL,
  `lock_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ds_n` varchar(3) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `h1` varchar(8) COLLATE utf8_bin DEFAULT NULL,
  `h2` varchar(8) COLLATE utf8_bin DEFAULT NULL,
  `h3` varchar(8) COLLATE utf8_bin DEFAULT NULL,
  `h4` varchar(8) COLLATE utf8_bin DEFAULT NULL,
  `h5` varchar(8) COLLATE utf8_bin DEFAULT NULL,
  `h6` varchar(8) COLLATE utf8_bin DEFAULT NULL,
  `h7` varchar(8) COLLATE utf8_bin DEFAULT NULL,
  `h8` varchar(8) COLLATE utf8_bin DEFAULT NULL,
  `h9` varchar(8) COLLATE utf8_bin DEFAULT NULL,
  `h10` varchar(8) COLLATE utf8_bin DEFAULT NULL,
  `h11` varchar(8) COLLATE utf8_bin DEFAULT NULL,
  `h12` varchar(8) COLLATE utf8_bin DEFAULT NULL,
  `h13` varchar(8) COLLATE utf8_bin DEFAULT NULL,
  `h14` varchar(8) COLLATE utf8_bin DEFAULT NULL,
  `h15` varchar(8) COLLATE utf8_bin DEFAULT NULL,
  `h16` varchar(8) COLLATE utf8_bin DEFAULT NULL,
  `i_cnt` int(11) DEFAULT NULL,
  `p_cnt` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
CREATE TABLE `blogs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `author` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `publishedDate` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `imageUrl` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `description` text COLLATE utf8_bin,
  `createdBy` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `createdById` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
CREATE TABLE `tblgr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `si_id` varchar(45) DEFAULT NULL,
  `gr_rc` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `classno` varchar(45) DEFAULT NULL,
  `gr_period` varchar(45) DEFAULT NULL,
  `gr_date` varchar(45) DEFAULT NULL,
  `item` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM;
CREATE TABLE `tbl2` (
  `spno` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `item` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `classno` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `seat` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `spgroup` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `I_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `I_tab` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `si_id` int(11) DEFAULT NULL,
  `rc` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `grk` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `s_number` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `groupid` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `group_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `road` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `RCX` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `i_cnt` int(11) DEFAULT '0',
  PRIMARY KEY (`spno`,`item`,`spgroup`,`I_name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
CREATE TABLE `sport_rc` (
  `rc_id` int(11) NOT NULL AUTO_INCREMENT,
  `si_id` int(11) DEFAULT NULL,
  `rank` varchar(32) CHARACTER SET big5 COLLATE big5_bin DEFAULT NULL,
  `group_id` varchar(32) CHARACTER SET big5 COLLATE big5_bin DEFAULT NULL,
  `road` varchar(32) CHARACTER SET big5 COLLATE big5_bin DEFAULT NULL,
  `s_number` varchar(32) CHARACTER SET big5 COLLATE big5_bin DEFAULT NULL,
  `number` varchar(32) CHARACTER SET big5 COLLATE big5_bin DEFAULT NULL,
  `classno` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `rc` varchar(32) CHARACTER SET big5 COLLATE big5_bin DEFAULT NULL,
  `grk` varchar(32) CHARACTER SET big5 COLLATE big5_bin DEFAULT NULL,
  `note` varchar(32) CHARACTER SET big5 COLLATE big5_bin DEFAULT NULL,
  `RCX` varchar(3) CHARACTER SET big5 COLLATE big5_bin DEFAULT NULL,
  `stud_ref` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `gi` int(11) DEFAULT NULL,
  PRIMARY KEY (`rc_id`),
  UNIQUE KEY `si_id` (`si_id`,`group_id`,`road`,`number`,`name`,`classno`)
) ENGINE=MyISAM;
CREATE TABLE `sport_item` (
  `si_id` int(11) DEFAULT NULL,
  `s_item` varchar(64) CHARACTER SET big5 COLLATE big5_bin DEFAULT NULL,
  `filename` varchar(128) CHARACTER SET big5 COLLATE big5_bin DEFAULT NULL,
  `rcx` varchar(8) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `title` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `gi` smallint(6) DEFAULT NULL,
  `lock_item` int(11) DEFAULT NULL,
  `lock_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ds_n` varchar(3) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `i_cnt` int(11) DEFAULT NULL,
  `p_cnt` int(11) DEFAULT NULL,
  `plist` text COLLATE utf8_bin
) ENGINE=MyISAM;