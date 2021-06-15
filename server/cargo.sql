-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 09. Jun 2021 um 21:33
-- Server-Version: 10.4.19-MariaDB
-- PHP-Version: 7.3.28

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
  `passwort` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `geburtsdatum` date DEFAULT NULL,
  `bild` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `user`
--

INSERT INTO `user` (`user_id`, `email`, `name`, `passwort`, `geburtsdatum`, `bild`) VALUES
(1, 'root@gmail.com', 'Test User', 'root', '1994-12-05', 'bilder/profil_default.png'),
(2, 'fast-Driver@gmail.com', 'Thomas Müller', 'Blanco99', '1990-06-01', 'bilder/profil_default.png'),
(3, 'Bandigo@gmail.com', 'Bernd Wender', 'B239djak3?!', '1990-09-09', 'bilder/profil_default.png'),
(4, 'hyper@gmail.com', 'Lukas Hohl', 'jd3nd93kqn', '1994-12-19', 'bilder/profil_default.png'),
(5, 'onur@gmail.com', 'Onur Dede', 'ksnai3dnaj3n3', '1994-10-19', 'bilder/profil_default.png'),
(6, 'travel-alg@gmail.com', 'Trevor Denkins', 'nofiann3f932nds93', '1994-10-10', 'bilder/profil_default.png'),
(7, 'test@gmail.com', 'Testo Tester', 'test1234', '1994-10-19', 'bilder/profil_default.png');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
