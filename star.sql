-- MySQL dump 10.14  Distrib 5.5.50-MariaDB, for Linux (x86_64)
--
-- Host: localhost   Database: star
-- ------------------------------------------------------
-- Server version	5.1.44-community

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `star`
--

DROP TABLE IF EXISTS `star`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `star` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `TYPE` enum('education','media','science','staff','other') DEFAULT NULL,
  `dateStart` date DEFAULT NULL,
  `dateEnd` date DEFAULT NULL,
  `TIME` varchar(9) DEFAULT NULL,
  `dateFlexible` enum('yes','no') DEFAULT NULL,
  `pocName` varchar(60) DEFAULT NULL,
  `pocEmail` varchar(60) DEFAULT NULL,
  `pocMobile` varchar(30) DEFAULT NULL,
  `organizationName` varchar(100) DEFAULT NULL,
  `organizationDetails` text,
  `otherInformation` text,
  `STATUS` enum('0','1','2','3','4','5') DEFAULT NULL,
  `notifyPOC` enum('0','1') DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `pocEmail` (`pocEmail`,`dateStart`,`TYPE`,`organizationName`)
) ENGINE=MyISAM AUTO_INCREMENT=322 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `starComments`
--

DROP TABLE IF EXISTS `starComments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `starComments` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `SID` int(10) unsigned NOT NULL,
  `CN` varchar(20) DEFAULT NULL,
  `NAME` varchar(100) DEFAULT NULL,
  `COMMENTS` longtext,
  `DATE` date DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `SID` (`SID`)
) ENGINE=MyISAM AUTO_INCREMENT=833 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `starMember`
--

DROP TABLE IF EXISTS `starMember`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `starMember` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `SID` int(10) unsigned NOT NULL,
  `NAME` varchar(60) DEFAULT NULL,
  `AGE` enum('1','2') DEFAULT NULL,
  `DISABILITY` tinytext,
  PRIMARY KEY (`ID`),
  KEY `SID` (`SID`)
) ENGINE=MyISAM AUTO_INCREMENT=1147 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `starSig`
--

DROP TABLE IF EXISTS `starSig`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `starSig` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `SID` int(10) unsigned NOT NULL,
  `GUID` varchar(50) NOT NULL,
  `STATUS` enum('0','1') DEFAULT NULL,
  `DEPT` enum('PIO','Science','EngOps') DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `SID` (`SID`,`GUID`),
  KEY `SID_2` (`SID`)
) ENGINE=MyISAM AUTO_INCREMENT=708 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `starTour`
--

DROP TABLE IF EXISTS `starTour`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `starTour` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `SID` int(10) unsigned NOT NULL,
  `tourDate` date DEFAULT NULL,
  `tourSize` varchar(50) DEFAULT NULL,
  `numMinors` varchar(50) DEFAULT NULL,
  `briefInstructor` varchar(50) DEFAULT NULL,
  `briefLocation` varchar(50) DEFAULT NULL,
  `briefTime` varchar(50) DEFAULT NULL,
  `tourTime` varchar(50) DEFAULT NULL,
  `tourGuide` varchar(50) DEFAULT NULL,
  `signedForms` enum('0','1') DEFAULT NULL,
  `MEALS` enum('0','1') DEFAULT NULL,
  `LODGING` enum('0','1') DEFAULT NULL,
  `TRANSPORTATION` enum('0','1') DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `SID_2` (`SID`),
  KEY `SID` (`SID`)
) ENGINE=MyISAM AUTO_INCREMENT=313 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
