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
-- Table structure for table creator
--

DROP TABLE IF EXISTS creator;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE creator (
  creatorID int(11) NOT NULL,
  -- password text(255)questionnaire NOT NULL,
  PRIMARY KEY (creatorID)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table participants
--

DROP TABLE IF EXISTS participants;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE participants (
  participant_id int(11) NOT NULL,
  participant_name varchar(255) NOT NULL,
  PRIMARY KEY (participant_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;



--
-- Table structure for table questionnaire
--

DROP TABLE IF EXISTS questionnaire;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE questionnaire (
  questionnaireID int(11) NOT NULL auto_increment,
  questionnaireTitle text(255) NOT NULL,
  creatorID int(10) DEFAULT NULL,
  PRIMARY KEY (questionnaireID),
  KEY creatorID (creatorID),
  CONSTRAINT questionnaire_ibfk_1 FOREIGN KEY (creatorID) REFERENCES creator (creatorID) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;



--
-- Table structure for table questionnaireparticipant
--

DROP TABLE IF EXISTS questionnaireparticipant;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE questionnaireparticipant (
  questionnaireParticipantID int(11) NOT NULL,
  questionnaireID int(11) DEFAULT NULL,
  participant_id int(11) DEFAULT NULL,
  PRIMARY KEY (questionnaireParticipantID),
  KEY questionnaireID (questionnaireID),
  KEY participant_id (participant_id),
  CONSTRAINT questionnaireparticipant_ibfk_1 FOREIGN KEY (participant_id) REFERENCES participants (participant_id) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT questionnaireparticipant_ibfk_2 FOREIGN KEY (questionnaireID) REFERENCES questionnaire (questionnaireID) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table questions
--

DROP TABLE IF EXISTS questions;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE questions (
  qID int(11) NOT NULL,
  questionnaireID int(11) DEFAULT NULL,
  qtext text(255) NOT NULL,
  type text(255) NOT NULL,
  required bool NOT NULL,
  PRIMARY KEY (qID),
  KEY questionnaireID (questionnaireID),
  CONSTRAINT questions_ibfk_1 FOREIGN KEY (questionnaireID) REFERENCES questionnaire (questionnaireID) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table options
--


DROP TABLE IF EXISTS options;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE options (
  optID int(11) NOT NULL,
  qID int(11) DEFAULT NULL,
  participant_id int(11) DEFAULT NULL,
  questionnaireID int(11) DEFAULT NULL,
  nextqID int(11) NOT NULL,
  opttxt text(255) NOT NULL,
  PRIMARY KEY (optID),
  KEY questionnaireID (questionnaireID),
  KEY qID (qID),
  KEY participant_id (participant_id),
  CONSTRAINT options_ibfk_1 FOREIGN KEY (participant_id) REFERENCES participants (participant_id) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT options_ibfk_2 FOREIGN KEY (qID) REFERENCES questions (qID) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT options_ibfk3 FOREIGN KEY (questionnaireID) REFERENCES questionnaire (questionnaireID) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS answers;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE answers (
  ans_id int(11) NOT NULL AUTO_INCREMENT,
  session varchar(4) NOT NULL,
  qID int(11) DEFAULT NULL,
  optID int(11) DEFAULT NULL,
  questionnaireID int(11) DEFAULT NULL,
  PRIMARY KEY (ans_id),
  KEY questionnaireID (questionnaireID),
  KEY qID (qID),
  KEY optID (optID),
  CONSTRAINT answers_ibfk_1 FOREIGN KEY (qID) REFERENCES questions (qID) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT answers_ibfk_2 FOREIGN KEY (questionnaireID) REFERENCES questionnaire (questionnaireID) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT answers_ibfk_3 FOREIGN KEY (optID) REFERENCES options (optID) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT = 51 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS participantsAnswers;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE participantsAnswers (
  pA_id int(11) NOT NULL,
  participant_id int(11) DEFAULT NULL,
  ans_id int(11) DEFAULT NULL,
  PRIMARY KEY (pA_id),
  KEY participant_id (participant_id),
  KEY ans_id (ans_id),
  CONSTRAINT participantsAnswers_ibfk_1 FOREIGN KEY (participant_id) REFERENCES participants (participant_id) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT participantsAnswers_ibfk_2 FOREIGN KEY (ans_id) REFERENCES answers (ans_id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;



/*!40101 SET character_set_client = @saved_cs_client */;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;