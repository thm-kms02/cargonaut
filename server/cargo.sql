-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 28. Aug 2021 um 14:42
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
(1, 1, 0, '2021-06-23', 300, 'Gießen', 'Frankfurt', 'Ich befördere Menschen seit 10 Jahren und habe nie einen Unfall gemacht.', NULL),
(2, 2, 0, '2021-06-16', 100, 'Hamburg', 'Berlin', 'Es wird eine angenehme Fahrt', 3),
(3, 5, 1, '2021-06-24', 150, 'Aßlar', 'Frankfurt', 'Die Fahrt wird mit mir nicht Langweilig! ', NULL),
(4, 1, 0, '2021-06-30', 120, 'Lenste', 'Wetzlar', 'Mit mir kommt die Lieferung sicher an', NULL),
(21, 9, 0, '2021-06-18', 3, 'Rotterdam', 'Berlin', 'Hallo ich fahre nach Berlin und habe noch Platz', NULL),
(22, 9, 0, '2021-06-26', 13, 'München', 'Frankfurt', 'Kann noch jemanden mitnehmen', NULL),
(23, 9, 0, '2021-06-26', 13, 'München', 'Frankfurt', 'Kann noch jemanden mitnehmen', NULL),
(24, 10, 0, '2021-06-18', 20, 'München', 'Frankfurt', 'Ich habe noch Platz im Auto!', NULL),
(25, 1, 1, '2021-08-29', 4, '', 'Frankfurt', 'gfhghg', NULL),
(26, 1, 0, '2021-08-29', 3, 'München', 'Frankfurt', '324', NULL);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `bewertung`
--

CREATE TABLE `bewertung` (
  `id` int(11) NOT NULL,
  `id_verfasser` int(11) NOT NULL,
  `id_empfaenger` int(11) NOT NULL,
  `bewertung` int(1) NOT NULL,
  `kommentar` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `bewertung`
--

INSERT INTO `bewertung` (`id`, `id_verfasser`, `id_empfaenger`, `bewertung`, `kommentar`) VALUES
(17, 2, 1, 4, 'Top gefahren'),
(18, 3, 1, 3, 'Zu schnell gefahren'),
(19, 2, 1, 1, 'ZU langsam !!!'),
(20, 3, 5, 5, 'gut'),
(21, 10, 1, 4, 'Test'),
(22, 1, 2, 4, 'dsfd');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `buchungen`
--

CREATE TABLE `buchungen` (
  `id` int(11) NOT NULL,
  `id_kauefer` int(11) NOT NULL,
  `id_anz` int(11) NOT NULL,
  `datum` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `buchungen`
--

INSERT INTO `buchungen` (`id`, `id_kauefer`, `id_anz`, `datum`) VALUES
(31, 9, 3, '2021-06-17 11:17:41'),
(32, 9, 1, '2021-06-17 11:17:49'),
(34, 10, 4, '2021-06-17 11:37:58');

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
(3, 2, 'Mercedes GLC', 2018, 350, 2500, 'bilder/img.png'),
(9, 9, 'Mercedes Sprinter', 321, 34234, 23432, NULL),
(10, 10, 'Mercedes Sprinter', 2017, 4000, 2000, NULL),
(11, 1, 'Porsche 911', 2020, 2, 1500, NULL);

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
(4, 3, 30, 120),
(21, 2, 200, 150);

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
(22, 2),
(23, 2),
(24, 4),
(25, 2),
(26, 3);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `tracking`
--

CREATE TABLE `tracking` (
  `id` int(11) NOT NULL,
  `lat` decimal(11,5) NOT NULL,
  `lng` decimal(11,5) NOT NULL,
  `reader` int(11) NOT NULL,
  `writer` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `tracking`
--

INSERT INTO `tracking` (`id`, `lat`, `lng`, `reader`, `writer`, `date`) VALUES
(0, '3.00000', '5.00000', 1, 2, '2021-06-18 07:58:35'),
(31, '0.00000', '0.00000', 9, 5, '2021-06-17 09:17:41'),
(32, '50.56280', '8.50640', 9, 1, '2021-08-28 10:44:07'),
(33, '0.00000', '0.00000', 1, 2, '2021-06-17 09:30:30'),
(34, '10.00000', '9.00000', 10, 1, '2021-06-17 09:39:44'),
(35, '0.00000', '0.00000', 1, 2, '2021-08-28 10:24:46');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `passwort` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `geburtsdatum` date DEFAULT NULL,
  `bild` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `user`
--

INSERT INTO `user` (`user_id`, `email`, `name`, `passwort`, `geburtsdatum`, `bild`) VALUES
(1, 'root@gmail.com', 'Admin', 'root', '1994-12-05', 'bilder\\gangster.png'),
(2, 'fast-Driver@gmail.com', 'Thomas Müller', 'Blanco99', '1990-06-01', 'bilder/profil_default.png'),
(3, 'Bandigo@gmail.com', 'Bernd Wender', 'bernd', '1990-09-09', 'bilder/profil_default.png'),
(4, 'hyper@gmail.com', 'Lukas Hohl', 'lukas', '1994-12-19', 'bilder/profil_default.png'),
(5, 'onur@gmail.com', 'Onur Dede', 'onur', '1994-10-19', 'bilder/profil_default.png'),
(8, 'colin.kristen@mni.thm.de', 'Colin Kristen', 'colin', '1999-05-26', 'bilder/profil_default.png'),
(9, 'hans@wurst', 'Hans Salami', 'hans', '2021-06-27', 'bilder\\cargo_mask_guy.jpg'),
(10, 'noah@gmx.de', 'Noah', 'noah', '2021-06-09', 'bilder\\cargo_mask_guy.jpg');

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
  ADD KEY `id_verfasser` (`id_verfasser`),
  ADD KEY `id_empfaenger` (`id_empfaenger`);

--
-- Indizes für die Tabelle `buchungen`
--
ALTER TABLE `buchungen`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_kauefer` (`id_kauefer`),
  ADD KEY `id_anz` (`id_anz`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT für Tabelle `bewertung`
--
ALTER TABLE `bewertung`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT für Tabelle `buchungen`
--
ALTER TABLE `buchungen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT für Tabelle `fahrzeug`
--
ALTER TABLE `fahrzeug`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT für Tabelle `nachricht`
--
ALTER TABLE `nachricht`
  MODIFY `nachricht_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `tracking`
--
ALTER TABLE `tracking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT für Tabelle `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `anzeige`
--
ALTER TABLE `anzeige`
  ADD CONSTRAINT `anzeige_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `anzeige_ibfk_2` FOREIGN KEY (`id_fahrzeug`) REFERENCES `fahrzeug` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints der Tabelle `bewertung`
--
ALTER TABLE `bewertung`
  ADD CONSTRAINT `bewertung_ibfk_2` FOREIGN KEY (`id_verfasser`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bewertung_ibfk_3` FOREIGN KEY (`id_empfaenger`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `buchungen`
--
ALTER TABLE `buchungen`
  ADD CONSTRAINT `buchungen_ibfk_1` FOREIGN KEY (`id_kauefer`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `buchungen_ibfk_2` FOREIGN KEY (`id_anz`) REFERENCES `anzeige` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
