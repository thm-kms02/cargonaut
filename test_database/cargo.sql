-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 25. Mai 2021 um 14:03
-- Server-Version: 10.4.18-MariaDB
-- PHP-Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

# Create Testuser
CREATE USER 'dev'@'localhost' IDENTIFIED BY 'dev';
GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,DROP ON *.* TO 'dev'@'localhost';
# Create DB
CREATE DATABASE IF NOT EXISTS `cargo` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `cargo`;

CREATE TABLE `anzeige` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `ang_ges` tinyint(1) NOT NULL,
  `datum` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `preis` int(11) NOT NULL,
  `start` varchar(255) NOT NULL,
  `ziel` varchar(255) NOT NULL,
  `beschreibung` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `anzeige`
--

INSERT INTO `anzeige` (`id`, `user_id`, `ang_ges`, `datum`, `preis`, `start`, `ziel`, `beschreibung`) VALUES
(4, 1, 1, '2021-05-24 10:31:56', 300, 'Gießen', 'Hamburg', 'TestTestTestTest'),
(5, 1, 1, '2021-05-24 11:32:58', 300, 'Gießen', 'Hamburg', 'TestTestTestTest'),
(6, 1, 1, '2021-05-25 11:56:03', 300, 'Gießen', 'Hamburg', 'TestTestTestTest');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `anzeige_bild`
--

CREATE TABLE `anzeige_bild` (
  `anz_ID` int(11) NOT NULL,
  `b_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `bild`
--

CREATE TABLE `bild` (
  `bild_id` int(11) NOT NULL,
  `pfad` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `personenbefoerderung`
--

CREATE TABLE `personenbefoerderung` (
  `anz_ID` int(11) NOT NULL,
  `personen` int(11) NOT NULL,
  `fahrzeugart` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `fahrzeugmarke` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `anzeige`
--
ALTER TABLE `anzeige`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `anzeige_bild`
--
ALTER TABLE `anzeige_bild`
  ADD PRIMARY KEY (`anz_ID`,`b_id`),
  ADD KEY `anz_ID` (`anz_ID`,`b_id`),
  ADD KEY `b_id` (`b_id`);

--
-- Indizes für die Tabelle `bild`
--
ALTER TABLE `bild`
  ADD PRIMARY KEY (`bild_id`);

--
-- Indizes für die Tabelle `lieferung`
--
ALTER TABLE `lieferung`
  ADD PRIMARY KEY (`anz_ID`),
  ADD KEY `anz_ID` (`anz_ID`);

--
-- Indizes für die Tabelle `personenbefoerderung`
--
ALTER TABLE `personenbefoerderung`
  ADD PRIMARY KEY (`anz_ID`),
  ADD KEY `anz_ID` (`anz_ID`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `anzeige`
--
ALTER TABLE `anzeige`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `anzeige_bild`
--
ALTER TABLE `anzeige_bild`
  ADD CONSTRAINT `anzeige_bild_ibfk_1` FOREIGN KEY (`b_id`) REFERENCES `bild` (`bild_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `anzeige_bild_ibfk_2` FOREIGN KEY (`anz_ID`) REFERENCES `anzeige` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
