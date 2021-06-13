-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 08. Jun 2021 um 17:15
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


# Create Testuser
CREATE USER 'dev'@'localhost' IDENTIFIED BY 'dev';
GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,DROP ON *.* TO 'dev'@'localhost';
# Create DB
CREATE DATABASE IF NOT EXISTS `cargo` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `cargo`;

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
(1, 1, 0, '2021-06-23', 300, 'Gießen', 'Frankfurt', 'Ich befördere Menschen seit 10 Jahren und habe nie einen Unfall gemacht.', 1),
(2, 2, 0, '2021-06-16', 100, 'Hamburg', 'Berlin', 'Es wird eine angenehme Fahrt', 3),
(3, 5, 1, '2021-06-24', 150, 'Aßlar', 'Frankfurt', 'Die Fahrt wird mit mir nicht Langweilig! ', NULL),
(4, 1, 0, '2021-06-30', 120, 'Lenste', 'Wetzlar', 'Mit mir kommt die Lieferung sicher an', 2),
(5, 1, 1, '2021-06-17', 250, 'Aßlar', 'Wetzlar', 'Just do it', NULL);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `bewertung`
--

CREATE TABLE `bewertung` (
  `id` int(11) NOT NULL,
  `id_buchen` int(11) NOT NULL,
  `id_verfasser` int(11) NOT NULL,
  `id_empfaenger` int(11) NOT NULL,
  `bewertung` int(1) NOT NULL,
  `kommentar` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `buchungen`
--

CREATE TABLE `buchungen` (
  `id` int(11) NOT NULL,
  `id_kasse` int(11) NOT NULL,
  `datum` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `buchungen`
--

INSERT INTO `buchungen` (`id`, `id_kasse`, `datum`) VALUES
(1, 1, '2021-06-09 17:27:07');

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
(1, 1, 'VW Arteon', 2018, 300, 2000, 'bilder/img.png'),
(2, 1, 'VW Sharan', 2012, 500, 2300, 'bilder/img.png'),
(3, 2, 'Mercedes GLC', 2018, 350, 2500, 'bilder/img.png'),
(4, 6, 'Mercedes S-Klasse', 2019, 200, 2000, 'bilder/img.png');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `kasse`
--

CREATE TABLE `kasse` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `anz_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `kasse`
--

INSERT INTO `kasse` (`id`, `user_id`, `anz_ID`) VALUES
(1, 1, 4);

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
(4, 3, 30, 120);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `nachricht`
--

CREATE TABLE `nachricht` (
  `absender_id` varchar(255) NOT NULL,
  `empfaenger_id` varchar(255) NOT NULL,
  `inhalt` varchar(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `nachricht_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(1, 4),
(2, 2),
(3, 1),
(5, 10);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `tracking`
--

CREATE TABLE `tracking` (
  `id` int(11) NOT NULL,
  `lat` int(11) NOT NULL,
  `lng` int(11) NOT NULL,
  `reader` int(11) NOT NULL,
  `writer` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(1, 'root@gmail.com', 'Test User', '01743485938', 'root'),
(2, 'fast-Driver@gmail.com', 'Thomas Müller', '01949383234', 'Blanco99'),
(3, 'Bandigo@gmail.com', 'Bernd Wender', '012483193493', 'B239djak3?!'),
(4, 'hyper@gmail.com', 'Lukas Hohl', '1029343943', 'jd3nd93kqn'),
(5, 'onur@gmail.com', 'Onur Dede', '0239913290321', 'ksnai3dnaj3n3'),
(6, 'travel-alg@gmail.com', 'Trevor Denkins', '013839452923', 'nofiann3f932nds93');

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
-- Indizes für die Tabelle `bewertung`
--
ALTER TABLE `bewertung`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_buchen` (`id_buchen`),
  ADD KEY `id_verfasser` (`id_verfasser`),
  ADD KEY `id_empfaenger` (`id_empfaenger`);

--
-- Indizes für die Tabelle `buchungen`
--
ALTER TABLE `buchungen`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_kasse` (`id_kasse`);

--
-- Indizes für die Tabelle `fahrzeug`
--
ALTER TABLE `fahrzeug`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`user_id`);

--
-- Indizes für die Tabelle `kasse`
--
ALTER TABLE `kasse`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`,`anz_ID`),
  ADD KEY `anz_ID` (`anz_ID`);

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
  ADD PRIMARY KEY (`nachricht_id`);

--
-- Indizes für die Tabelle `personenbefoerderung`
--
ALTER TABLE `personenbefoerderung`
  ADD PRIMARY KEY (`anz_ID`),
  ADD KEY `anz_ID` (`anz_ID`);

--
-- Indizes für die Tabelle `tracking`
--
ALTER TABLE `tracking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reader` (`reader`,`writer`),
  ADD KEY `writer` (`writer`);

--
-- Indizes für die Tabelle `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `anzeige`
--
ALTER TABLE `anzeige`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT für Tabelle `bewertung`
--
ALTER TABLE `bewertung`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `buchungen`
--
ALTER TABLE `buchungen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `fahrzeug`
--
ALTER TABLE `fahrzeug`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT für Tabelle `kasse`
--
ALTER TABLE `kasse`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `nachricht`
--
ALTER TABLE `nachricht`
  MODIFY `nachricht_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `tracking`
--
ALTER TABLE `tracking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `anzeige`
--
ALTER TABLE `anzeige`
  ADD CONSTRAINT `anzeige_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `anzeige_ibfk_2` FOREIGN KEY (`id_fahrzeug`) REFERENCES `fahrzeug` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `bewertung`
--
ALTER TABLE `bewertung`
  ADD CONSTRAINT `bewertung_ibfk_1` FOREIGN KEY (`id_buchen`) REFERENCES `buchungen` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bewertung_ibfk_2` FOREIGN KEY (`id_verfasser`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bewertung_ibfk_3` FOREIGN KEY (`id_empfaenger`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `buchungen`
--
ALTER TABLE `buchungen`
  ADD CONSTRAINT `buchungen_ibfk_1` FOREIGN KEY (`id_kasse`) REFERENCES `kasse` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `fahrzeug`
--
ALTER TABLE `fahrzeug`
  ADD CONSTRAINT `fahrzeug_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `kasse`
--
ALTER TABLE `kasse`
  ADD CONSTRAINT `kasse_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `kasse_ibfk_2` FOREIGN KEY (`anz_ID`) REFERENCES `anzeige` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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

--
-- Constraints der Tabelle `tracking`
--
ALTER TABLE `tracking`
  ADD CONSTRAINT `tracking_ibfk_1` FOREIGN KEY (`reader`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tracking_ibfk_2` FOREIGN KEY (`writer`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;