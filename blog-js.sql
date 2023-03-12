-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : dim. 12 mars 2023 à 15:49
-- Version du serveur : 5.7.36
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `blog-js`
--

-- --------------------------------------------------------

--
-- Structure de la table `articles`
--

DROP TABLE IF EXISTS `articles`;
CREATE TABLE IF NOT EXISTS `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `category_id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `articles`
--

INSERT INTO `articles` (`id`, `title`, `content`, `category_id`, `author_id`, `created_at`, `updated_at`) VALUES
(1, 'test', 'test', 1, 2, '2023-03-09 10:28:33', NULL),
(5, 'Le mythe d’Odin (mythologie nordique) ', 'Odin (Óðinn en vieux norrois, ancienne langue des peuples scandinaves) est une divinité de la mythologie nordique (scandinave) et germanique (identifié à Wotan/Woden dans les langues germaniques). C’est la principale divinité de ces panthéons. Il est en tout cas présenté tel par Snorri Sturluson (1179 – 1241) dans ses Edda (dans le Gylfaginning), exposé poétique de la mythologie nordique. Odin est le créateur des hommes. Il est le dieu de la poésie, de la sagesse, des morts, etc. C’est un dieu shaman qui peut entrer dans des transes et prendre possession d’autres corps. Enfin, il est trompeur et subjugue les femmes. Il souvent représenté comme grisonnant, portant une longue barbe et un chapeau. Odin est le fils de Bur ou Borr (« l’Engendré, le Fils »), fils de Búri, et de Bestla (« écorce »), géante, fille de Bölthorn (Bolþorn) ou Bölthor. Il a deux frères, Vili (« volonté ») et Vé (« sanctuaire »). Avec ses deux frères, Odin crée le cosmos à partir des parties du corps du géant primordial Ymir qu’ils ont tué. Il appartient à la famille divine des Ases. Les Ases vivent à Ásgardhur (Ásgarðr) ou Asgard. La plupart des termes traduits dans cet article ont été tirés de Patrick Guelpa, Les 100 légendes la mythologie nordique.\r\n\r\n', 4, 1, '2023-03-12 10:42:13', NULL),
(6, '« Bonne » ou « bon » après-midi?', 'On écrit « bon après-midi » ou « bonne après-midi ». En effet, « après-midi » est un terme soit masculin, soit féminin. Selon l’Académie française (9e édition), « on doit préférer le masculin » (midi est un nom masculin), mais l’emploi du verbe « préférer » dit bien les flottements de l’usage (ce terme était d’ailleurs enregistré au féminin jusqu’à la 7e édition, 1878, de ce dictionnaire). Tout comme Le Robert, le Larousse le considère comme masculin ou féminin. Au XIXe siècle, le Littré (1863) l’enregistrait comme nom féminin mais précisait en remarque qu’il est des deux genres (« puisqu’on peut sous-entendre ou partie ou temps »). L’adjectif « bon » peut donc être accordé soit au masculin soit au féminin. Exemples :\r\n\r\n    As-tu passé une bonne après-midi avec tes amis aujourd’hui ?\r\n    Une bonne après-midi se traduit pour moi par quatre heures de lecture sur le canapé sans être dérangé.\r\n    Je vous souhaite de passer un bon après-midi avec vos parents !\r\n    Ils ont passé un bon après-midi à ranger toutes les affaires qui traînaient dans leur chambre.\r\n    Merci d’avoir bien voulu nous aider aujourd’hui ! Bon après-midi, et rentrez bien !\r\n    Bonne après-midi et à très bientôt mes bons amis !\r\n\r\nIl n’est pas certain qu’il y ait une véritable différence d’usage ou de perception entre le féminin et la masculin, comme entre « matin » (un moment de la journée, ponctuel) et « matinée » (une durée, pendant les longues heures du matin), ou « soir » et « soirée ».\r\n\r\nLa question ne se pose pas à l’oral puisque les deux formes sont homophones (elles se prononcent de la même manière).\r\n\r\nAu pluriel, « après-midi » est traditionnellement invariable, mais l’ajout de la marque du pluriel en « s » à midi a été recommandée par le document de rectifications orthographiques de 1990. Ainsi, on pourrait écrire des « de bons après-midis » ou « de bonnes après-midis ».\r\n\r\n\r\n\r\n', 1, 1, '2023-03-12 10:43:39', NULL),
(7, 'test6', 'test6', 1, 1, '2023-03-12 10:49:42', NULL),
(8, 'test6', 'test6', 1, 1, '2023-03-12 10:49:45', NULL),
(9, 'test6', 'test6', 1, 1, '2023-03-12 10:49:47', NULL),
(10, 'test6', 'test6', 1, 1, '2023-03-12 10:49:49', NULL),
(11, 'test6', 'test6', 1, 1, '2023-03-12 10:49:50', NULL),
(12, 'test6', 'test6', 1, 1, '2023-03-12 10:49:51', NULL),
(13, 'test6', 'test6', 1, 1, '2023-03-12 10:49:53', NULL),
(3, 'Nissan ZEOD RC (2014)', 'Nissan voulait revenir officiellement aux 24 heures du Mans d\'une manière et démarche originale, mais en dépit de la grosse comm\' et de ses objectifs, ce fut un ZEOD pointé ou presque sur la piste...\r\n\r\nDepuis 2012, les 24 heures du Mans accueillent une voiture admise en catégorie appelée « Garage 56 ». Cette classe très spéciale permet aux machines technologiquement innovantes ou autres idées originales de participer à la classique mancelle hors-classement. Depuis, le succès de cette formule est un peu mitigé (projets non-aboutis, conduisant à des forfaits, d’où l’absence de Garage 56 sur certaines éditions, exemple la Green GT en 2013) mais le potentiel de certaines qui ont pu courir étaient intéressantes, on pense à la participation du Sausset Racing Team en 2021 qui faisait courir des pilotes en situation d’handicap.\r\n\r\n\r\nMais parlons de la toute première Garage 56 admise au Mans en 2012. C’était la Deltawing à moteur Nissan. Mais si, vous connaissez certainement ce proto original (et qui ressemble presque à un tricycle, mais il y\'a bien quatre roues à l\'avant) qui a connu un succès auprès du public et qui a effectué une prestation honorable avant d’être jetée hors de la piste par la Toyota de Kazuki Nakajima, causant son abandon en début de soirée malgré les efforts de Satoshi Motoyama pour retaper la voiture sur la piste.\r\n\r\nCette bizarrerie crée par Ben Bowlby a une histoire originale. A la base conçue pour l’Indycar à partir de 2012, la Deltawing est recalée car trop radicale et c’est Dallara qui est choisi pour fournir les châssis. A défaut de la voir aux 500 miles d’Indianapolis, la machine va s’aventurer en endurance et plus précisément en American le Mans Series (ALMS) ainsi qu’au Mans justement. Plusieurs noms bien connus vont soutenir ce projet : Chip Ganassi Racing, Panoz qui s’est « approprié » le projet, Highcroft Racing (pour l’exploitation) et enfin Nissan qui va apporter une assistance technique et plus que ça…\r\n\r\nSon apparition dans la Sarthe en 2012 a visiblement donné des idées au constructeur nippon, qui était présent dans cette mythique épreuve dans les années 1980 à 1999 avant de revenir comme motoriste en 2011 pour les équipes présentes en LMP2. \r\n\r\nEn début d’année 2013, Nissan ne soutient plus le programme de la Deltawing/ Panoz (qui continuera en ALMS avec des fortunes diverses) et annonce dans la foulé (via Carlos Ghosn, alors PDG de Renault-Nissan) son retour officiel au Mans pour 2014 en tant que voiture du Garage 56. Un choix curieux et original, d’autant que cette future machine sera apparemment « excentrique » et utilisera une motorisation électrique, et il faut bien préciser que tout ceci n\'est qu\'un prélude à un réel retour en 2015 en LMP1.\r\n\r\nEt effectivement, quand la future machine est dévoilée en marge des 24h du Mans 2013, celle-ci est bel et bien décalée :\r\n\r\nDotée de quatre petites roues à l’avant (à l’instar de la Deltawing), d’un poids-plume (un peu moins de 700 kg à peu près) et de dimensions plutôt réduites, la machine inédite de chez Nissan nous fait penser à la Deltawing. C’est normal car le Ben Bowlby, qui est passé chez le constructeur nippon (à la base engagé en tant que consultant), qui est à l’origine de la conception de ce proto. Bien qu’utilisant certainement des éléments à la machine américaine, le cockpit de chez Nissan est fermé.\r\n\r\nCelle que l’on nomme ZEOD RC sera également pourvue d’un bloc électrique et thermique, on aura donc affaire à une voiture hybride mais qui pourra rouler brièvement en full-électrique sans émettre d’émissions, d’où son nom « ZEOD RC » comme « Zero Emission On Demand - Race Car ».', 1, 1, '2023-03-10 15:47:12', NULL),
(4, 'SOLID principles in Reactjs', 'TLDRSOLID principles in ReactJS are a set of five principles aimed at making software design maintainable, scalable and easy to modify. These principles can be applied to any object-oriented programming language, including ReactJS. In this blog post, we’ll discuss the importance of the SOLID Principles in React JS and how they can improve your code.', 2, 1, '2023-03-10 16:01:15', NULL),
(14, 'test6', 'test6', 1, 1, '2023-03-12 10:49:54', NULL),
(15, 'test6', 'test6', 1, 1, '2023-03-12 10:49:56', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'PHP'),
(2, 'JavaScript'),
(3, 'HTML'),
(4, 'CSS'),
(5, 'SQL');

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_comment_id` int(11) DEFAULT '0',
  `content` text NOT NULL,
  `article_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `parent_comment_id`, `content`, `article_id`, `user_id`, `created_at`) VALUES
(1, 0, 'Super Article\r\nBG!', 4, 4, '2023-03-10 17:38:56'),
(2, 0, 'test', 4, 1, '2023-03-10 21:43:23'),
(3, 0, 'test2\r\n', 4, 1, '2023-03-10 21:44:44'),
(4, 0, 'Salut', 4, 1, '2023-03-10 21:50:01'),
(5, 0, 'test reload', 4, 1, '2023-03-10 21:50:44'),
(6, 0, 'test4', 4, 1, '2023-03-10 21:56:14'),
(7, 0, 'ffffdex', 4, 1, '2023-03-10 21:59:43'),
(8, 0, '', 4, 1, '2023-03-10 22:01:51'),
(9, 0, '', 4, 1, '2023-03-10 22:02:59'),
(10, 0, 'Check it out the DocumentFragment tutorial for more detail.', 4, 1, '2023-03-10 22:04:06'),
(11, 0, 'test 17 pour reload', 4, 1, '2023-03-10 22:07:31'),
(12, 0, 'r', 4, 1, '2023-03-10 22:14:10'),
(13, 0, 'test 25', 4, 1, '2023-03-10 22:20:51'),
(14, 0, 'test27', 4, 1, '2023-03-10 22:34:25'),
(15, 1, 'test Reponse', 4, 1, '2023-03-11 08:25:03'),
(16, 2, 'test reply commentaire id = 2', 4, 1, '2023-03-11 09:53:19'),
(17, 1, 'test Reponse 2', 4, 1, '2023-03-11 10:15:22'),
(18, 0, 'Fonction', 4, 1, '2023-03-11 10:59:06'),
(19, 18, 'Reponse Function', 4, 1, '2023-03-11 11:03:01'),
(20, 0, 'Null', 3, 1, '2023-03-11 19:24:48'),
(21, 0, 'Test2', 3, 1, '2023-03-11 19:26:47');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `droits` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `login`, `password`, `droits`) VALUES
(1, 'Jules', '$2y$10$FK3Kr1v9mna6FcugclCOTOGennfLb2PUcupcw/wjKTU0ZyM6uc/B2', 'administrateur'),
(2, 'admin', '$2y$10$s7ge/iAyamsG4AYKnmdm0.XYUrkHMuplRhmGUZICF12obh0Z/cFZK', 'administrateur'),
(4, 'lion', 'lion', 'utilisateur'),
(5, 'lion1', 'lion1', 'utilisateur');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
