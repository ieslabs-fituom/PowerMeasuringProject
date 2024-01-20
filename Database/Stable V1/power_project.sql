-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3308
-- Generation Time: Dec 21, 2023 at 05:48 PM
-- Server version: 8.0.27
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
drop database if exists power_project;
create database power_project;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `power_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `device`
--

DROP TABLE IF EXISTS `device`;
CREATE TABLE IF NOT EXISTS `device` (
  `device_id` int NOT NULL AUTO_INCREMENT,
  `device_name` varchar(45) DEFAULT NULL,
  `device_type` int DEFAULT NULL,
  `device_location` int DEFAULT NULL,
  `device_threshold` double DEFAULT NULL,
  `device_mac` varchar(20) NOT NULL,
  `user` int NOT NULL,
  PRIMARY KEY (`device_id`),
  KEY `location-fk_idx` (`device_location`),
  KEY `device-fk_idx` (`device_type`),
  KEY `user-fk_idx` (`user`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `device`
--

INSERT INTO `device` (`device_id`, `device_name`, `device_type`, `device_location`, `device_threshold`, `device_mac`, `user`) VALUES
(4, 'ECG11-ICU1', 1, 2, 10, '03-B3-D3-63-C3-23', 1),
(5, 'ECG1-THT1', 1, 1, 5, '00-B0-D0-63-C2-26', 1),
(6, 'LIGHT1-THT1', 5, 1, 3, '00-B0-D0-63-C2-26', 1),
(11, 'TEST-ECG-THT1', 1, 1, 5, '00-B0-D0-63-C2-26', 1);

-- --------------------------------------------------------

--
-- Table structure for table `device_type`
--

DROP TABLE IF EXISTS `device_type`;
CREATE TABLE IF NOT EXISTS `device_type` (
  `type_id` int NOT NULL AUTO_INCREMENT,
  `type_name` varchar(45) DEFAULT NULL,
  `user` int NOT NULL,
  PRIMARY KEY (`type_id`),
  KEY `use-fk_idx` (`user`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `device_type`
--

INSERT INTO `device_type` (`type_id`, `type_name`, `user`) VALUES
(1, 'ECG', 1),
(2, 'MRI', 1),
(3, 'CT SCANNER', 1),
(4, 'VENTILATOR', 2),
(5, 'LIGHT', 1),
(7, 'VENTILATOR', 1);

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
CREATE TABLE IF NOT EXISTS `location` (
  `location_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `location_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`location_id`),
  KEY `user-pk_idx` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`location_id`, `user_id`, `location_name`) VALUES
(1, 1, 'THEATRE 1'),
(2, 1, 'ICU 1'),
(4, 1, 'THEATRE 2');

-- --------------------------------------------------------

--
-- Table structure for table `records`
--

DROP TABLE IF EXISTS `records`;
CREATE TABLE IF NOT EXISTS `records` (
  `record_id` int NOT NULL AUTO_INCREMENT,
  `device_id` int DEFAULT NULL,
  `record_timestamp` datetime DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  PRIMARY KEY (`record_id`),
  KEY `records-pk_idx` (`device_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `records`
--

INSERT INTO `records` (`record_id`, `device_id`, `record_timestamp`, `start_time`, `end_time`) VALUES
(1, 4, '2023-11-02 18:00:00', '2023-11-02 15:00:00', '2023-11-02 18:00:00'),
(2, 4, '2023-11-10 19:10:00', '2023-11-10 18:15:00', '2023-11-10 19:10:00'),
(3, 4, '2023-11-11 14:20:00', '2023-11-11 12:00:00', '2023-11-11 14:20:00'),
(4, 4, '2023-11-13 11:35:00', '2023-11-13 09:10:00', '2023-11-13 11:35:00'),
(5, 4, '2023-11-13 19:10:00', '2023-11-13 17:10:00', '2023-11-13 19:10:00'),
(6, 4, '2023-11-19 13:30:00', '2023-11-19 13:00:00', '2023-11-19 13:30:00'),
(7, 4, '2023-11-19 19:00:00', '2023-11-19 15:00:00', '2023-11-19 19:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(30) NOT NULL,
  `hospital_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `email`, `hospital_name`) VALUES
(1, 'd@d.com', 'DURDANS HOSPITAL COLOMBO'),
(2, 'dg@d.com', 'DURDANS HOSPITAL GALLE');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `device`
--
ALTER TABLE `device`
  ADD CONSTRAINT `device-fk` FOREIGN KEY (`device_type`) REFERENCES `device_type` (`type_id`),
  ADD CONSTRAINT `location-fk` FOREIGN KEY (`device_location`) REFERENCES `location` (`location_id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `user_id-fk` FOREIGN KEY (`user`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `device_type`
--
ALTER TABLE `device_type`
  ADD CONSTRAINT `use-fk` FOREIGN KEY (`user`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `location`
--
ALTER TABLE `location`
  ADD CONSTRAINT `user-fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `records`
--
ALTER TABLE `records`
  ADD CONSTRAINT `records-pk` FOREIGN KEY (`device_id`) REFERENCES `device` (`device_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
