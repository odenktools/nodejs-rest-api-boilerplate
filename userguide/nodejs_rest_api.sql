﻿-- Script was generated by Devart dbForge Studio for MySQL, Version 6.0.493.0
-- Product home page: http://www.devart.com/dbforge/mysql/studio
-- Script date 2/3/2016 2:13:23 AM
-- Server version: 5.5.44
-- Client version: 4.1

-- 
-- Disable foreign keys
-- 
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;

-- 
-- Set character set the client will use to send SQL statements to the server
--
SET NAMES 'utf8';

-- 
-- Set default database
--
USE nodejs_rest_api;

--
-- Definition for table mahasiswa
--
DROP TABLE IF EXISTS mahasiswa;
CREATE TABLE IF NOT EXISTS mahasiswa (
  id_mhs int(11) NOT NULL AUTO_INCREMENT,
  nama_mhs varchar(50) DEFAULT NULL,
  kelas_mhs varchar(15) DEFAULT NULL,
  PRIMARY KEY (id_mhs)
)
ENGINE = INNODB
AUTO_INCREMENT = 1
CHARACTER SET utf8
COLLATE utf8_general_ci;

-- 
-- Dumping data for table mahasiswa
--

/*!40000 ALTER TABLE mahasiswa DISABLE KEYS */;INSERT INTO mahasiswa VALUES
(1, 'moeloet', 'ti-7'),
(2, 'tiara', 'ti-2'),
(3, 'qiearman', 'ti-1');

/*!40000 ALTER TABLE mahasiswa ENABLE KEYS */;

--
-- Definition for table odk_menu
--
DROP TABLE IF EXISTS odk_menu;
CREATE TABLE IF NOT EXISTS odk_menu (
  id_menu int(11) NOT NULL AUTO_INCREMENT,
  parent_menu int(11) NOT NULL DEFAULT 0,
  menu_title varchar(50) DEFAULT NULL,
  menu_name varchar(50) DEFAULT NULL,
  menu_type varchar(25) NOT NULL DEFAULT 'backend',
  js_module_name varchar(255) DEFAULT NULL,
  menu_route varchar(255) DEFAULT NULL,
  assets_url varchar(255) DEFAULT NULL,
  image varchar(255) DEFAULT NULL,
  active int(1) NOT NULL DEFAULT 0,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (id_menu),
  INDEX FK_module_module_id_module (parent_menu)
)
ENGINE = INNODB
AUTO_INCREMENT = 1
CHARACTER SET utf8
COLLATE utf8_general_ci;

-- 
-- Dumping data for table odk_menu
--

/*!40000 ALTER TABLE odk_menu DISABLE KEYS */;INSERT INTO odk_menu VALUES
(1, 0, 'Modules', NULL, 'backend', '', NULL, NULL, NULL, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 1, 'Master Aplikasi', NULL, 'backend', '', NULL, NULL, NULL, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 1, 'Manajemen Aplikasi', 'management_aplikasi', 'backend', '', NULL, NULL, NULL, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 3, 'Daftar Pengguna', 'daftar_pengguna', 'backend', '', 'admin/user', 'user/grid.js', NULL, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 3, 'Daftar Perusahaan', 'branches', 'backend', '', NULL, 'branches/index.js', NULL, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 1, 'Kost', 'kost', 'backend', '', NULL, NULL, NULL, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 6, 'Daftar Kecamatan', 'kecamatan', 'backend', 'Kecamatan', 'admin/kecamatan', 'kecamatan/index.js', NULL, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(8, 6, 'Daftar Wilayah', 'wilayah', 'backend', 'Wilayah', NULL, 'wilayah/index.js', NULL, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

/*!40000 ALTER TABLE odk_menu ENABLE KEYS */;

--
-- Definition for table odk_role
--
DROP TABLE IF EXISTS odk_role;
CREATE TABLE IF NOT EXISTS odk_role (
  id_role int(11) NOT NULL AUTO_INCREMENT,
  role_name varchar(50) NOT NULL,
  role_description text DEFAULT NULL,
  is_active int(1) NOT NULL DEFAULT 0,
  is_purchaseable int(1) NOT NULL DEFAULT 0,
  amount decimal(10, 2) DEFAULT 0.00,
  price decimal(10, 2) DEFAULT 0.00,
  package_left int(5) NOT NULL DEFAULT 0,
  period char(1) NOT NULL DEFAULT 'D',
  is_builtin int(11) NOT NULL DEFAULT 1,
  backcolor varchar(24) DEFAULT NULL,
  forecolor varchar(24) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (id_role)
)
ENGINE = INNODB
AUTO_INCREMENT = 1
CHARACTER SET utf8
COLLATE utf8_general_ci;

-- 
-- Dumping data for table odk_role
--

/*!40000 ALTER TABLE odk_role DISABLE KEYS */;INSERT INTO odk_role VALUES
(1, 'admin', 'Adalah Sebuah Role Yang', 1, 1, 10.20, 20.00, 7, 'M', 1, 'c32113', 'white', '2015-07-22 20:41:45', '0000-00-00 00:00:00'),
(2, 'member', 'Adalah Sebuah Role Yang', 1, 1, 10.00, 20.00, 7, 'M', 1, 'c32113', 'white', '2015-07-22 20:41:45', '0000-00-00 00:00:00');

/*!40000 ALTER TABLE odk_role ENABLE KEYS */;

--
-- Definition for table odk_users
--
DROP TABLE IF EXISTS odk_users;
CREATE TABLE IF NOT EXISTS odk_users (
  id_user int(11) NOT NULL AUTO_INCREMENT,
  username varchar(128) NOT NULL,
  user_mail varchar(128) NOT NULL,
  passwd varchar(128) NOT NULL,
  activation_code varchar(40) DEFAULT NULL,
  is_builtin int(11) DEFAULT 0,
  is_active int(11) NOT NULL DEFAULT 0,
  expire_date datetime DEFAULT NULL,
  time_zone varchar(64) DEFAULT NULL,
  last_login timestamp NULL DEFAULT '0000-00-00 00:00:00',
  remember_token varchar(100) DEFAULT NULL,
  forgotten_password_code varchar(40) DEFAULT NULL,
  forgotten_password_time int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (id_user)
)
ENGINE = INNODB
AUTO_INCREMENT = 4
AVG_ROW_LENGTH = 5461
CHARACTER SET utf8
COLLATE utf8_general_ci;

-- 
-- Dumping data for table odk_users
--

/*!40000 ALTER TABLE odk_users DISABLE KEYS */;INSERT INTO odk_users VALUES
(1, 'moeloet', 'moeloet@moeloet.com', '$2y$06$j0NmxjSpLn1dOqeFaB0AY.6A.F06U5CgkwXO8XXnqJxCkS/.fb6GK', 'moeloet', 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, '2015-07-22 20:41:45', '2015-07-22 20:41:45'),
(2, 'qiearman', 'qiearman@qiearman.com', '$2y$07$IMgKH4OTKAKsvHfdnUEXHeM1uOiPb9QADUP7YKwayocqGc3j5wU5G', 'qiearman', 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, '2015-07-22 20:41:45', '2015-07-22 20:41:45'),
(3, 'tiara', 'tiara@moeloet.com', '$2y$08$CTLLB0oOsuZAgBNw88RIV.cVr7PqceRcwDPpv6byqU56uGcbekB8m', 'tiara', 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, '2015-07-22 20:41:45', '2015-07-22 20:41:45');

/*!40000 ALTER TABLE odk_users ENABLE KEYS */;

--
-- Definition for table odk_menu_permission
--
DROP TABLE IF EXISTS odk_menu_permission;
CREATE TABLE IF NOT EXISTS odk_menu_permission (
  role_id int(11) NOT NULL,
  menu_id int(11) NOT NULL,
  is_checked varchar(15) DEFAULT NULL,
  created_at timestamp NULL DEFAULT '0000-00-00 00:00:00',
  updated_at timestamp NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (role_id, menu_id),
  CONSTRAINT FK_odk_module_permission_odk_menu_id_module FOREIGN KEY (menu_id)
  REFERENCES odk_menu (id_menu) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT FK_odk_module_permission_odk_role_id_role FOREIGN KEY (role_id)
  REFERENCES odk_role (id_role) ON DELETE RESTRICT ON UPDATE RESTRICT
)
ENGINE = INNODB
CHARACTER SET utf8
COLLATE utf8_general_ci;

-- 
-- Dumping data for table odk_menu_permission
--

/*!40000 ALTER TABLE odk_menu_permission DISABLE KEYS */;INSERT INTO odk_menu_permission VALUES
(1, 1, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(1, 2, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(1, 3, 'checked', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(1, 4, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(1, 5, 'checked', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(1, 6, 'checked', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(1, 7, 'checked', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

/*!40000 ALTER TABLE odk_menu_permission ENABLE KEYS */;

--
-- Definition for table odk_user_roles
--
DROP TABLE IF EXISTS odk_user_roles;
CREATE TABLE IF NOT EXISTS odk_user_roles (
  id_user_roles int(11) NOT NULL AUTO_INCREMENT,
  user_id int(11) NOT NULL,
  roles_id int(11) NOT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (id_user_roles),
  CONSTRAINT FK_odk_user_roles_odk_role_id_role FOREIGN KEY (roles_id)
  REFERENCES odk_role (id_role) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT FK_odk_user_roles_odk_user_id_user FOREIGN KEY (user_id)
  REFERENCES odk_users (id_user) ON DELETE RESTRICT ON UPDATE RESTRICT
)
ENGINE = INNODB
AUTO_INCREMENT = 1
CHARACTER SET utf8
COLLATE utf8_general_ci;

-- 
-- Dumping data for table odk_user_roles
--

/*!40000 ALTER TABLE odk_user_roles DISABLE KEYS */;INSERT INTO odk_user_roles VALUES
(1, 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

/*!40000 ALTER TABLE odk_user_roles ENABLE KEYS */;

-- 
-- Enable foreign keys
-- 
/*!40014 SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS */;