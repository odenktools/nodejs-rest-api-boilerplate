-- 
-- Disable foreign keys
-- 
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;

-- 
-- Set SQL mode
-- 
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 
-- Set default database
--
USE nodejs_rest_api;

--
-- Definition for table odk_menu
--
DROP TABLE IF EXISTS odk_menu;
CREATE TABLE IF NOT EXISTS odk_menu (
  id_menu INT(11) NOT NULL AUTO_INCREMENT,
  parent_menu INT(11) NOT NULL DEFAULT 0,
  menu_title VARCHAR(50) DEFAULT NULL,
  menu_name VARCHAR(50) DEFAULT NULL,
  menu_type VARCHAR(25) NOT NULL DEFAULT 'backend',
  js_module_name VARCHAR(255) DEFAULT NULL,
  menu_route VARCHAR(255) DEFAULT NULL,
  assets_url VARCHAR(255) DEFAULT NULL,
  image VARCHAR(255) DEFAULT NULL,
  active INT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NULL DEFAULT NULL,
  updated_at TIMESTAMP NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (id_menu),
  INDEX FK_module_module_id_module (parent_menu)
)
ENGINE = INNODB
AUTO_INCREMENT = 9
AVG_ROW_LENGTH = 2048
CHARACTER SET utf8
COLLATE utf8_general_ci;

--
-- Definition for table odk_role
--
DROP TABLE IF EXISTS odk_role;
CREATE TABLE IF NOT EXISTS odk_role (
  id_role INT(11) NOT NULL AUTO_INCREMENT,
  role_name VARCHAR(50) NOT NULL,
  role_description TEXT DEFAULT NULL,
  is_active INT(1) NOT NULL DEFAULT 0,
  is_purchaseable INT(1) NOT NULL DEFAULT 0,
  amount DECIMAL(10, 2) DEFAULT 0.00,
  price DECIMAL(10, 2) DEFAULT 0.00,
  package_left INT(5) NOT NULL DEFAULT 0,
  period CHAR(1) NOT NULL DEFAULT 'D',
  is_builtin INT(11) NOT NULL DEFAULT 1,
  backcolor VARCHAR(24) DEFAULT NULL,
  forecolor VARCHAR(24) DEFAULT NULL,
  created_at TIMESTAMP NULL DEFAULT NULL,
  updated_at TIMESTAMP NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (id_role)
)
ENGINE = INNODB
AUTO_INCREMENT = 3
AVG_ROW_LENGTH = 8192
CHARACTER SET utf8
COLLATE utf8_general_ci;

--
-- Definition for table odk_users
--
DROP TABLE IF EXISTS odk_users;
CREATE TABLE IF NOT EXISTS odk_users (
  id_user INT(11) NOT NULL AUTO_INCREMENT,
  username VARCHAR(128) NOT NULL,
  user_mail VARCHAR(128) NOT NULL,
  passwd VARCHAR(128) NOT NULL,
  activation_code VARCHAR(40) DEFAULT NULL,
  is_builtin INT(11) DEFAULT 0,
  is_active INT(11) NOT NULL DEFAULT 0,
  expire_date DATETIME DEFAULT NULL,
  time_zone VARCHAR(64) DEFAULT NULL,
  last_login TIMESTAMP NULL DEFAULT '0000-00-00 00:00:00',
  remember_token VARCHAR(100) DEFAULT NULL,
  forgotten_password_code VARCHAR(40) DEFAULT NULL,
  forgotten_password_time INT(11) DEFAULT NULL,
  created_at TIMESTAMP NULL DEFAULT NULL,
  updated_at TIMESTAMP NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (id_user)
)
ENGINE = INNODB
AUTO_INCREMENT = 2
AVG_ROW_LENGTH = 16384
CHARACTER SET utf8
COLLATE utf8_general_ci;

--
-- Definition for table odk_menu_permission
--
DROP TABLE IF EXISTS odk_menu_permission;
CREATE TABLE IF NOT EXISTS odk_menu_permission (
  role_id INT(11) NOT NULL,
  menu_id INT(11) NOT NULL,
  is_checked VARCHAR(15) DEFAULT NULL,
  created_at TIMESTAMP NULL DEFAULT '0000-00-00 00:00:00',
  updated_at TIMESTAMP NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (role_id, menu_id),
  CONSTRAINT FK_odk_module_permission_odk_menu_id_module FOREIGN KEY (menu_id)
    REFERENCES odk_menu(id_menu) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT FK_odk_module_permission_odk_role_id_role FOREIGN KEY (role_id)
    REFERENCES odk_role(id_role) ON DELETE RESTRICT ON UPDATE RESTRICT
)
ENGINE = INNODB
AVG_ROW_LENGTH = 2340
CHARACTER SET utf8
COLLATE utf8_general_ci;

--
-- Definition for table odk_user_roles
--
DROP TABLE IF EXISTS odk_user_roles;
CREATE TABLE IF NOT EXISTS odk_user_roles (
  id_user_roles INT(11) NOT NULL AUTO_INCREMENT,
  user_id INT(11) NOT NULL,
  roles_id INT(11) NOT NULL,
  created_at TIMESTAMP NULL DEFAULT NULL,
  updated_at TIMESTAMP NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (id_user_roles),
  CONSTRAINT FK_odk_user_roles_odk_role_id_role FOREIGN KEY (roles_id)
    REFERENCES odk_role(id_role) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT FK_odk_user_roles_odk_user_id_user FOREIGN KEY (user_id)
    REFERENCES odk_users(id_user) ON DELETE RESTRICT ON UPDATE RESTRICT
)
ENGINE = INNODB
AUTO_INCREMENT = 2
AVG_ROW_LENGTH = 16384
CHARACTER SET utf8
COLLATE utf8_general_ci;

-- 
-- Dumping data for table odk_menu
--

/*!40000 ALTER TABLE odk_menu DISABLE KEYS */;
INSERT INTO odk_menu VALUES
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
-- Dumping data for table odk_role
--

/*!40000 ALTER TABLE odk_role DISABLE KEYS */;
INSERT INTO odk_role VALUES
(1, 'admin', 'Adalah Sebuah Role Yang', 1, 1, 10.20, 20.00, 7, 'M', 1, 'c32113', 'white', '2015-07-22 20:41:45', '0000-00-00 00:00:00'),
(2, 'member', 'Adalah Sebuah Role Yang', 1, 1, 10.00, 20.00, 7, 'M', 1, 'c32113', 'white', '2015-07-22 20:41:45', '0000-00-00 00:00:00');

/*!40000 ALTER TABLE odk_role ENABLE KEYS */;

-- 
-- Dumping data for table odk_users
--

/*!40000 ALTER TABLE odk_users DISABLE KEYS */;
INSERT INTO odk_users VALUES
(1, 'moeloet', 'moeloet@moeloet.com', '$2y$10$Gc1sKX9A6tQLMl0AwDxTGu5e6CyOXDEw87RGN7oAkJm7pbdZsQjNG', 'moeloet', 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, '2015-07-22 20:41:45', '2015-07-22 20:41:45');

/*!40000 ALTER TABLE odk_users ENABLE KEYS */;

-- 
-- Dumping data for table odk_menu_permission
--

/*!40000 ALTER TABLE odk_menu_permission DISABLE KEYS */;
INSERT INTO odk_menu_permission VALUES
(1, 1, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(1, 2, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(1, 3, 'checked', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(1, 4, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(1, 5, 'checked', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(1, 6, 'checked', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(1, 7, 'checked', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

/*!40000 ALTER TABLE odk_menu_permission ENABLE KEYS */;

-- 
-- Dumping data for table odk_user_roles
--

/*!40000 ALTER TABLE odk_user_roles DISABLE KEYS */;
INSERT INTO odk_user_roles VALUES
(1, 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

/*!40000 ALTER TABLE odk_user_roles ENABLE KEYS */;

-- 
-- Restore previous SQL mode
-- 
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;

-- 
-- Enable foreign keys
-- 
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;