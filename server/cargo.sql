-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 13. Jun 2021 um 15:10
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
(118, 31, 0, '2021-06-23', 300, 'Gießen', 'Hamburg', 'TestTestTestTest', 1),
(119, 31, 0, '2021-06-23', 300, 'Gießen', 'Hamburg', 'TestTestTestTest', 1),
(120, 31, 0, '2021-06-23', 300, 'Gießen', 'Hamburg', 'TestTestTestTest', 1),
(121, 31, 0, '2021-06-23', 300, 'Gießen', 'Hamburg', 'TestTestTestTest', 1),
(122, 31, 0, '2021-06-23', 300, 'Gießen', 'Hamburg', 'TestTestTestTest', 1),
(123, 31, 0, '2021-06-23', 300, 'Gießen', 'Hamburg', 'TestTestTestTest', 1);

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
(4, 8, '2021-06-08 18:22:53');

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
(19, 31, 'VW Golf', 2010, 500, 1500, 'bilder/img.pn'),
(20, 31, 'VW Golf', 2010, 500, 1500, 'bilder/img.pn'),
(21, 31, 'VW Golf', 2010, 500, 1500, 'bilder/img.pn');

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
(8, 31, 119),
(9, 31, 119);

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
(119, 3, 3, 3),
(121, 3, 3, 3),
(123, 3, 3, 3);

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

--
-- Daten für Tabelle `nachricht`
--

INSERT INTO `nachricht` (`absender_id`, `empfaenger_id`, `inhalt`, `date`, `nachricht_id`) VALUES
('test66@gmail.com', 'test@gmail21.commm', 'Nachrichten test', '2021-06-08 16:21:05', 1),
('test66@gmail.com', 'test@gmail21.commm', 'Nachrichten test', '2021-06-08 16:22:14', 2),
('test66@gmail.com', 'test@gmail21.commm', 'Nachrichten test', '2021-06-08 16:22:53', 3);

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
(118, 4),
(120, 4),
(122, 4);

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

--
-- Daten für Tabelle `tracking`
--

INSERT INTO `tracking` (`id`, `lat`, `lng`, `reader`, `writer`, `date`) VALUES
(1, 0, 0, 39, 40, '2021-06-12 16:51:06'),
(2, 50, 50, 39, 40, '2021-06-12 17:13:54'),
(3, 30, -110, 39, 40, '2021-06-12 17:15:07');

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
(31, 'test@gmail21.commm', 'testname', 'testhandy', 'test1234'),
(39, 'test66@gmail.comm', 'Max Mustermann', '+49293204803', 'test1234'),
(40, 'test67@gmail.comm', 'Max Mustermann', '+49293204803', 'test1234'),
(41, 'test70@gmail.comm', 'Max Mustermann', '+49293204803', 'test1234');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;

--
-- AUTO_INCREMENT für Tabelle `buchungen`
--
ALTER TABLE `buchungen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT für Tabelle `fahrzeug`
--
ALTER TABLE `fahrzeug`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT für Tabelle `kasse`
--
ALTER TABLE `kasse`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT für Tabelle `nachricht`
--
ALTER TABLE `nachricht`
  MODIFY `nachricht_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `tracking`
--
ALTER TABLE `tracking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `anzeige`
--
ALTER TABLE `anzeige`
  ADD CONSTRAINT `anzeige_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
