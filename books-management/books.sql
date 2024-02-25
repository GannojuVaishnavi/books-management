DROP TABLE IF EXISTS `bookslist`;


CREATE TABLE `bookslist` (
  `id` int NOT NULL ,
  `title` varchar(20) NOT NULL,
  `author` varchar(20) NOT NULL,
  `genre` varchar(20) NOT NULL,
   `publication_year` int NOT NULL,
  PRIMARY KEY (`id`)
) 
-- ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `bookslist` WRITE;
INSERT INTO `bookslist` VALUES (1,'The Night Circus',"Erin Morgenstern",'Romance',"2011"),(2,'The Great Gatsby',"F. Scott Fitzgerald",'Classic',"1925");
UNLOCK TABLES;