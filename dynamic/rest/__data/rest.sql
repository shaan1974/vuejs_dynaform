-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  sam. 05 sep. 2020 à 18:39
-- Version du serveur :  5.7.17
-- Version de PHP :  7.1.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `rest`
--

-- --------------------------------------------------------

--
-- Structure de la table `main`
--

CREATE TABLE `main` (
  `uid` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `main`
--

INSERT INTO `main` (`uid`, `name`) VALUES
('123-XXX-ZZZ', 'waza');

-- --------------------------------------------------------

--
-- Structure de la table `main_clients`
--

CREATE TABLE `main_clients` (
  `uid` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `root_uid` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `main_clients`
--

INSERT INTO `main_clients` (`uid`, `name`, `active`, `root_uid`) VALUES
('AAA', 'John Doe-xxx', 1, '123-XXX-ZZZ'),
('BBB', 'Lucy Smith', 0, '123-XXX-ZZZ'),
('CCC', 'Peter Holcombe', 0, '123-XXX-ZZZ'),
('DDD', 'Barry Collins', 0, '123-XXX-ZZZ');

-- --------------------------------------------------------

--
-- Structure de la table `main_clients_zip`
--

CREATE TABLE `main_clients_zip` (
  `uid` varchar(50) DEFAULT NULL,
  `code` varchar(4) DEFAULT NULL,
  `parent_uid` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `main_clients_zip`
--

INSERT INTO `main_clients_zip` (`uid`, `code`, `parent_uid`) VALUES
('AAA-1', '5191', 'AAA'),
('AAA-2', '5190', 'AAA'),
('BBB-1', '1000', 'BBB'),
('BBB-2', '1001', 'BBB'),
('CCC-1', '2000', 'CCC'),
('CCC-2', '2001', 'CCC'),
('DDD-2', '3001', 'DDD'),
('DDD-1', '3000', 'DDD');

-- --------------------------------------------------------

--
-- Structure de la table `test`
--

CREATE TABLE `test` (
  `id` bigint(20) NOT NULL,
  `jdoc` json NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `test`
--

INSERT INTO `test` (`id`, `jdoc`) VALUES
(1, '{\"key1\": \"value1\", \"key2\": \"value2\"}'),
(2, '{\"key1\": \"value1A\", \"key2\": \"value2A\"}');

-- --------------------------------------------------------

--
-- Structure de la table `_adresses`
--

CREATE TABLE `_adresses` (
  `id` bigint(20) NOT NULL,
  `line1` varchar(100) NOT NULL,
  `line2` varchar(100) NOT NULL,
  `zipcode` varchar(10) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `fax` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `_adresses`
--

INSERT INTO `_adresses` (`id`, `line1`, `line2`, `zipcode`, `mobile`, `fax`) VALUES
(1, '932 Nitzsche Station\\nEast Jany, NH 43570', 'Reunion', '33860', '(114)536-4258x508', '819.825.4125'),
(2, '40119 Graham Crest\\nHesselchester, DE 40502-2856', 'Belgium', '08883', '1-579-922-2797x269', '(242)362-0079x30563'),
(3, '539 Armstrong Passage Suite 206\\nWest Jerrod, AK 22076-9898', 'Honduras', '83931', '(664)039-3778x42612', '1-489-482-8553x492'),
(4, '6026 Lemke Throughway\\nPort Alecville, NC 95534', 'Turks and Caicos Islands', '80281-2063', '+29(4)7869810126', '408.388.5746x3722'),
(5, '671 Manuel Meadow Suite 440\\nKiraton, AL 19283-0087', 'Nepal', '76259', '575-426-8250', '(086)774-1287x53808');

-- --------------------------------------------------------

--
-- Structure de la table `_groups`
--

CREATE TABLE `_groups` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `_groups`
--

INSERT INTO `_groups` (`id`, `name`, `description`) VALUES
(1, 'Admin', 'Administrators'),
(2, 'view', 'Viewer'),
(3, 'Editor', 'Editor'),
(4, 'Teammember', 'Team Member'),
(5, 'Superuser', 'Super user'),
(6, 'Internal', 'Internal');

-- --------------------------------------------------------

--
-- Structure de la table `_users`
--

CREATE TABLE `_users` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `nickname` varchar(100) NOT NULL,
  `birthdate` date NOT NULL,
  `gender` varchar(1) NOT NULL,
  `salary` varchar(100) NOT NULL,
  `_groups_id` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL,
  `age` int(11) NOT NULL,
  `_adresses_id` bigint(20) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `_users`
--

INSERT INTO `_users` (`id`, `name`, `nickname`, `birthdate`, `gender`, `salary`, `_groups_id`, `created_at`, `updated_at`, `age`, `_adresses_id`, `email`) VALUES
(1, 'Connie Shingler', 'Connie', '1975-12-04', 'F', '1000', 1, '2019-09-10', '2019-09-18', 41, 1, 'Connie.Shingler@bbs.com'),
(2, 'Pauline Fleischer', 'Paul', '1985-04-09', 'F', '2000', 2, '2019-09-01', '2019-09-01', 21, 2, 'Pauline.Fleischer@bbs.com'),
(3, 'Kaye Diggins', 'Kaye', '1978-03-11', 'F', '3012', 3, '2019-09-01', '2019-09-17', 55, 5, 'Kaye.Diggins@bbs.com'),
(4, 'Chan Nellis', 'Chan', '1980-06-19', 'M', '3212', 1, '2019-09-01', '2019-09-01', 43, 4, 'Chan.Nellis@bbbs.com'),
(5, 'Rosenda Ellett', 'Rosenda', '1974-04-10', 'F', '5000', 2, '2019-09-02', '2019-09-03', 44, 4, 'Rosenda.Ellett@bbs.com'),
(6, 'Maira Stager', 'Stager', '2000-11-13', 'F', '2321', 5, '2019-09-01', '2019-09-03', 43, 3, 'Maira.Stager@bbs.com'),
(7, 'Trenton Rubalcaba', 'Trent', '2002-09-27', 'M', '1233', 1, '2019-09-01', '2019-09-01', 49, 5, 'Trenton.Rubalcaba@bbs.com'),
(8, 'Elfreda Lenton', 'Lenton', '1995-06-04', 'F', '6321', 1, '2019-09-01', '2019-09-01', 32, 4, 'Elfreda.Lenton@bbs.com'),
(9, 'Josue Mansell', 'Jos', '1987-05-14', 'M', '6512', 6, '2019-09-01', '2019-09-01', 51, 4, 'Josue.Mansell@bbs.com'),
(10, 'Paris Wingard', 'Wing', '1997-06-18', 'M', '3219', 2, '2019-09-01', '2019-09-01', 51, 5, 'Paris.Wingard@bbs.com'),
(11, 'Whitney Busse', 'Buss', '1991-05-14', 'M', '1555', 6, '2019-09-01', '2019-09-01', 37, 3, 'Whitney.Busse@bbs.com'),
(12, 'Adell Chrisman', 'Adel2', '1981-01-12', 'F', '4210', 2, '2019-09-01', '2019-09-01', 33, 5, 'Adell.Chrisman@bbs.com'),
(13, 'Darell Doutt', 'Dar', '1993-09-17', 'M', '3211', 1, '2019-09-01', '2019-09-01', 44, 1, 'Darell.Doutt@bbs.com'),
(14, 'Burl Black', 'Black', '2001-01-13', 'M', '1110', 3, '2019-09-01', '2019-09-01', 41, 4, 'Burl.Black@bbs.com'),
(15, 'Michel Magar', 'Mic', '1983-01-14', 'M', '2100', 4, '2019-09-01', '2019-09-02', 41, 3, 'Michel.Magar@bbs.com'),
(16, 'Felix Fleenor', 'Felix', '1991-04-12', 'M', '2112', 4, '2019-09-01', '2019-09-02', 61, 5, 'Felix.Fleenor@bbs.com'),
(17, 'Dorine Dasher', 'Dor', '1995-05-12', 'F', '3220', 2, '2019-09-01', '2019-09-05', 51, 2, 'Dorine.Dasher@bbs.com'),
(18, 'Abbie Alarcon', 'Aby', '2002-01-10', 'F', '1254', 3, '2019-09-01', '2019-09-03', 31, 1, 'Abbie.Alarcon@bbs.com'),
(19, 'Dorris Dicarlo', 'Dor', '1992-04-12', 'F', '6451', 2, '2019-09-01', '2019-09-05', 32, 3, 'Dorris.Dicarlo@bbs.com'),
(20, 'Germaine Gonyea', 'Gon', '2004-02-03', 'F', '2671', 4, '2019-09-01', '2019-09-02', 44, 1, 'Germaine.Gonyea@google.com'),
(21, 'Vincent Vanauken', 'Vince', '1979-02-10', 'M', '1220', 4, '2019-09-01', '2019-09-02', 31, 5, 'Vincent.Vanauken@bbs.com'),
(22, 'Solomon Stockstill', 'Sol', '1984-10-10', 'M', '2330', 2, '2019-09-01', '2019-09-03', 27, 5, 'Solomon.Stockstill@bbs.com'),
(23, 'Adell Chrisman', 'Adel1', '1981-01-12', 'F', '4210', 2, '2019-09-01', '2019-09-01', 33, 1, 'Adell.Chrisman@bbs.com'),
(24, 'Taisha Barroso', 'Taisha', '1985-02-03', 'F', '1000', 1, '2019-09-01', '2019-09-04', 30, 4, 'Taisha.Barroso@bbs.com'),
(25, 'Jarrod Bolick', 'Jar', '1990-10-10', 'M', '1244', 2, '2019-09-02', '2019-09-03', 31, 3, 'Jarrod.Bolick@bbs.com'),
(26, 'Magdalena Witzel', 'Mag', '1981-01-12', 'F', '1500', 3, '2019-09-03', '2019-09-02', 32, 3, 'Magdalena.Witzel@bbs.com'),
(27, 'Clark Knecht', 'Adel', '1982-11-02', 'M', '1800', 4, '2019-09-04', '2019-09-01', 33, 3, 'Clark.Knecht@bbs.com'),
(28, 'Justin Logue', 'Adel', '1983-10-03', 'F', '2300', 5, '2019-09-05', '2019-09-02', 34, 2, 'Justin.Logue@bbs.com'),
(29, 'Cecelia Altamirano', 'Cece', '1984-09-04', 'F', '3330', 6, '2019-09-06', '2019-09-03', 35, 1, 'Cecelia.Altamirano@google.com'),
(30, 'Lucio Stallard', 'Lucio', '1985-08-05', 'M', '5120', 5, '2019-09-07', '2019-09-04', 36, 2, 'Lucio.Stallard@bbs.com'),
(31, 'Benedict Mone', 'Ben', '1986-07-06', 'F', '1120', 4, '2019-09-08', '2019-09-05', 37, 3, 'Benedict.Mone@bbs.com'),
(32, 'Gwenda Tillson', 'Gwen', '1987-06-07', 'F', '9010', 3, '2019-09-09', '2019-09-06', 38, 4, 'Gwenda.Tillson@bbs.com'),
(33, 'Gilberte Moline', 'Mol', '1988-04-08', 'F', '1250', 2, '2019-09-11', '2019-09-07', 39, 5, 'Gilberte.Moline@bbs.com'),
(34, 'Rolf Fenske', 'Fen', '1988-05-09', 'F', '1920', 1, '2019-09-11', '2019-09-08', 40, 3, 'Rolf.Fensken@google.com'),
(35, 'Katina Pries', 'Kat', '1990-03-10', 'F', '3204', 2, '2019-09-12', '2019-09-09', 41, 4, 'Katina.Pries@bbs.com'),
(36, 'Noah Marlar', 'Mal', '1990-02-11', 'M', '7541', 3, '2019-09-10', '2019-09-10', 77, 3, 'Noah.Marlar@bbs.com'),
(37, 'Luther Arter', 'Luc', '1984-12-01', 'M', '5541', 2, '2019-01-10', '2019-01-11', 55, 2, 'Luther.Arter@bbs.com');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `_adresses`
--
ALTER TABLE `_adresses`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `_groups`
--
ALTER TABLE `_groups`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `_users`
--
ALTER TABLE `_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `test`
--
ALTER TABLE `test`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
