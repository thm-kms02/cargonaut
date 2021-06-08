-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 08. Jun 2021 um 16:52
-- Server-Version: 10.4.18-MariaDB
-- PHP-Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `cargo`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `anzeige`
--

CREATE TABLE `anzeige` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `ang_ges` tinyint(1) NOT NULL,
  `datum` date NOT NULL,
  `preis` int(11) NOT NULL,
  `start` varchar(255) NOT NULL,
  `ziel` varchar(255) NOT NULL,
  `beschreibung` varchar(255) NOT NULL,
  `id_fahrzeug` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `anzeige`
--

INSERT INTO `anzeige` (`id`, `user_id`, `ang_ges`, `datum`, `preis`, `start`, `ziel`, `beschreibung`, `id_fahrzeug`) VALUES
(96, 1, 1, '2021-06-23', 300, 'Gießen', 'Hamburg', 'TestTestTestTest', 10),
(97, 1, 1, '2021-06-23', 300, 'Gießen', 'Hamburg', 'TestTestTestTest', 10),
(98, 1, 1, '2021-06-23', 300, 'Gießen', 'Hamburg', 'TestTestTestTest', 10),
(99, 1, 1, '2021-06-23', 300, 'Gießen', 'Hamburg', 'TestTestTestTest', 10),
(100, 1, 1, '2021-06-23', 300, 'Gießen', 'Hamburg', 'TestTestTestTest', 10),
(101, 1, 1, '2021-06-23', 300, 'Gießen', 'Hamburg', 'TestTestTestTest', 10),
(102, 1, 1, '2021-06-23', 300, 'Gießen', 'Hamburg', 'TestTestTestTest', 10),
(103, 1, 1, '2021-06-23', 300, 'Gießen', 'Hamburg', 'TestTestTestTest', 10),
(104, 1, 1, '2021-06-23', 300, 'Gießen', 'Hamburg', 'TestTestTestTest', 10),
(105, 1, 1, '2021-06-23', 300, 'Gießen', 'Hamburg', 'TestTestTestTest', 10),
(106, 1, 1, '2021-06-23', 300, 'Gießen', 'Hamburg', 'TestTestTestTest', 10),
(107, 1, 1, '2021-06-23', 300, 'Gießen', 'Hamburg', 'TestTestTestTest', 10),
(108, 1, 0, '2021-06-23', 300, 'Gießen', 'Hamburg', 'TestTestTestTest', 10),
(109, 1, 0, '2021-06-23', 300, 'Gießen', 'Hamburg', 'TestTestTestTest', 10),
(110, 1, 0, '2021-06-23', 300, 'Gießen', 'Hamburg', 'TestTestTestTest', 10),
(111, 1, 0, '2021-06-23', 300, 'Gießen', 'Hamburg', 'TestTestTestTest', 10),
(112, 1, 1, '2021-06-23', 300, 'Kassel', 'Nürnberg', 'Final test', 15),
(113, 1, 1, '2021-06-23', 300, 'Kassel', 'Nürnberg', 'Final test', 15),
(114, 1, 1, '2021-06-26', 2000, 'Berghausen', 'Ludwigshafen', 'Beratigung', 12),
(115, 1, 1, '2021-06-03', 400, 'Ka', 'Am', 'dakslkaskd', 14),
(116, 1, 1, '2021-06-24', 200, 'abcd', 'efgh', 'saklmdlkmaslkmasdlkmaslkmd', 14),
(117, 1, 1, '2021-06-10', 4, 'sdfsd', 'sdfdsf', 'gfhfghgf', 11);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `fahrzeug`
--

CREATE TABLE `fahrzeug` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `jahr` int(4) UNSIGNED NOT NULL,
  `volumen` int(6) UNSIGNED NOT NULL,
  `gewicht` int(6) NOT NULL,
  `bild_pfad` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `fahrzeug`
--

INSERT INTO `fahrzeug` (`id`, `user_id`, `name`, `jahr`, `volumen`, `gewicht`, `bild_pfad`) VALUES
(10, 1, 'VW Golf', 2010, 500, 1500, 'bilder/img.png'),
(11, 1, 'lamborgini', 2010, 500, 1500, 'bilder/img.png'),
(12, 1, 'ferrari', 2010, 500, 1500, 'bilder/img.png'),
(13, 1, 'opel', 2010, 500, 1500, 'bilder/img.png'),
(14, 1, 'nissan', 2010, 500, 1500, 'bilder/img.png'),
(15, 1, 'mercedes', 2010, 500, 1500, 'bilder/img.png'),
(16, 1, 'touran', 2010, 500, 1500, 'bilder/img.png'),
(17, 1, 'sharan', 2010, 500, 1500, 'bilder/img.png'),
(18, 1, 'casczs', 2010, 500, 1500, 'bilder/img.png');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `lieferung`
--

CREATE TABLE `lieferung` (
  `anz_ID` int(11) NOT NULL,
  `ladeflaeche` int(11) NOT NULL,
  `ladungsgewicht` int(11) NOT NULL,
  `ladehoehe` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `lieferung`
--

INSERT INTO `lieferung` (`anz_ID`, `ladeflaeche`, `ladungsgewicht`, `ladehoehe`) VALUES
(97, 3, 3, 3),
(99, 3, 3, 3),
(101, 3, 3, 3),
(103, 3, 3, 3),
(105, 3, 3, 3),
(107, 3, 3, 3),
(109, 3, 3, 3),
(111, 3, 3, 3),
(116, 20, 30, 5);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `nachricht`
--

CREATE TABLE `nachricht` (
  `absender_id` varchar(255) NOT NULL,
  `empfaenger_id` varchar(255) NOT NULL,
  `inhalt` varchar(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `nachricht`
--

INSERT INTO `nachricht` (`absender_id`, `empfaenger_id`, `inhalt`, `date`) VALUES
('2', '1', 'Test', '2021-06-08 14:36:27'),
('1', '31', 'test1234', '2021-06-08 14:36:27'),
('test@gmail21.commm', 'test@gmail21.commm', 'Nachrichten test', '2021-06-08 14:38:41'),
('test@gmail21.commm', 'test@gmail21.commm', 'Nachrichten test', '2021-06-08 14:43:06'),
('test@gmail21.commm', 'test@gmail21.commm', 'Nachrichten test', '2021-06-08 14:43:26'),
('test@gmail21.commm', 'test@gmail21.commm', 'Nachrichten test', '2021-06-08 14:46:25'),
('test@gmail21.commm', 'test@gmail21.commm', 'Nachrichten test', '2021-06-08 14:46:46'),
('test@gmail21.commm', 'test@gmail21.commm', 'Nachrichten test', '2021-06-08 14:48:04'),
('test@gmail21.commm', 'test@gmail21.commm', 'Nachrichten test', '2021-06-08 14:48:26'),
('test@gmail21.commm', 'test@gmail21.commm', 'Nachrichten test', '2021-06-08 14:51:03'),
('test@gmail21.commm', 'test@gmail21.commm', 'Nachrichten test', '2021-06-08 14:51:47');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `personenbefoerderung`
--

CREATE TABLE `personenbefoerderung` (
  `anz_ID` int(11) NOT NULL,
  `personen` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `personenbefoerderung`
--

INSERT INTO `personenbefoerderung` (`anz_ID`, `personen`) VALUES
(96, 4),
(98, 4),
(100, 4),
(102, 4),
(104, 4),
(106, 4),
(108, 4),
(110, 4),
(112, 10),
(113, 10),
(114, 23),
(115, 4),
(117, 4);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `handyNr` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `passwort` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `user`
--

INSERT INTO `user` (`user_id`, `email`, `name`, `handyNr`, `passwort`) VALUES
(1, 'test@gmail.com', 'Max Mustermann', '+49293204803', 'test1234'),
(31, 'test@gmail21.commm', 'testname', 'testhandy', 'test1234'),
(32, 'test@gmail21.commm', 'testname', 'testhandy', 'test1234'),
(33, 'test@gmail21.commm', 'testname', 'testhandy', 'test1234'),
(34, 'test@gmail21.commm', 'testname', 'testhandy', 'test1234'),
(35, 'test@gmail21.commm', 'testname', 'testhandy', 'test1234'),
(36, 'test@gmail21.commm', 'testname', 'testhandy', 'test1234'),
(37, 'test@gmail21.commm', 'testname', 'testhandy', 'test1234'),
(38, 'test@gmail21.commm', 'testname', 'testhandy', 'test1234');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `anzeige`
--
ALTER TABLE `anzeige`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `id_fahrzeug` (`id_fahrzeug`);

--
-- Indizes für die Tabelle `fahrzeug`
--
ALTER TABLE `fahrzeug`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`user_id`);

--
-- Indizes für die Tabelle `lieferung`
--
ALTER TABLE `lieferung`
  ADD PRIMARY KEY (`anz_ID`),
  ADD KEY `anz_ID` (`anz_ID`);

--
-- Indizes für die Tabelle `nachricht`
--
ALTER TABLE `nachricht`
  ADD KEY `absender_id` (`absender_id`,`empfaenger_id`);

--
-- Indizes für die Tabelle `personenbefoerderung`
--
ALTER TABLE `personenbefoerderung`
  ADD PRIMARY KEY (`anz_ID`),
  ADD KEY `anz_ID` (`anz_ID`);

--
-- Indizes für die Tabelle `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `anzeige`
--
ALTER TABLE `anzeige`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;

--
-- AUTO_INCREMENT für Tabelle `fahrzeug`
--
ALTER TABLE `fahrzeug`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT für Tabelle `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `anzeige`
--
ALTER TABLE `anzeige`
  ADD CONSTRAINT `anzeige_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `fahrzeug`
--
ALTER TABLE `fahrzeug`
  ADD CONSTRAINT `fahrzeug_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `lieferung`
--
ALTER TABLE `lieferung`
  ADD CONSTRAINT `lieferung_ibfk_1` FOREIGN KEY (`anz_ID`) REFERENCES `anzeige` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `personenbefoerderung`
--
ALTER TABLE `personenbefoerderung`
  ADD CONSTRAINT `personenbefoerderung_ibfk_1` FOREIGN KEY (`anz_ID`) REFERENCES `anzeige` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
