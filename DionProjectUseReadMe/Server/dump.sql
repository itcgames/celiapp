-- MySQL dump 10.16  Distrib 10.2.12-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: desapi
-- ------------------------------------------------------
-- Server version	10.2.12-MariaDB

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
-- Table structure for table `challenges`
--

DROP TABLE IF EXISTS `challenges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `challenges` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `challenger` varchar(255) NOT NULL,
  `challenged` varchar(255) NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'Not Completed',
  `challengerScore` int(11) DEFAULT -1,
  `challengedScore` int(11) DEFAULT -1,
  `questions_ids` varchar(60) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `challenges`
--

LOCK TABLES `challenges` WRITE;
/*!40000 ALTER TABLE `challenges` DISABLE KEYS */;
INSERT INTO `challenges` VALUES (16,'testing','tester','Discarded',1310,-1,'1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,'),(17,'tester','tester','Discarded',650,-1,'1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,'),(18,'testing','tester','Discarded',660,1050,'1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,'),(19,'tester','testing','Discarded',300,-1,'13,7,11,12,16,10,8,6,15,9,4,3,5,14,1,2,'),(20,'tester','testing','Completed',530,860,'10,1,16,15,7,3,12,14,11,8,13,5,2,6,9,');
/*!40000 ALTER TABLE `challenges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `info`
--

DROP TABLE IF EXISTS `info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `info` (
  `id` int(11) NOT NULL,
  `title` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `info`
--

LOCK TABLES `info` WRITE;
/*!40000 ALTER TABLE `info` DISABLE KEYS */;
INSERT INTO `info` VALUES (1,'Getting Coeliac Disease'),(2,'Foods To Avoid'),(3,'Good Foods'),(4,'Symptoms'),(5,'Health'),(6,'Genetics'),(7,'Coeliac as a Disease'),(8,'Tips for Eating Out');
/*!40000 ALTER TABLE `info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `info_content`
--

DROP TABLE IF EXISTS `info_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `info_content` (
  `info_title_id` int(11) NOT NULL,
  `info_point` varchar(120) NOT NULL,
  PRIMARY KEY (`info_title_id`,`info_point`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `info_content`
--

LOCK TABLES `info_content` WRITE;
/*!40000 ALTER TABLE `info_content` DISABLE KEYS */;
INSERT INTO `info_content` VALUES (1,'A person can become intolerant to gluten at any age'),(1,'An intolerance to gluten can develop at any time'),(1,'Coeliac disease is incurable'),(1,'Coeliac disease often runs in families'),(1,'Research shows that coeliac disease is strongly associated with a number of genetic mutations'),(2,'Bread'),(2,'Cereal'),(2,'Most seasonings and spices'),(2,'Pasta'),(2,'Pizza'),(3,'Fruit and vegetables'),(3,'Gluten-free flours, including rice, corn, soy and potato'),(3,'Meat and fish (although not breaded or battered)'),(3,'Most dairy products, such as cheese, butter and milk'),(3,'Potatoes'),(3,'Rice and rice noodles'),(4,'Anaemia ( breathlessness and an irregular heartbeat, caused by a lack of iron in the blood)'),(4,'Bloating'),(4,'Indigestion'),(4,'Loss of appetite'),(4,'Mild abdominal (stomach) pain'),(4,'Occasional changes in bowel habit, such as episodes of mild diarrhoea or constipation'),(4,'Some loss of hair (alopecia, usually only affects adults)'),(4,'Tingling and numbness in your hands and feet (neuropathy)'),(4,'Vomiting (usually only affects children)'),(5,'A GIP test can determine if you have ingested gluten'),(5,'However, in coeliac disease, the damage and inflammation to the lining of your gut flattens the villi'),(5,'If you have coeliac disease, eating gluten results in damage to your intestines'),(5,'Never ingesting gluten is the only way to not experience the symptoms of Coeliac disease'),(5,'The surface of the gut lining is usually covered with millions of tiny tube-shaped growths called villi'),(5,'Villi increase the surface area of your gut and help it to digest food more effectively'),(5,'Which reduces their ability to help with digestion'),(5,'Women are 3 times more likely to develop Coeliac disease'),(6,'Coeliac disease is not contagious'),(6,'Coeliac disease often runs in families'),(6,'Genes are responsible for the development of the immune system, and may be passed down through a family'),(6,'If you have an identical twin with coeliac disease, there is an 85% chance that you will also develop the condition'),(6,'The risk of developing coeliac disease if you have a close relative with it is approximately 10%'),(7,' Coeliac disease is considered to be more prevalent in people with autoimmune conditions'),(7,'An autoimmune disease is a condition in which your immune system mistakenly attacks your body'),(7,'Coeliac disease is an auto-immune disease'),(7,'Other autoimmune diseases are type 1 diabetes and Rheumatoid arthritis'),(8,'Be very specific in your questions about each item'),(8,'Confirm your order before eating'),(8,'Have your food prepared on a clean cooking surface, with clean utensils'),(8,'Medic alert bracelets help give credibility to the seriousness of your diet restrictions'),(8,'Time your meal either before or after the busiest meal time'),(8,'You may need to ask extensive questions about the foods and preparation'),(8,'You will have more time and easier access to the people who can help you');
/*!40000 ALTER TABLE `info_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personalisedpoints`
--

DROP TABLE IF EXISTS `personalisedpoints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personalisedpoints` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personalisedpoints`
--

LOCK TABLES `personalisedpoints` WRITE;
/*!40000 ALTER TABLE `personalisedpoints` DISABLE KEYS */;
INSERT INTO `personalisedpoints` VALUES (2,'Tips for Eating Out,','tester'),(3,'Foods To Avoid,Tips for Eating Out,Symptoms,Health,Genetics,Coeliac as a Disease,','testing');
/*!40000 ALTER TABLE `personalisedpoints` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `userdata`
--

DROP TABLE IF EXISTS `userdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userdata` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `event` varchar(100) NOT NULL,
  `timestamp` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=449 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userdata`
--

LOCK TABLES `userdata` WRITE;
/*!40000 ALTER TABLE `userdata` DISABLE KEYS */;
INSERT INTO `userdata` VALUES (105,2,'Leave Home Page','2019-03-31 21:53:43'),(106,2,'Enter Social Hub','2019-03-31 21:53:43'),(107,2,'Leave Social Hub','2019-03-31 21:53:52'),(108,2,'Start Quiz','2019-03-31 21:53:52'),(109,2,'Leave Quiz','2019-03-31 21:54:16'),(110,2,'Enter Result Page','2019-03-31 21:54:16'),(111,2,'Leave Result Page','2019-03-31 21:54:25'),(112,2,'Enter Info Page ','2019-03-31 21:54:25'),(113,2,'Leave Info Page','2019-03-31 21:54:34'),(114,2,'Enter Personalised Page','2019-03-31 21:54:34'),(115,2,'Leave Personalised Page','2019-03-31 21:54:41'),(116,2,'Enter Home Page','2019-03-31 21:54:41'),(117,1,'Leave Home Page','2019-03-31 21:55:56'),(118,1,'Start Quiz','2019-03-31 21:55:56'),(119,1,'Leave Quiz','2019-03-31 21:56:04'),(120,1,'Enter Home Page','2019-03-31 21:56:04'),(121,1,'Leave Home Page','2019-03-31 21:56:23'),(122,1,'Start Quiz','2019-03-31 21:56:23'),(123,1,'Leave Quiz','2019-03-31 21:56:28'),(124,1,'Enter Home Page','2019-03-31 21:56:28'),(125,1,'Leave Home Page','2019-04-04 18:16:30'),(126,1,'Start Quiz','2019-04-04 18:16:30'),(127,1,'Finish question 0','2019-04-04 18:16:33'),(128,1,'Start question 1','2019-04-04 18:16:33'),(129,1,'Finish question 1','2019-04-04 18:16:37'),(130,1,'Start question 2','2019-04-04 18:16:37'),(131,1,'Finish question 2','2019-04-04 18:16:39'),(132,1,'Start question 3','2019-04-04 18:16:39'),(133,1,'Finish question 3','2019-04-04 18:16:40'),(134,1,'Start question 4','2019-04-04 18:16:40'),(135,1,'Finish question 4','2019-04-04 18:16:41'),(136,1,'Start question 5','2019-04-04 18:16:41'),(137,1,'Finish question 5','2019-04-04 18:16:43'),(138,1,'Start question 6','2019-04-04 18:16:43'),(139,1,'Finish question 6','2019-04-04 18:16:44'),(140,1,'Start question 7','2019-04-04 18:16:44'),(141,1,'Finish question 7','2019-04-04 18:16:45'),(142,1,'Start question 8','2019-04-04 18:16:45'),(143,1,'Finish question 8','2019-04-04 18:16:46'),(144,1,'Start question 9','2019-04-04 18:16:46'),(145,1,'Finish question 9','2019-04-04 18:16:48'),(146,1,'Start question 10','2019-04-04 18:16:48'),(147,1,'Finish question 10','2019-04-04 18:16:49'),(148,1,'Start question 11','2019-04-04 18:16:49'),(149,1,'Finish question 11','2019-04-04 18:16:51'),(150,1,'Start question 12','2019-04-04 18:16:51'),(151,1,'Finish question 12','2019-04-04 18:16:52'),(152,1,'Start question 13','2019-04-04 18:16:52'),(153,1,'Leave Quiz','2019-04-04 18:16:53'),(154,1,'Enter Home Page','2019-04-04 18:16:53'),(155,1,'Leave Home Page','2019-04-04 18:17:07'),(156,1,'Start Quiz','2019-04-04 18:17:07'),(157,1,'Finish question 0','2019-04-04 18:17:09'),(158,1,'Start question 1','2019-04-04 18:17:09'),(159,1,'Finish question 1','2019-04-04 18:17:10'),(160,1,'Start question 2','2019-04-04 18:17:10'),(161,1,'Finish question 2','2019-04-04 18:17:11'),(162,1,'Start question 3','2019-04-04 18:17:11'),(163,1,'Finish question 3','2019-04-04 18:17:12'),(164,1,'Start question 4','2019-04-04 18:17:12'),(165,1,'Finish question 4','2019-04-04 18:17:13'),(166,1,'Start question 5','2019-04-04 18:17:13'),(167,1,'Finish question 5','2019-04-04 18:17:15'),(168,1,'Start question 6','2019-04-04 18:17:15'),(169,1,'Finish question 6','2019-04-04 18:17:16'),(170,1,'Start question 7','2019-04-04 18:17:16'),(171,1,'Finish question 7','2019-04-04 18:17:17'),(172,1,'Start question 8','2019-04-04 18:17:17'),(173,1,'Finish question 8','2019-04-04 18:17:18'),(174,1,'Start question 9','2019-04-04 18:17:18'),(175,1,'Finish question 9','2019-04-04 18:17:19'),(176,1,'Start question 10','2019-04-04 18:17:19'),(177,1,'Finish question 10','2019-04-04 18:17:20'),(178,1,'Start question 11','2019-04-04 18:17:20'),(179,1,'Finish question 11','2019-04-04 18:17:21'),(180,1,'Start question 12','2019-04-04 18:17:21'),(181,1,'Finish question 12','2019-04-04 18:17:23'),(182,1,'Start question 13','2019-04-04 18:17:23'),(183,1,'Finish question 13','2019-04-04 18:17:24'),(184,1,'Start question 14','2019-04-04 18:17:24'),(185,1,'Leave Quiz','2019-04-04 18:17:25'),(186,1,'Enter Home Page','2019-04-04 18:17:25'),(187,1,'Leave Home Page','2019-04-04 18:17:26'),(188,1,'Start Quiz','2019-04-04 18:17:26'),(189,1,'Finish question 0','2019-04-04 18:17:28'),(190,1,'Start question 1','2019-04-04 18:17:28'),(191,1,'Finish question 1','2019-04-04 18:17:30'),(192,1,'Start question 2','2019-04-04 18:17:30'),(193,1,'Finish question 2','2019-04-04 18:17:31'),(194,1,'Start question 3','2019-04-04 18:17:31'),(195,1,'Finish question 3','2019-04-04 18:17:32'),(196,1,'Start question 4','2019-04-04 18:17:32'),(197,1,'Finish question 4','2019-04-04 18:17:33'),(198,1,'Start question 5','2019-04-04 18:17:33'),(199,1,'Finish question 5','2019-04-04 18:17:34'),(200,1,'Start question 6','2019-04-04 18:17:34'),(201,1,'Finish question 6','2019-04-04 18:17:35'),(202,1,'Start question 7','2019-04-04 18:17:35'),(203,1,'Finish question 7','2019-04-04 18:17:36'),(204,1,'Start question 8','2019-04-04 18:17:36'),(205,1,'Finish question 8','2019-04-04 18:17:37'),(206,1,'Start question 9','2019-04-04 18:17:37'),(207,1,'Finish question 9','2019-04-04 18:17:39'),(208,1,'Start question 10','2019-04-04 18:17:39'),(209,1,'Finish question 10','2019-04-04 18:17:40'),(210,1,'Start question 11','2019-04-04 18:17:40'),(211,1,'Leave Quiz','2019-04-04 18:17:40'),(212,1,'Enter Home Page','2019-04-04 18:17:40'),(213,1,'Leave Home Page','2019-04-04 18:17:41'),(214,1,'Start Quiz','2019-04-04 18:17:41'),(215,1,'Finish question 0','2019-04-04 18:17:43'),(216,1,'Start question 1','2019-04-04 18:17:43'),(217,1,'Finish question 1','2019-04-04 18:17:44'),(218,1,'Start question 2','2019-04-04 18:17:44'),(219,1,'Finish question 2','2019-04-04 18:17:45'),(220,1,'Start question 3','2019-04-04 18:17:45'),(221,1,'Finish question 3','2019-04-04 18:17:46'),(222,1,'Start question 4','2019-04-04 18:17:46'),(223,1,'Finish question 4','2019-04-04 18:17:47'),(224,1,'Start question 5','2019-04-04 18:17:47'),(225,1,'Finish question 5','2019-04-04 18:17:48'),(226,1,'Start question 6','2019-04-04 18:17:48'),(227,1,'Finish question 6','2019-04-04 18:17:49'),(228,1,'Start question 7','2019-04-04 18:17:49'),(229,1,'Finish question 7','2019-04-04 18:17:50'),(230,1,'Start question 8','2019-04-04 18:17:50'),(231,1,'Finish question 8','2019-04-04 18:17:51'),(232,1,'Start question 9','2019-04-04 18:17:51'),(233,1,'Finish question 9','2019-04-04 18:17:52'),(234,1,'Start question 10','2019-04-04 18:17:52'),(235,1,'Finish question 10','2019-04-04 18:17:54'),(236,1,'Start question 11','2019-04-04 18:17:54'),(237,1,'Finish question 11','2019-04-04 18:17:55'),(238,1,'Start question 12','2019-04-04 18:17:55'),(239,1,'Finish question 12','2019-04-04 18:17:56'),(240,1,'Start question 13','2019-04-04 18:17:56'),(241,1,'Finish question 13','2019-04-04 18:17:58'),(242,1,'Start question 14','2019-04-04 18:17:58'),(243,1,'Leave Quiz','2019-04-04 18:17:59'),(244,1,'Enter Home Page','2019-04-04 18:17:59'),(245,1,'Leave Home Page','2019-04-04 18:18:00'),(246,1,'Start Quiz','2019-04-04 18:18:00'),(247,1,'Finish question 0','2019-04-04 18:18:02'),(248,1,'Start question 1','2019-04-04 18:18:02'),(249,1,'Finish question 1','2019-04-04 18:18:03'),(250,1,'Start question 2','2019-04-04 18:18:03'),(251,1,'Finish question 2','2019-04-04 18:18:04'),(252,1,'Start question 3','2019-04-04 18:18:04'),(253,1,'Finish question 3','2019-04-04 18:18:05'),(254,1,'Start question 4','2019-04-04 18:18:05'),(255,1,'Finish question 4','2019-04-04 18:18:06'),(256,1,'Start question 5','2019-04-04 18:18:06'),(257,1,'Finish question 5','2019-04-04 18:18:06'),(258,1,'Start question 6','2019-04-04 18:18:06'),(259,1,'Finish question 6','2019-04-04 18:18:07'),(260,1,'Start question 7','2019-04-04 18:18:07'),(261,1,'Finish question 7','2019-04-04 18:18:09'),(262,1,'Start question 8','2019-04-04 18:18:09'),(263,1,'Finish question 8','2019-04-04 18:18:10'),(264,1,'Start question 9','2019-04-04 18:18:10'),(265,1,'Finish question 9','2019-04-04 18:18:11'),(266,1,'Start question 10','2019-04-04 18:18:11'),(267,1,'Finish question 10','2019-04-04 18:18:12'),(268,1,'Start question 11','2019-04-04 18:18:12'),(269,1,'Finish question 11','2019-04-04 18:18:13'),(270,1,'Start question 12','2019-04-04 18:18:13'),(271,1,'Finish question 12','2019-04-04 18:18:14'),(272,1,'Start question 13','2019-04-04 18:18:14'),(273,1,'Leave Quiz','2019-04-04 18:18:15'),(274,1,'Enter Home Page','2019-04-04 18:18:15'),(275,1,'Leave Home Page','2019-04-04 18:18:16'),(276,1,'Start Quiz','2019-04-04 18:18:16'),(277,1,'Finish question 0','2019-04-04 18:18:17'),(278,1,'Start question 1','2019-04-04 18:18:17'),(279,1,'Finish question 1','2019-04-04 18:18:18'),(280,1,'Start question 2','2019-04-04 18:18:18'),(281,1,'Finish question 2','2019-04-04 18:18:19'),(282,1,'Start question 3','2019-04-04 18:18:19'),(283,1,'Finish question 3','2019-04-04 18:18:20'),(284,1,'Start question 4','2019-04-04 18:18:20'),(285,1,'Finish question 4','2019-04-04 18:18:21'),(286,1,'Start question 5','2019-04-04 18:18:21'),(287,1,'Finish question 5','2019-04-04 18:18:22'),(288,1,'Start question 6','2019-04-04 18:18:22'),(289,1,'Finish question 6','2019-04-04 18:18:23'),(290,1,'Start question 7','2019-04-04 18:18:23'),(291,1,'Finish question 7','2019-04-04 18:18:24'),(292,1,'Start question 8','2019-04-04 18:18:24'),(293,1,'Finish question 8','2019-04-04 18:18:25'),(294,1,'Start question 9','2019-04-04 18:18:25'),(295,1,'Finish question 9','2019-04-04 18:18:26'),(296,1,'Start question 10','2019-04-04 18:18:26'),(297,1,'Finish question 10','2019-04-04 18:18:27'),(298,1,'Start question 11','2019-04-04 18:18:27'),(299,1,'Finish question 11','2019-04-04 18:18:28'),(300,1,'Start question 12','2019-04-04 18:18:28'),(301,1,'Finish question 12','2019-04-04 18:18:29'),(302,1,'Start question 13','2019-04-04 18:18:29'),(303,1,'Leave Quiz','2019-04-04 18:18:30'),(304,1,'Enter Home Page','2019-04-04 18:18:30'),(305,1,'Leave Home Page','2019-04-04 18:18:31'),(306,1,'Start Quiz','2019-04-04 18:18:31'),(307,1,'Finish question 0','2019-04-04 18:18:33'),(308,1,'Start question 1','2019-04-04 18:18:33'),(309,1,'Finish question 1','2019-04-04 18:18:34'),(310,1,'Start question 2','2019-04-04 18:18:34'),(311,1,'Finish question 2','2019-04-04 18:18:35'),(312,1,'Start question 3','2019-04-04 18:18:35'),(313,1,'Finish question 3','2019-04-04 18:18:36'),(314,1,'Start question 4','2019-04-04 18:18:36'),(315,1,'Finish question 4','2019-04-04 18:18:37'),(316,1,'Start question 5','2019-04-04 18:18:37'),(317,1,'Finish question 5','2019-04-04 18:18:38'),(318,1,'Start question 6','2019-04-04 18:18:38'),(319,1,'Leave Quiz','2019-04-04 18:18:39'),(320,1,'Enter Home Page','2019-04-04 18:18:39'),(321,1,'Leave Home Page','2019-04-04 18:18:40'),(322,1,'Start Quiz','2019-04-04 18:18:40'),(323,1,'Finish question 0','2019-04-04 18:18:41'),(324,1,'Start question 1','2019-04-04 18:18:41'),(325,1,'Finish question 1','2019-04-04 18:18:42'),(326,1,'Start question 2','2019-04-04 18:18:42'),(327,1,'Finish question 2','2019-04-04 18:18:43'),(328,1,'Start question 3','2019-04-04 18:18:43'),(329,1,'Finish question 3','2019-04-04 18:18:44'),(330,1,'Start question 4','2019-04-04 18:18:44'),(331,1,'Finish question 4','2019-04-04 18:18:45'),(332,1,'Start question 5','2019-04-04 18:18:45'),(333,1,'Leave Quiz','2019-04-04 18:18:46'),(334,1,'Enter Home Page','2019-04-04 18:18:46'),(335,1,'Leave Home Page','2019-04-04 18:18:46'),(336,1,'Start Quiz','2019-04-04 18:18:46'),(337,1,'Finish question 0','2019-04-04 18:18:48'),(338,1,'Start question 1','2019-04-04 18:18:48'),(339,1,'Finish question 1','2019-04-04 18:18:49'),(340,1,'Start question 2','2019-04-04 18:18:49'),(341,1,'Finish question 2','2019-04-04 18:18:50'),(342,1,'Start question 3','2019-04-04 18:18:50'),(343,1,'Finish question 3','2019-04-04 18:18:51'),(344,1,'Start question 4','2019-04-04 18:18:51'),(345,1,'Finish question 4','2019-04-04 18:18:52'),(346,1,'Start question 5','2019-04-04 18:18:52'),(347,1,'Leave Quiz','2019-04-04 18:18:53'),(348,1,'Enter Home Page','2019-04-04 18:18:53'),(349,1,'Leave Home Page','2019-04-04 18:18:53'),(350,1,'Start Quiz','2019-04-04 18:18:53'),(351,1,'Finish question 0','2019-04-04 18:18:56'),(352,1,'Start question 1','2019-04-04 18:18:56'),(353,1,'Finish question 1','2019-04-04 18:18:57'),(354,1,'Start question 2','2019-04-04 18:18:57'),(355,1,'Finish question 2','2019-04-04 18:18:57'),(356,1,'Start question 3','2019-04-04 18:18:57'),(357,1,'Finish question 3','2019-04-04 18:18:58'),(358,1,'Start question 4','2019-04-04 18:18:58'),(359,1,'Finish question 4','2019-04-04 18:18:59'),(360,1,'Start question 5','2019-04-04 18:18:59'),(361,1,'Leave Quiz','2019-04-04 18:19:00'),(362,1,'Enter Home Page','2019-04-04 18:19:00'),(363,1,'Leave Home Page','2019-04-04 18:19:01'),(364,1,'Start Quiz','2019-04-04 18:19:01'),(365,1,'Finish question 0','2019-04-04 18:19:02'),(366,1,'Start question 1','2019-04-04 18:19:02'),(367,1,'Finish question 1','2019-04-04 18:19:03'),(368,1,'Start question 2','2019-04-04 18:19:03'),(369,1,'Finish question 2','2019-04-04 18:19:04'),(370,1,'Start question 3','2019-04-04 18:19:04'),(371,1,'Finish question 3','2019-04-04 18:19:05'),(372,1,'Start question 4','2019-04-04 18:19:05'),(373,1,'Finish question 4','2019-04-04 18:19:06'),(374,1,'Start question 5','2019-04-04 18:19:06'),(375,1,'Finish question 5','2019-04-04 18:19:07'),(376,1,'Start question 6','2019-04-04 18:19:07'),(377,1,'Finish question 6','2019-04-04 18:19:08'),(378,1,'Start question 7','2019-04-04 18:19:08'),(379,1,'Leave Quiz','2019-04-04 18:19:09'),(380,1,'Enter Home Page','2019-04-04 18:19:09'),(381,1,'Leave Home Page','2019-04-04 18:19:10'),(382,1,'Start Quiz','2019-04-04 18:19:10'),(383,1,'Finish question 0','2019-04-04 18:19:11'),(384,1,'Start question 1','2019-04-04 18:19:11'),(385,1,'Finish question 1','2019-04-04 18:19:12'),(386,1,'Start question 2','2019-04-04 18:19:12'),(387,1,'Finish question 2','2019-04-04 18:19:13'),(388,1,'Start question 3','2019-04-04 18:19:13'),(389,1,'Finish question 3','2019-04-04 18:19:15'),(390,1,'Start question 4','2019-04-04 18:19:15'),(391,1,'Finish question 4','2019-04-04 18:19:16'),(392,1,'Start question 5','2019-04-04 18:19:16'),(393,1,'Leave Quiz','2019-04-04 18:19:17'),(394,1,'Enter Home Page','2019-04-04 18:19:17'),(395,1,'Leave Home Page','2019-04-04 18:19:17'),(396,1,'Start Quiz','2019-04-04 18:19:17'),(397,1,'Finish question 0','2019-04-04 18:19:19'),(398,1,'Start question 1','2019-04-04 18:19:19'),(399,1,'Finish question 1','2019-04-04 18:19:20'),(400,1,'Start question 2','2019-04-04 18:19:20'),(401,1,'Finish question 2','2019-04-04 18:19:21'),(402,1,'Start question 3','2019-04-04 18:19:21'),(403,1,'Finish question 3','2019-04-04 18:19:21'),(404,1,'Start question 4','2019-04-04 18:19:21'),(405,1,'Finish question 4','2019-04-04 18:19:22'),(406,1,'Start question 5','2019-04-04 18:19:22'),(407,1,'Leave Quiz','2019-04-04 18:19:23'),(408,1,'Enter Home Page','2019-04-04 18:19:23'),(409,1,'Leave Home Page','2019-04-06 14:44:03'),(410,1,'Enter Info Page ','2019-04-06 14:44:03'),(411,1,'Leave Info Page','2019-04-06 14:44:06'),(412,1,'Enter Personalised Page','2019-04-06 14:44:06'),(413,1,'Leave Home Page','2019-04-06 14:44:25'),(414,1,'Enter Info Page ','2019-04-06 14:44:25'),(415,1,'Leave Info Page','2019-04-06 14:44:26'),(416,1,'Enter Personalised Page','2019-04-06 14:44:26'),(417,1,'Leave Personalised Page','2019-04-06 14:44:33'),(418,1,'Enter Home Page','2019-04-06 14:44:33'),(419,1,'Leave Home Page','2019-04-06 14:44:34'),(420,1,'Start Quiz','2019-04-06 14:44:34'),(421,1,'Finish question 0','2019-04-06 14:44:38'),(422,1,'Start question 1','2019-04-06 14:44:38'),(423,1,'Finish question 1','2019-04-06 14:44:40'),(424,1,'Start question 2','2019-04-06 14:44:40'),(425,1,'Finish question 2','2019-04-06 14:44:42'),(426,1,'Start question 3','2019-04-06 14:44:42'),(427,1,'Finish question 3','2019-04-06 14:44:44'),(428,1,'Start question 4','2019-04-06 14:44:44'),(429,1,'Finish question 4','2019-04-06 14:44:46'),(430,1,'Start question 5','2019-04-06 14:44:46'),(431,1,'Finish question 5','2019-04-06 14:44:49'),(432,1,'Start question 6','2019-04-06 14:44:49'),(433,1,'Finish question 6','2019-04-06 14:44:51'),(434,1,'Start question 7','2019-04-06 14:44:51'),(435,1,'Finish question 7','2019-04-06 14:44:55'),(436,1,'Start question 8','2019-04-06 14:44:55'),(437,1,'Leave Quiz','2019-04-06 14:44:56'),(438,1,'Enter Home Page','2019-04-06 14:44:56'),(439,1,'Leave Home Page','2019-04-06 14:44:57'),(440,1,'Enter Info Page ','2019-04-06 14:44:57'),(441,1,'Leave Info Page','2019-04-06 14:44:58'),(442,1,'Enter Personalised Page','2019-04-06 14:44:58'),(443,1,'Leave Personalised Page','2019-04-06 14:45:00'),(444,1,'Enter Home Page','2019-04-06 14:45:00'),(445,1,'Leave Home Page','2019-04-06 14:45:06'),(446,1,'Enter Info Page ','2019-04-06 14:45:06'),(447,1,'Leave Info Page','2019-04-06 14:45:07'),(448,1,'Enter Personalised Page','2019-04-06 14:45:07');
/*!40000 ALTER TABLE `userdata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `username` varchar(255) NOT NULL,
  `highscore` int(11) DEFAULT 0,
  `password` varchar(255) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('tester',1050,'$pbkdf2-sha256$29000$U.qdUwrh3DuHcG6tdW7t/Q$Sf3JUO55mh.L48Hq19ka7o2P2mQqRe84V6HoA0Pm1sU',1),('testing',1310,'$pbkdf2-sha256$29000$mfPeG8M4Z.xdC2FszZkTIg$tMAxFaUo7SV6/Nc7DrbaiO0Aal6QL6kPYK1jDVvj1eo',2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-06 18:36:15
