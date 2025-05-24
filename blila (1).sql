-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 24 mai 2025 à 14:38
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `blila`
--

-- --------------------------------------------------------

--
-- Structure de la table `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `needs` varchar(255) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `timing` varchar(50) DEFAULT NULL,
  `appointment_date` date DEFAULT NULL,
  `appointment_time` time DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `user_message` text DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `country` varchar(50) NOT NULL,
  `date_of_upload` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `appointments`
--

INSERT INTO `appointments` (`id`, `needs`, `gender`, `timing`, `appointment_date`, `appointment_time`, `email`, `phone`, `first_name`, `last_name`, `user_message`, `image_path`, `country`, `date_of_upload`) VALUES
(1, 'Forme du Nez', 'Homme', 'Moins de 2 mois', '2003-05-06', '05:02:00', 'johndoe@example.com', '0686999965', 'aziz', 'belharcha', 'tfooo', 'img\\ing.jpg', '', NULL),
(2, 'Forme du Nez', 'Homme', 'Moins de 2 mois', '2003-05-06', '05:02:00', 'johndoe@example.com', '0686999965', 'aziz', 'belharcha', 'tfooo', 'img\\ing.jpg', '', NULL),
(3, 'Forme du Nez', 'Homme', 'Moins de 2 mois', '2003-05-06', '05:02:00', 'johndoe@example.com', '0686999965', 'aziz', 'belharcha', 'tfooo', 'img\\ing.jpg', '', NULL),
(10, 'Forme du Nez', 'Homme', 'Moins de 2 mois', '2003-05-06', '05:02:00', 'johndoe@example.com', '16660', 'aziz', 'belharcha', 'AWILI', 'img\\ZAKARIYA_RABAH.jpg', '', NULL),
(11, 'Forme du Nez', 'Homme', 'Moins de 2 mois', '2003-05-06', '05:02:00', 'dr.aziz@example.com', '16660', 'aziz', 'belharcha', 'y3333333333', 'img\\seasomb.pdf', '', NULL),
(12, 'Excès de Graisse', 'Homme', 'Moins de 2 mois', '2003-05-06', '05:02:00', 'johndoe@example.com', '0999999999', 'aziz', 'mlml', 'azaz', 'img\\ibenzouherlogo.webp', '', NULL),
(13, 'Forme du Nez', 'Homme', 'Moins de 2 mois', '2003-05-06', '05:02:00', 'johndoe@example.com', '16660', 'momhisin', 'az', 'mohsine', 'img\\ibenzouherlogo.webp', '', NULL),
(14, 'Forme du Nez', 'Homme', 'Moins de 2 mois', '2003-05-06', '05:02:00', 'johndoe@example.com', '0686999965', 'tatattata', 'nininini', 'niiiiiiiiii', 'img\\ibenzouherlogo.webp', '', NULL),
(15, 'Forme du Nez', 'Homme', 'Moins de 2 mois', '2003-05-06', '05:02:00', 'johndoe@example.com', '0686999965', 'tatattata', 'nininini', 'niiiiiiiiii', 'img\\ibenzouherlogo.webp', '', NULL),
(16, 'Rajeunissement du Visage', 'Homme', 'Au plus vite', '2003-05-06', '05:02:00', 'xxxx@mail.com', 'tatatt', 'momhisin', 'mlml', 'mumumumu', 'img\\ibenzouherlogo.webp', '', NULL),
(17, 'Forme du Nez', 'Homme', 'Au plus vite', '2003-05-06', '05:02:00', 'johndoe@example.com', '0686999965', 'aziz', 'belharcha', 'awawawaw', 'img\\ibenzouherlogo.webp', '', NULL),
(18, 'Forme du Nez', 'Homme', 'Au plus vite', '2003-05-06', '05:02:00', 'johndoe@example.com', 'awawawaw', 'qqqqqqqqqqqqqqq', 'wwwwwwwwwww', 'wwwwwwwwwwwwwww', 'img\\ibenzouherlogo.webp', '', NULL),
(19, 'Excès de Graisse', 'Enfant', 'Moins de 2 mois', '2003-05-06', '05:02:00', 'bbbbb@example.com', 'uuuuuuu', 'tatattata', 'nininini', 'rrrrrrrrrrrrrrrrrrr', 'img\\ibenzouherlogo.webp', '', NULL),
(20, 'Forme du Nez', 'Homme', 'Moins de 2 mois', '2003-05-06', '05:02:00', 'awa@aa.za', 'aaaa', 'awwa', 'aaa', 'awqqq', 'img\\img1.png', 'Europe', NULL),
(21, 'Forme du Nez', 'Homme', 'Plus de 2 mois', NULL, NULL, 'john.doe@example.com', '114', 'bnm', 'ghj', 'ghj', 'img\\img2.png', 'Morocco', NULL),
(24, 'Forme du Nez', 'Homme', 'Au plus vite', '0000-00-00', '00:01:00', 'aziz@a.a', '0681568201', 'abdelaaziz', 'belharcha', 'aaa lala pa alla lala lala lal alla a;a; ', 'img\\WIN_20250413_14_32_27_Pro.jpg', 'Morocco', NULL),
(30, 'Forme des Seins', 'Homme', 'Au plus vite', '0000-00-00', '21:54:00', 'aziz@a.a', '068558585', 'awwa', 'belharcha', 'aziz is the king yes', 'img\\img1.png', 'Morocco', '2025-04-22'),
(32, 'Forme du Nez', 'Homme', 'Au plus vite', '2025-05-05', '20:03:00', 'john.doe@example.com', '0220', 'a', 'aa', 'qwwq', 'img\\img1.png', 'Europe', '2025-04-27'),
(33, 'Forme du Nez', 'Femme', 'Au plus vite', '2025-04-07', '20:04:00', 'aklasa@vs.cls', '0220', 'qq', 'qq', 'kakka', 'img\\img1.png', 'Europe', '2025-04-27'),
(34, 'Forme du Nez', 'Homme', 'Au plus vite', '2025-04-14', '20:12:00', 'aklasa@vs.cls', '0220', 'aa', 'aa', 'qwwq', 'img\\img1.png', 'Europe', '2025-04-27'),
(35, 'Forme du Nez', 'Homme', 'Au plus vite', '2025-04-08', '19:24:00', 'aklasa@vs.cls', '021', 'qww', 'wqq', 'qwqq', 'img\\img1.png', 'Europe', '2025-04-27'),
(36, 'Forme du Nez', 'Homme', 'Moins de 2 mois', '2025-04-24', '20:47:00', 'aziz@a.a', 'AA', 'AA', 'AA', 'AA', 'img\\img1.png', 'Morocco', '2025-04-27'),
(37, 'Forme du Nez', 'Homme', 'Plus de 2 mois', NULL, NULL, 'aziz@a.a', 'AA', 'AA', 'AA', 'AA', 'img\\img1.png', 'Morocco', '2025-04-27'),
(38, 'Forme du Nez', 'Homme', 'Plus de 2 mois', NULL, NULL, 'aziz@a.a', '0681568201', 'bnm', 'ghj', 'ala la ao ala a', 'img\\WIN_20250413_14_31_46_Pro.jpg', 'Morocco', '2025-04-29'),
(39, 'Forme du Nez', 'Homme', 'Plus de 2 mois', NULL, NULL, 'aziz@a.a', '0202', 'ugyij', 'm,', 'dfghj jknm', 'img\\WIN_20250413_14_31_46_Pro.jpg', 'Morocco', '2025-04-29');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
