-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 24 mars 2023 à 15:06
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
  `img_header` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `articles`
--

INSERT INTO `articles` (`id`, `title`, `content`, `img_header`, `category_id`, `author_id`, `created_at`, `updated_at`) VALUES
(1, 'Lore', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat mauris nunc congue nisi vitae suscipit tellus mauris a. Accumsan sit amet nulla facilisi morbi. Ut enim blandit volutpat maecenas volutpat blandit aliquam etiam erat. Non tellus orci ac auctor augue mauris augue. Felis donec et odio pellentesque diam volutpat commodo sed. Semper eget duis at tellus at urna condimentum mattis. Egestas fringilla phasellus faucibus scelerisque. Nunc sed blandit libero volutpat sed. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Vulputate eu scelerisque felis imperdiet. Aenean sed adipiscing diam donec adipiscing. Amet commodo nulla facilisi nullam vehicula ipsum a. Quis blandit turpis cursus in hac habitasse platea dictumst. Viverra suspendisse potenti nullam ac tortor vitae purus. Commodo elit at imperdiet dui accumsan sit amet nulla. Rhoncus urna neque viverra justo nec ultrices. Congue mauris rhoncus aenean vel elit scelerisque. In aliquam sem fringilla ut.\r\n\r\nEnim eu turpis egestas pretium. Consequat ac felis donec et odio. Neque volutpat ac tincidunt vitae. A lacus vestibulum sed arcu non. Tempor nec feugiat nisl pretium fusce id velit. Nulla at volutpat diam ut venenatis tellus in metus. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Est lorem ipsum dolor sit. Est lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque. Nec nam aliquam sem et tortor consequat id. Eget sit amet tellus cras adipiscing. Arcu non odio euismod lacinia. Eros donec ac odio tempor orci dapibus. Mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque. Accumsan lacus vel facilisis volutpat est. Ultrices dui sapien eget mi proin sed. Nullam non nisi est sit amet. Duis tristique sollicitudin nibh sit amet commodo. Vitae turpis massa sed elementum tempus egestas sed.\r\n\r\nUrna nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Non tellus orci ac auctor augue mauris augue neque gravida. Integer enim neque volutpat ac tincidunt vitae semper. Dictum at tempor commodo ullamcorper a lacus vestibulum. Porttitor eget dolor morbi non arcu risus quis varius. Lacus laoreet non curabitur gravida arcu ac. Nisl suscipit adipiscing bibendum est ultricies. Cras adipiscing enim eu turpis. Pulvinar pellentesque habitant morbi tristique senectus et netus et malesuada. Mauris ultrices eros in cursus turpis. Quis commodo odio aenean sed adipiscing diam donec adipiscing. Metus aliquam eleifend mi in nulla posuere sollicitudin. Ut tortor pretium viverra suspendisse potenti nullam ac tortor. Euismod quis viverra nibh cras pulvinar mattis. Sed pulvinar proin gravida hendrerit lectus a.', 'default_preview.png', 2, 2, '2023-03-09 10:28:33', '2023-03-24 10:56:43'),
(5, 'Lorem', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat mauris nunc congue nisi vitae suscipit tellus mauris a. Accumsan sit amet nulla facilisi morbi. Ut enim blandit volutpat maecenas volutpat blandit aliquam etiam erat. Non tellus orci ac auctor augue mauris augue. Felis donec et odio pellentesque diam volutpat commodo sed. Semper eget duis at tellus at urna condimentum mattis. Egestas fringilla phasellus faucibus scelerisque. Nunc sed blandit libero volutpat sed. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Vulputate eu scelerisque felis imperdiet. Aenean sed adipiscing diam donec adipiscing. Amet commodo nulla facilisi nullam vehicula ipsum a. Quis blandit turpis cursus in hac habitasse platea dictumst. Viverra suspendisse potenti nullam ac tortor vitae purus. Commodo elit at imperdiet dui accumsan sit amet nulla. Rhoncus urna neque viverra justo nec ultrices. Congue mauris rhoncus aenean vel elit scelerisque. In aliquam sem fringilla ut.', 'default_preview.png', 4, 1, '2023-03-12 10:42:13', '2023-03-24 10:57:44'),
(6, 'Theatre.js - Animation and 3D editor for JavaScript', 'On écrit « bon après-midi » ou « bonne après-midi ». En effet, « après-midi » est un terme soit masculin, soit féminin. Selon l’Académie française (9e édition), « on doit préférer le masculin » (midi est un nom masculin), mais l’emploi du verbe « préférer » dit bien les flottements de l’usage (ce terme était d’ailleurs enregistré au féminin jusqu’à la 7e édition, 1878, de ce dictionnaire). Tout comme Le Robert, le Larousse le considère comme masculin ou féminin. Au XIXe siècle, le Littré (1863) l’enregistrait comme nom féminin mais précisait en remarque qu’il est des deux genres (« puisqu’on peut sous-entendre ou partie ou temps »). L’adjectif « bon » peut donc être accordé soit au masculin soit au féminin. Exemples :\r\n\r\n    As-tu passé une bonne après-midi avec tes amis aujourd’hui ?\r\n    Une bonne après-midi se traduit pour moi par quatre heures de lecture sur le canapé sans être dérangé.\r\n    Je vous souhaite de passer un bon après-midi avec vos parents !\r\n    Ils ont passé un bon après-midi à ranger toutes les affaires qui traînaient dans leur chambre.\r\n    Merci d’avoir bien voulu nous aider aujourd’hui ! Bon après-midi, et rentrez bien !\r\n    Bonne après-midi et à très bientôt mes bons amis !\r\n\r\nIl n’est pas certain qu’il y ait une véritable différence d’usage ou de perception entre le féminin et la masculin, comme entre « matin » (un moment de la journée, ponctuel) et « matinée » (une durée, pendant les longues heures du matin), ou « soir » et « soirée ».\r\n\r\nLa question ne se pose pas à l’oral puisque les deux formes sont homophones (elles se prononcent de la même manière).\r\n\r\nAu pluriel, « après-midi » est traditionnellement invariable, mais l’ajout de la marque du pluriel en « s » à midi a été recommandée par le document de rectifications orthographiques de 1990. Ainsi, on pourrait écrire des « de bons après-midis » ou « de bonnes après-midis ».\r\n\r\n\r\n\r\n', 'default_preview.png', 1, 1, '2023-03-12 10:43:39', NULL),
(9, 'Guide complet sur l\'utilisation de l\'async/await fetch en JavaScript', 'Async/await est une fonctionnalité de JavaScript qui a été introduite dans ECMAScript 2017. Elle permet de simplifier la gestion des fonctions asynchrones en rendant le code plus lisible et en facilitant la gestion des erreurs. En particulier, elle est très utile dans les applications web, où les appels asynchrones sont courants.\r\n\r\nLe fetch() est une méthode de JavaScript qui permet de faire des requêtes HTTP. Elle renvoie une promesse qui contient la réponse de la requête. Avec l\'utilisation d\'async/await, on peut écrire des requêtes HTTP de manière plus simple et plus lisible.\r\n\r\nDans cet exemple, la fonction fetchData() est déclarée comme asynchrone avec l\'utilisation du mot-clé async. Elle utilise la méthode fetch() pour récupérer des données depuis l\'URL \'https://example.com/data\'. La méthode fetch() renvoie une promesse qui contient la réponse de la requête, qu\'on stocke dans la variable response. Avec l\'utilisation du mot-clé await, on peut attendre que la promesse soit résolue avant de continuer l\'exécution du code.\r\n\r\nEnsuite, on utilise la méthode .json() pour extraire les données JSON de la réponse. La méthode .json() renvoie également une promesse, qu\'on peut attendre avec le mot-clé await. Enfin, on affiche les données avec console.log().\r\n\r\nEn cas d\'erreur lors de l\'exécution de la requête, on capture l\'erreur avec un bloc try/catch.\r\n\r\nL\'utilisation d\'async/await permet donc de simplifier le code et de le rendre plus lisible. Elle facilite également la gestion des erreurs, ce qui est particulièrement important dans les applications web.', 'default_preview.png', 2, 1, '2023-03-12 10:49:47', '2023-03-17 06:50:32'),
(10, 'Les frameworks PHP : des outils indispensables pour les développeurs web', 'PHP est un langage de programmation très populaire pour le développement web. Cependant, en travaillant sur des projets complexes, il peut devenir difficile de gérer le code et de le maintenir efficacement. Les frameworks PHP sont des outils qui aident à faciliter ce processus en fournissant des structures, des modèles et des outils de développement pré-conçus pour simplifier la tâche des développeurs web. Dans cet article, nous allons passer en revue les frameworks PHP les plus populaires et expliquer pourquoi ils sont si importants pour les développeurs web.\r\n\r\n    Laravel :\r\n\r\nLaravel est l\'un des frameworks PHP les plus populaires et les plus performants. Il offre une syntaxe élégante et concise ainsi qu\'une abondance de fonctionnalités pour le développement web. Avec Laravel, vous pouvez facilement gérer les bases de données, les migrations, l\'authentification, les modèles, les contrôleurs et les vues. Laravel est également livré avec des packages qui vous permettent d\'ajouter des fonctionnalités supplémentaires à votre application, comme l\'intégration de la messagerie, la gestion de la file d\'attente et la gestion des tâches.\r\n\r\n    Symfony :\r\n\r\nSymfony est un autre framework PHP populaire qui est utilisé pour le développement de sites web et d\'applications web. Il offre une structure flexible et modulaire qui permet aux développeurs de créer des applications web robustes et évolutives. Symfony fournit également des fonctionnalités intégrées pour la gestion de la base de données, la sécurité, la gestion des formulaires et la gestion des requêtes.\r\n\r\n    CodeIgniter :\r\n\r\nCodeIgniter est un framework PHP simple mais puissant qui est utilisé pour créer des applications web rapides et légères. Il est facile à installer et à configurer et offre une gamme de fonctionnalités pour le développement web, y compris la gestion de base de données, la gestion de formulaires, l\'authentification, les requêtes AJAX et plus encore.\r\n\r\n    CakePHP :\r\n\r\nCakePHP est un autre framework PHP populaire qui est utilisé pour le développement web. Il offre une structure robuste et flexible pour le développement d\'applications web complexes. CakePHP est livré avec des fonctionnalités intégrées pour la gestion de la base de données, la gestion des sessions, la sécurité et la gestion des requêtes.\r\n\r\n    Zend Framework :\r\n\r\nZend Framework est un framework PHP évolutif et modulaire qui offre une large gamme de fonctionnalités pour le développement web. Il fournit des fonctionnalités pour la gestion de la base de données, la gestion des formulaires, la sécurité, l\'authentification et plus encore. Zend Framework est également livré avec des bibliothèques d\'API pour les réseaux sociaux et la gestion de contenu.\r\n\r\nConclusion :\r\n\r\nEn résumé, les frameworks PHP sont des outils indispensables pour les développeurs web qui travaillent sur des projets complexes. Ils permettent de simplifier le processus de développement en fournissant des structures, des modèles et des outils de développement pré-conçus. Les frameworks PHP les plus populaires incluent Laravel, Symfony, CodeIgniter, CakePHP et Zend Framework, chacun offrant des fonctionnalités uniques pour le développement web. En utilisant un framework PHP, les développeurs peuvent économiser du temps et des efforts, tout en créant des applications web plus robust', 'default_preview.png', 1, 1, '2023-03-12 10:49:49', '2023-03-16 13:02:04'),
(11, 'Les Nouvelles Fonctionnalités du PHP : Ce que Tout Développeur Doit Savoir', 'Le PHP est l\'un des langages de programmation les plus populaires au monde, largement utilisé pour la création de sites web dynamiques. Depuis sa création, le PHP a subi de nombreuses mises à jour et améliorations, ajoutant de nouvelles fonctionnalités pour simplifier le développement et améliorer les performances. Dans cet article, nous allons explorer les dernières fonctionnalités du PHP que tout développeur devrait connaître.\r\n\r\n    Typage strict\r\n\r\nLe typage strict est une fonctionnalité de PHP qui permet aux développeurs de définir explicitement le type de données pour les variables, les paramètres de fonction et les retours de fonction. Cela permet d\'éviter les erreurs de type et d\'améliorer la robustesse des applications.\r\n\r\n    L\'opérateur Null Coalescent\r\n\r\nL\'opérateur Null Coalescent est une fonctionnalité de PHP qui permet aux développeurs de simplifier la gestion des valeurs null ou indéfinies. Cela permet d\'éviter les erreurs lors de l\'utilisation de variables qui pourraient être null ou indéfinies.\r\n\r\n    Les arguments de fonction variadiques\r\n\r\nLes arguments de fonction variadiques sont une fonctionnalité de PHP qui permet aux développeurs de définir des fonctions avec un nombre variable d\'arguments. Cela permet de simplifier la création de fonctions qui acceptent un nombre variable d\'arguments, sans avoir besoin de définir plusieurs versions de la même fonction.\r\n\r\n    Les expressions régulières améliorées\r\n\r\nLes expressions régulières sont une fonctionnalité de PHP utilisées pour les recherches de motifs dans les chaînes de caractères. Les dernières versions du PHP ont amélioré cette fonctionnalité, en ajoutant des fonctionnalités de mise en correspondance plus avancées et en améliorant les performances.\r\n\r\n    La gestion des exceptions améliorée\r\n\r\nLa gestion des exceptions est une fonctionnalité de PHP utilisée pour gérer les erreurs dans les applications. Les dernières versions du PHP ont amélioré cette fonctionnalité en ajoutant des fonctionnalités avancées telles que la capture des exceptions en cascade et la gestion des exceptions globales.\r\n\r\nConclusion\r\n\r\nLe PHP est un langage de programmation en constante évolution, offrant de nouvelles fonctionnalités pour améliorer la productivité des développeurs et les performances des applications. Dans cet article, nous avons exploré les dernières fonctionnalités du PHP, y compris le typage strict, l\'opérateur Null Coalescent, les arguments de fonction variadiques, les expressions régulières améliorées et la gestion des exceptions améliorée. En tant que développeur, il est important de rester à jour avec les dernières fonctionnalités de PHP pour pouvoir créer des applications de qualité supérieure, efficaces et robustes.', 'default_preview.png', 1, 1, '2023-03-12 10:49:50', NULL),
(12, 'Les Frameworks PHP : Un Must pour le Développement Web', 'Les Frameworks PHP sont des outils de développement web qui simplifient grandement le processus de création de sites web. Ils sont conçus pour faciliter la gestion de tâches complexes et répétitives telles que la manipulation de bases de données, l\'authentification utilisateur, la validation de formulaires et bien plus encore. Les frameworks PHP sont également très populaires car ils permettent de gagner du temps et de l\'argent en simplifiant la création d\'applications web de haute qualité. Dans cet article, nous allons explorer les différents types de frameworks PHP disponibles et les raisons pour lesquelles ils sont indispensables pour tout développeur web.\r\n\r\nTypes de Frameworks PHP\r\n\r\nIl existe de nombreux types de frameworks PHP disponibles, chacun avec ses propres avantages et inconvénients. Les frameworks les plus populaires sont :\r\n\r\n    Laravel : C\'est le framework PHP le plus utilisé dans le monde. Il est considéré comme le plus convivial pour les débutants. Laravel est un framework open source, qui est facile à apprendre et qui offre une grande flexibilité.\r\n\r\n    Symfony : Ce framework est très puissant et flexible. Il offre un grand nombre de composants pour aider les développeurs à créer des applications web de qualité professionnelle.\r\n\r\n    CodeIgniter : Ce framework est facile à utiliser et permet de créer rapidement des applications web légères. Il est souvent utilisé pour des projets de petite à moyenne envergure.\r\n\r\n    CakePHP : Ce framework est très similaire à Ruby on Rails, il offre des fonctionnalités puissantes telles que la génération automatique de code et une architecture MVC.\r\n\r\n    Zend Framework : Ce framework est également très puissant et flexible. Il offre de nombreux composants pour aider les développeurs à créer des applications web de qualité professionnelle.\r\n\r\nRaisons d\'utiliser un Framework PHP\r\n\r\nLes frameworks PHP sont très populaires auprès des développeurs web car ils offrent de nombreux avantages, notamment :\r\n\r\n    Réduction du temps de développement : Les frameworks PHP permettent aux développeurs de gagner du temps en fournissant des fonctionnalités intégrées qui simplifient le processus de développement.\r\n\r\n    Sécurité améliorée : Les frameworks PHP offrent des fonctionnalités de sécurité intégrées telles que la protection contre les attaques XSS et CSRF.\r\n\r\n    Réduction des erreurs de codage : Les frameworks PHP sont conçus pour minimiser les erreurs de codage grâce à l\'utilisation de bonnes pratiques de développement telles que l\'architecture MVC.\r\n\r\n    Flexibilité : Les frameworks PHP offrent une grande flexibilité en permettant aux développeurs de personnaliser facilement leurs projets en fonction de leurs besoins.\r\n\r\nConclusion\r\n\r\nLes frameworks PHP sont un must pour tout développeur web sérieux. Ils offrent de nombreux avantages, notamment la réduction du temps de développement, une sécurité améliorée, la réduction des erreurs de codage et une grande flexibilité. Avec l\'utilisation d\'un framework PHP, les développeurs peuvent créer rapidement des applications web de qualité professionnelle tout en économisant du temps et de l\'argent. Alors n\'hésitez plus, choisissez le framework PHP qui convient le mieux à vos besoins et commencez à développer des sites web de qualité professionnelle dès aujourd\'hui.', 'default_preview.png', 1, 1, '2023-03-12 10:49:51', NULL),
(13, 'Introduction aux frameworks web: Comment ils simplifient le développement de sites web', 'Le développement de sites web peut être une tâche complexe et fastidieuse, surtout lorsque l\'on doit gérer des milliers de lignes de code pour assurer la cohérence et la qualité du résultat final. C\'est là que les frameworks web entrent en jeu: des outils conçus pour simplifier et accélérer le processus de développement en offrant une structure préconçue pour la création de sites web.\r\n\r\nLes frameworks web sont des collections de bibliothèques, de modèles et d\'outils pré-construits pour aider les développeurs à créer des sites web rapidement et efficacement. Les frameworks web offrent une architecture de base pour le développement web, permettant aux développeurs de se concentrer sur les fonctionnalités spécifiques de leur projet plutôt que sur la répétition de tâches courantes.\r\n\r\nLes frameworks web les plus populaires comprennent Angular, React, Vue.js, Django, Ruby on Rails, Symfony, Laravel, et bien d\'autres. Chaque framework a ses avantages et ses inconvénients en fonction des besoins spécifiques du projet.\r\n\r\nPar exemple, Angular est un framework de développement d\'applications web complet qui facilite la création de sites web dynamiques et interactifs. Il offre une architecture MVC (Modèle-Vue-Contrôleur) pour organiser le code et faciliter la maintenance. React, quant à lui, est un framework JavaScript qui se concentre sur la création de composants réutilisables pour les interfaces utilisateur, offrant ainsi une grande flexibilité et une réactivité élevée. Vue.js, quant à lui, est un framework plus léger qui permet de créer rapidement des interfaces utilisateur réactives avec une courbe d\'apprentissage plus faible.\r\n\r\nLes frameworks web peuvent également être combinés pour obtenir des avantages supplémentaires. Par exemple, de nombreux développeurs utilisent React avec Redux pour gérer l\'état global de l\'application, ou Vue.js avec Nuxt.js pour créer des applications web SSR (rendu côté serveur).', 'default_preview.png', 1, 1, '2023-03-12 10:49:53', NULL),
(16, 'Using ChatGPT to Optimize your code.', 'Using ChatGPT to Optimize your code can help you create a boilerplate code that you can edit to suit your project needs. It is an upgrade to Google and StackOverflow in that it does what we ask of it. It can write code in any programming language of your choice, not just JavaScript.', 'default_preview.png', 2, 6, '2023-03-14 22:31:24', NULL),
(4, 'SOLID principles in Reactjs', 'TLDRSOLID principles in ReactJS are a set of five principles aimed at making software design maintainable, scalable and easy to modify. These principles can be applied to any object-oriented programming language, including ReactJS. In this blog post, we’ll discuss the importance of the SOLID Principles in React JS and how they can improve your code.', 'default_preview.png', 2, 1, '2023-03-10 16:01:15', NULL),
(14, 'Les Frameworks CSS : pourquoi sont-ils importants pour les développeurs web ?', 'Les Frameworks CSS sont des collections de styles et de composants prédéfinis qui permettent aux développeurs web de créer rapidement et facilement des sites web réactifs et esthétiquement attrayants. En utilisant un Framework CSS, les développeurs peuvent économiser du temps et des efforts en évitant de réinventer la roue à chaque projet.\r\n\r\nIl existe de nombreux Frameworks CSS populaires, tels que Bootstrap, Foundation, Bulma et Materialize, qui offrent tous des fonctionnalités similaires mais avec des approches et des styles différents. Chacun de ces Frameworks fournit un ensemble de composants réutilisables, tels que des grilles, des boutons, des formulaires et des icônes, qui peuvent être facilement personnalisés pour s\'adapter aux besoins spécifiques d\'un projet.\r\n\r\nL\'un des avantages clés des Frameworks CSS est qu\'ils sont conçus pour être réactifs, ce qui signifie qu\'ils s\'adaptent automatiquement à différentes tailles d\'écran et à différents appareils. Cela permet de créer des sites web qui offrent une expérience utilisateur cohérente sur toutes les plateformes, y compris les ordinateurs de bureau, les tablettes et les smartphones.\r\n\r\nLes Frameworks CSS sont également conçus pour être accessibles, ce qui signifie qu\'ils prennent en compte les besoins des utilisateurs handicapés en offrant des options pour la navigation et l\'interaction avec le site web. Cela peut inclure des options de contraste élevé pour les utilisateurs malvoyants, des tailles de police modifiables et des modes de navigation alternatifs', 'default_preview.png', 4, 1, '2023-03-12 10:49:54', NULL),
(15, 'Le CSS pour les débutant', 'CSS (Cascading Style Sheets) est un langage de balisage qui permet de styliser les pages web en définissant des règles pour la présentation et la mise en forme des éléments HTML. Utilisé en conjonction avec le HTML, le CSS permet de créer des sites web visuellement attractifs et fonctionnels.\r\n\r\nLe CSS utilise des sélecteurs pour identifier les éléments HTML auxquels les règles de style doivent être appliquées. Par exemple, un sélecteur de type peut être utilisé pour appliquer une règle de style à tous les éléments de type \"p\" (paragraphe) dans une page web. Un sélecteur d\'identifiant peut être utilisé pour appliquer une règle de style à un élément HTML spécifique identifié par son attribut \"id\".\r\n\r\nLes règles de style définies en CSS comprennent des propriétés et des valeurs qui déterminent l\'apparence de l\'élément HTML. Par exemple, la propriété \"color\" peut être utilisée pour définir la couleur du texte d\'un élément, tandis que la propriété \"background-color\" peut être utilisée pour définir la couleur de fond d\'un élément.\r\n\r\nLe CSS permet également de définir des styles pour des états spécifiques des éléments HTML, tels que lorsqu\'un lien est survolé par la souris ou lorsqu\'un champ de formulaire est sélectionné. Cela permet de créer des interactions utilisateur dynamiques et d\'améliorer l\'expérience utilisateur.\r\n\r\nEn outre, le CSS offre une grande flexibilité dans la mise en forme des éléments HTML. Par exemple, il permet de définir la largeur et la hauteur des éléments, de les positionner sur la page et de les aligner par rapport à d\'autres éléments. Cela permet de créer des mises en page complexes et adaptatives qui s\'adaptent à différentes tailles d\'écran et appareils.\r\n\r\nEnfin, le CSS permet également de créer des animations et des transitions pour ajouter des effets visuels à une page web. Par exemple, il est possible de créer des animations de défilement, de transitionner entre différentes couleurs ou d\'appliquer des transformations 3D aux éléments HTML.\r\n\r\nEn résumé, le CSS est un langage essentiel pour créer des sites web visuellement attrayants et fonctionnels. En combinant les sélecteurs, les propriétés et les valeurs, il offre une grande flexibilité et de nombreuses options pour styliser les éléments HTML et créer des mises en page dynamiques.', 'default_preview.png', 4, 1, '2023-03-12 10:49:56', NULL),
(17, 'What is Tailwind Theming and How to use it in 2023', 'Tailwind CSS is a popular utility-first CSS framework that allows developers to quickly and easily create responsive and customizable user interfaces. One of the key features of Tailwind is its ability to be easily themed, allowing developers to create custom designs that match the unique branding of their projects. In this article, we will explore the basics of Tailwind theming and how to use it effectively. So, let\'s get started!\r\nWhat is Tailwind Theming?\r\n\r\nTailwind Theming is the process of customizing the default styles provided by Tailwind to create a unique design for your project. Tailwind provides a wide range of pre-built styles that can be customized to match your project’s branding. Theming in Tailwind involves creating custom color palettes, typography, spacing, and other design elements to match the unique needs of your project.\r\n\r\nThe default Tailwind styles are organized into various categories, such as typography, colors, spacing, and more. Each category contains a set of default values that can be customized to match your design needs. By changing these default values, you can create a custom design that is unique to your project.', 'tailwinds-css.png', 4, 6, '2023-03-15 08:26:51', '2023-03-16 08:28:05'),
(18, '8 astuces indispensables pour écrire un code propre avec JavaScript', 'JavaScript est un langage de programmation formidable, cependant, écrire un code JavaScript propre peut être un défi, même pour les programmeurs expérimentés.\r\n\r\nÀ quoi ressemble un code JavaScript propre ? Il doit être :\r\n1. Facile à lire\r\n2. Facile à déboguer\r\n3. Efficace et performant\r\n\r\nVoici les meilleurs outils et astuces que vous pouvez utiliser pour améliorer la qualité de votre code JavaScript :\r\n\r\n    Utilisez un bloc try catch pour toutes les requêtes API et les méthodes JSON\r\n\r\nDe nombreuses choses peuvent mal tourner lors de la récupération de données à partir d\'API, donc prendre en compte ces scénarios est indispensable. Lors de la manipulation de JSON, ne faites pas confiance automatiquement à ce qui est donné, essayez de rendre votre code plus robuste en traitant les incohérences possibles.\r\n\r\n    Utilisez un linter (ESLint)\r\n\r\nUn linter est un outil d\'analyse statique de code qui vérifie les erreurs programmatives et stylistiques en fonction d\'un ensemble prédéfini de règles et de configurations. En bref, il améliorera votre code JavaScript/TypeScript et contribuera à le maintenir plus cohérent.\r\n\r\n    Suivez les problèmes de JavaScript dans votre éditeur\r\n\r\nUn élément clé pour maintenir votre base de code JavaScript propre est de faciliter le suivi et la résolution des problèmes de code. Le suivi des problèmes de la base de code dans l\'éditeur permet aux ingénieurs de : Avoir une visibilité complète sur les problèmes plus importants comme la dette technique, voir le contexte de chaque problème de la base de code, réduire les interruptions de contexte, résoudre la dette technique de manière continue.', 'gr6rvhda40l0b3h5v7v0.jpg', 2, 6, '2023-03-23 22:29:15', NULL);

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
) ENGINE=MyISAM AUTO_INCREMENT=70 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `parent_comment_id`, `content`, `article_id`, `user_id`, `created_at`) VALUES
(67, 63, 're', 16, 6, '2023-03-20 10:40:10'),
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
(65, 29, '1er r', 1, 6, '2023-03-20 10:11:14'),
(66, 29, 'Test2', 1, 6, '2023-03-20 10:14:22'),
(20, 0, 'Null', 3, 1, '2023-03-11 19:24:48'),
(21, 0, 'Test2', 3, 1, '2023-03-11 19:26:47'),
(22, 0, 'test', 1, 6, '2023-03-13 08:16:45'),
(23, 22, 'test2', 1, 6, '2023-03-13 08:17:00'),
(24, 23, 'test Reponse', 1, 2, '2023-03-13 13:11:17'),
(25, 0, 'test', 1, 2, '2023-03-13 13:11:40'),
(26, 23, 're', 1, 2, '2023-03-13 13:11:52'),
(27, 23, 're', 1, 2, '2023-03-13 13:11:52'),
(28, 0, '28', 1, 2, '2023-03-13 15:01:26'),
(29, 0, '25', 1, 6, '2023-03-13 15:02:43'),
(30, 0, '1er com', 14, 6, '2023-03-13 21:52:44'),
(31, 30, 'Test 1er réponse\r\n', 14, 6, '2023-03-13 21:53:41'),
(32, 31, '2eme réponse', 14, 6, '2023-03-13 21:54:03'),
(33, 0, '2', 4, 6, '2023-03-13 22:03:07'),
(34, 0, '2', 4, 6, '2023-03-13 22:03:36'),
(35, 0, '4', 4, 6, '2023-03-13 22:03:44'),
(36, 0, 'e', 4, 6, '2023-03-13 22:05:11'),
(37, 0, 'r', 14, 7, '2023-03-13 22:07:13'),
(38, 0, 'test', 14, 7, '2023-03-13 22:14:09'),
(39, 0, 'test', 14, 7, '2023-03-13 22:18:47'),
(40, 0, 'rrr', 14, 7, '2023-03-13 22:23:20'),
(41, 0, 'ff', 14, 7, '2023-03-13 22:23:52'),
(42, 0, 'rrr', 14, 7, '2023-03-13 22:29:36'),
(43, 0, 'ff', 14, 7, '2023-03-13 22:31:24'),
(44, 0, 'fff', 14, 7, '2023-03-13 22:36:43'),
(45, 0, 'test', 14, 7, '2023-03-13 22:40:06'),
(46, 45, 're', 14, 7, '2023-03-13 22:40:17'),
(47, 46, 'tes2', 14, 7, '2023-03-14 08:07:30'),
(48, 46, 'tes2', 14, 7, '2023-03-14 08:07:30'),
(49, 0, '14', 14, 7, '2023-03-14 08:07:55'),
(50, 49, '14', 14, 7, '2023-03-14 08:08:00'),
(51, 50, '14', 14, 7, '2023-03-14 08:08:04'),
(52, 50, '14', 14, 7, '2023-03-14 08:08:04'),
(53, 50, '14', 14, 7, '2023-03-14 08:09:54'),
(56, 50, 're', 14, 7, '2023-03-14 08:18:48'),
(57, 0, '1er com', 15, 6, '2023-03-14 14:40:18'),
(58, 0, '1er com', 16, 6, '2023-03-15 18:40:36'),
(59, 58, '1er rep', 16, 6, '2023-03-15 18:40:49'),
(60, 59, '2er rep', 16, 6, '2023-03-15 18:40:57'),
(61, 59, '3re', 16, 6, '2023-03-15 18:59:12'),
(62, 59, '3re', 16, 6, '2023-03-15 18:59:12'),
(63, 0, '2em 1er comm', 16, 6, '2023-03-15 21:18:16'),
(64, 63, 'rep 2er com', 16, 6, '2023-03-15 21:19:05'),
(68, 0, 'Cool :)', 17, 8, '2023-03-22 15:17:36'),
(69, 68, ':)', 17, 6, '2023-03-24 10:18:51');

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
  `member_since` timestamp NOT NULL,
  `user_avatar` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `login`, `password`, `droits`, `member_since`, `user_avatar`) VALUES
(1, 'Paul', '$2y$10$yD4q5zkZqjHKvQtYB5pMXu0D/yfTP2lEwENuFvxsi8iftPWvOiJtG', 'utilisateur', '2023-03-12 16:53:24', 'circle-rev-1.png'),
(2, 'admin', '$2y$10$s7ge/iAyamsG4AYKnmdm0.XYUrkHMuplRhmGUZICF12obh0Z/cFZK', 'administrateur', '2023-03-12 16:53:24', 'default_avatar.png'),
(4, 'lion', 'lion', 'utilisateur', '2023-03-13 16:53:44', 'default_avatar.png'),
(6, 'Jules', '$2y$10$dIP.pggp2/Hd5X9ZkE3cGOZNKUk2l.UJL8elNyRRJYHaM3ZfFRsI2', 'administrateur', '2023-03-12 16:53:24', 'JJL-logo21.png'),
(7, 'Julia', '$2y$10$4AmB8NsoGMZ0Pfa8waw2pezWfAMq1MXqNhx1JWILz4k36NZnnuR1u', 'utilisateur', '2023-03-13 16:54:47', 'default_avatar.png'),
(8, 'jaques', '$2y$10$ANyQGMuKwFKyyJ7kqkC3nOCvuX23ZCXLFnNKVRxV1.Phk6qaWLo76', 'utilisateur', '2023-03-22 14:43:53', 'google_avatar.png'),
(10, 'Patrick', '$2y$10$9jOcTIDn6uLhs9ZOHaKpEe0iedOf/U.xU7jaY1wteTgJAFvhgMGB.', 'utilisateur', '2023-03-24 11:42:36', 'default_avatar.png');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
