CREATE DATABASE IF NOT EXISTS `car_rental`;

-- USE `car_rental`;

CREATE TABLE IF NOT EXISTS `vehicle` (
  `id` int NOT NULL AUTO_INCREMENT,
  `brand` varchar(30) NOT NULL,
  `model` varchar(40) NOT NULL,
  `chassis` varchar(30) NOT NULL,
  `year` int NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `customer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `phone` varchar(40) NOT NULL,
  `docNumber` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
);