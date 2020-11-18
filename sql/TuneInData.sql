-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: tunein
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `albums`
--

DROP TABLE IF EXISTS `albums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `albums` (
  `id` int NOT NULL AUTO_INCREMENT,
  `artist_id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `cover_image` text,
  `created_at` date DEFAULT NULL,
  `upload_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `artist_id` (`artist_id`),
  CONSTRAINT `albums_ibfk_1` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `albums`
--


/*!40000 ALTER TABLE `albums` DISABLE KEYS */;
INSERT INTO `albums` VALUES (1,2,'Viva la Vida or Death and All His Friends','https://upload.wikimedia.org/wikipedia/he/8/8f/Viva_la_Vida.jpg','2008-06-12','2020-09-10 15:58:10'),(2,2,'Parachutes','https://upload.wikimedia.org/wikipedia/en/5/57/Coldplayparachutesalbumcover.jpg','2000-07-10','2020-09-17 17:52:24'),(3,5,'American Idiot','https://i.pinimg.com/originals/88/03/d7/8803d7ec675006ca7c23d244b7ff0104.jpg',NULL,'2020-09-20 09:57:41');
/*!40000 ALTER TABLE `albums` ENABLE KEYS */;


--
-- Table structure for table `artists`
--

DROP TABLE IF EXISTS `artists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `cover_image` text,
  `upload_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artists`
--


/*!40000 ALTER TABLE `artists` DISABLE KEYS */;
INSERT INTO `artists` VALUES (2,'Coldplay','https://scontent.ftlv16-1.fna.fbcdn.net/v/t1.0-9/83747965_10163726359590253_4210307239827275554_o.jpg?_nc_cat=1&_nc_sid=09cbfe&_nc_ohc=l1d31fadLQ4AX8zySkc&_nc_ht=scontent.ftlv16-1.fna&oh=49c627339a8b3cbe97cbf8b2bc705948&oe=5F864CF5','2020-09-10 15:53:26'),(5,'Green Day','https://i.scdn.co/image/41778f8778469286e6aa9ef751cdc8e942bc0a6f','2020-09-19 18:48:40');
/*!40000 ALTER TABLE `artists` ENABLE KEYS */;


--
-- Table structure for table `playlists`
--

DROP TABLE IF EXISTS `playlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `cover_image` text,
  `created_at` datetime DEFAULT NULL,
  `upload_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlists`
--


/*!40000 ALTER TABLE `playlists` DISABLE KEYS */;
INSERT INTO `playlists` VALUES (4,'Awsome Playlist','https://images.squarespace-cdn.com/content/v1/506910b184ae5a723be4b21f/1573925737956-DQSF64PJB8HMF4G9QODU/ke17ZwdGBToddI8pDm48kMihdU5KGx3DkgYPKQ4aMw8UqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKch5REcN7JvqiccXzcaoKAyzJ-iOCnr2sCJG4JqmGY7jKoMMNJJ4Pp7ZuWCUShgF7o/awesome-Rect-1024x781.jpg',NULL,'2020-09-21 18:19:09');
/*!40000 ALTER TABLE `playlists` ENABLE KEYS */;


--
-- Table structure for table `songs`
--

DROP TABLE IF EXISTS `songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `songs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `artist_id` int DEFAULT NULL,
  `album_id` int DEFAULT NULL,
  `track_number` int DEFAULT NULL,
  `lyrics` text,
  `length` time DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `upload_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `youtube_link` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `artist_id` (`artist_id`),
  KEY `album_id` (`album_id`),
  CONSTRAINT `songs_ibfk_1` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`),
  CONSTRAINT `songs_ibfk_2` FOREIGN KEY (`album_id`) REFERENCES `albums` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `songs`
--


/*!40000 ALTER TABLE `songs` DISABLE KEYS */;
INSERT INTO `songs` VALUES (1,'Life in Technicolor',2,1,1,NULL,'00:02:29',NULL,'2020-09-10 16:00:59','https://www.youtube.com/watch?v=sPD59NTahc0'),(2,'Cemeteries of London',2,1,2,NULL,'00:03:21',NULL,'2020-09-10 16:00:59','https://www.youtube.com/watch?v=v6gxuxw69z0'),(3,'Lost!',2,1,3,NULL,'00:03:55',NULL,'2020-09-10 16:00:59','https://www.youtube.com/watch?v=B5KjwuD3hEg'),(4,'42',2,1,4,NULL,'00:03:57',NULL,'2020-09-10 16:00:59','https://www.youtube.com/watch?v=ez6eauLcOuc'),(5,'Lovers in Japan / Reign of Love (3:57/2:56)',2,1,5,NULL,'00:06:53',NULL,'2020-09-10 16:00:59','https://www.youtube.com/watch?v=A3hiqF3goTU'),(6,'Yes (Chinese Sleep Chant)',2,1,6,NULL,'00:07:06',NULL,'2020-09-10 16:00:59','https://www.youtube.com/watch?v=V4qdbGcFBxw'),(7,'Viva la Vida',2,1,7,NULL,'00:04:01',NULL,'2020-09-10 16:00:59','https://www.youtube.com/watch?v=3a-q7vPa-UU'),(8,'Violet Hill',2,1,8,NULL,'00:03:42',NULL,'2020-09-10 16:00:59','https://www.youtube.com/watch?v=IakDItZ7f7Q'),(9,'Strawberry Swing',2,1,9,NULL,'00:04:09',NULL,'2020-09-10 16:00:59','https://www.youtube.com/watch?v=0hnwIedsoNI'),(10,'Death and All His Friends (The Escapist)',2,1,10,NULL,'00:06:18',NULL,'2020-09-10 16:00:59','https://www.youtube.com/watch?v=QvoM6TK8O6w'),(12,'Don\'t Panic',2,2,1,NULL,'00:02:17',NULL,'2020-09-17 18:10:36','8uxt-FnNy2I'),(13,'Yellow',2,2,5,NULL,'00:04:32',NULL,'2020-09-19 18:13:39','https://www.youtube.com/watch?v=yKNxeF4KMsY'),(16,'American Idiot',5,3,1,NULL,'00:02:54',NULL,'2020-09-20 10:01:58','h6Z5N0Z6zH0'),(17,'Jesus of Suburbia 1',5,3,2,NULL,'00:09:08',NULL,'2020-09-20 10:03:25','JMcNzjzw63I'),(18,'Holiday',5,3,3,NULL,'00:03:54',NULL,'2020-09-20 10:04:12','l2hA8g1cNvQ'),(19,'Boulevard of Broken Dreams',5,3,4,NULL,'00:04:20',NULL,'2020-09-20 10:05:12','Dx1SPxGn-iU'),(20,'Are We the Waiting',5,3,5,NULL,'00:02:42',NULL,'2020-09-20 10:06:14','6HXa2gVj4mg'),(21,'St. Jimmy',5,3,6,NULL,'00:02:55',NULL,'2020-09-20 10:07:10','jRu0O1J3Y4s'),(22,'Give Me Novacaine',5,3,7,NULL,'00:03:25',NULL,'2020-09-20 10:07:55','ZKAwIwjHwZI'),(23,'Shes A Rebel',5,3,8,NULL,'00:02:01',NULL,'2020-09-20 10:09:10','eOv5fF7maFY'),(24,'Extraordinary Girl',5,3,9,NULL,'00:03:35',NULL,'2020-09-20 10:10:01','hctq2W1z7Kc'),(25,'Letterbomb',5,3,10,NULL,'00:04:07',NULL,'2020-09-20 10:10:46','1fi-MLyBfB0'),(26,'Wake Me Up When September Ends',5,3,11,NULL,'00:04:45',NULL,'2020-09-20 10:12:23','ulRXvH8VOl8'),(27,'Homecoming',5,3,12,NULL,'00:09:18',NULL,'2020-09-20 10:13:18','58hUq7hnueQ'),(28,'Whatsername',5,3,13,NULL,'00:04:12',NULL,'2020-09-20 10:14:06','Z2LC1xrdOaM');
/*!40000 ALTER TABLE `songs` ENABLE KEYS */;

--
-- Table structure for table `songs_in_playlist`
--

DROP TABLE IF EXISTS `songs_in_playlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `songs_in_playlist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `song_id` int DEFAULT NULL,
  `playlist_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `song_id` (`song_id`),
  KEY `playlist_id` (`playlist_id`),
  CONSTRAINT `songs_in_playlist_ibfk_1` FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`),
  CONSTRAINT `songs_in_playlist_ibfk_2` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `songs_in_playlist`
--


/*!40000 ALTER TABLE `songs_in_playlist` DISABLE KEYS */;
INSERT INTO `songs_in_playlist` VALUES (2,1,4),(3,12,4),(4,8,4),(5,17,4),(6,7,4);
/*!40000 ALTER TABLE `songs_in_playlist` ENABLE KEYS */;


--
-- Table structure for table `user_song_interaction`
--

DROP TABLE IF EXISTS `user_song_interaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_song_interaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `song_id` int DEFAULT NULL,
  `is_liked` tinyint(1) DEFAULT '0',
  `play_count` int DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `playlist_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `playlist_id` (`playlist_id`),
  KEY `song_id` (`song_id`),
  CONSTRAINT `user_song_interaction_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `user_song_interaction_ibfk_2` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`id`),
  CONSTRAINT `user_song_interaction_ibfk_3` FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_song_interaction`
--


/*!40000 ALTER TABLE `user_song_interaction` DISABLE KEYS */;
INSERT INTO `user_song_interaction` VALUES (3,1,1,0,13,'2020-09-20 17:06:36',NULL),(5,1,2,1,6,'2020-09-20 17:14:40',NULL),(6,1,8,1,1,'2020-09-20 17:15:45',NULL),(7,1,17,1,4,'2020-09-20 17:46:21',NULL),(8,1,18,1,1,'2020-09-20 17:47:44',NULL),(9,1,13,1,1,'2020-09-20 17:54:12',NULL),(10,1,9,1,0,'2020-09-20 17:59:52',NULL),(11,1,10,1,0,'2020-09-20 18:11:55',NULL),(12,1,12,1,5,'2020-09-20 18:18:44',NULL),(13,1,4,0,0,'2020-09-20 18:28:46',NULL),(14,1,3,0,3,'2020-09-20 18:53:05',NULL);
/*!40000 ALTER TABLE `user_song_interaction` ENABLE KEYS */;


--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `upload_at` datetime DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT '0',
  `prefernces` json DEFAULT NULL,
  `remember_token` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--


/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'gilad','$2b$10$TSnT6RKpWhZlo46k2RzdEOPc2nGUpJjok6uDEvXOL.t7HlI2SVkQC','giladov@gmail.com','2020-09-20 14:02:50',NULL,1,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;


--
-- Table structure for table `users_playlist`
--

DROP TABLE IF EXISTS `users_playlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_playlist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `playlist_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `playlist_id` (`playlist_id`),
  CONSTRAINT `users_playlist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `users_playlist_ibfk_2` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_playlist`
--


/*!40000 ALTER TABLE `users_playlist` DISABLE KEYS */;
INSERT INTO `users_playlist` VALUES (2,1,4);
/*!40000 ALTER TABLE `users_playlist` ENABLE KEYS */;

--
-- Dumping events for database 'tunein'
--

--
-- Dumping routines for database 'tunein'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-21 20:54:55
