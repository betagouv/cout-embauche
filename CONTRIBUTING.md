**Si vous lisez ce fichier, c'est que vous pensez pouvoir nous aider d’une manière ou d’une autre, et nous vous en remercions d'ores et déjà !  :)**

Notre objectif est évidemment d’élargir l’étendue des cotisations calculées. Pour dépasser la limite de nos ressources, nous cherchons à ouvrir au maximum cet outil à la contribution. Ainsi, tout le code du [moteur de calcul](https://github.com/openfisca/openfisca-france) comme de l’[interface utilisateur](https://github.com/sgmap/cout-embauche) est sous [licence libre](http://fr.wikipedia.org/wiki/Logiciel_libre), et toute forme de contribution peut aider à l’intégration de nouvelles cotisations : recherche législative préalable et rédaction des règles à implémenter, ajout de [tests](http://embauche.beta.gouv.fr/tests/) pour valider le calcul de prestations…

Suggérer de nouvelles cotisations
=================================

**Pour suggérer l'ajout de cotisations ou statuts supplémentaires, créez une _issue_** pour chacune d'entre elles, avec la référence la plus officielle possible vers le descriptif de la cotisation. Nous cherchons les conditions d'application et les modalités de calcul.

Pour faciliter le suivi des demandes, chaque cotisation demandée est représentée par une [_issue_](https://github.com/sgmap/cout-embauche/issues) identifiée par le _tag_ « [nouvelle cotisation](https://github.com/sgmap/cout-embauche/labels/nouvelle%20cotisation) », afin que toute personne se sentant concernée puisse appuyer la demande, et en suivre l'évolution.


Suivre l'avancement
===================

Langue
------

Par souci de lisibilité pour les partenaires, notamment administratifs, la langue utilisée pour la description et le suivi de fonctionnalités est le français.

En revanche, pour éviter le coût du changement de contexte, les discussions techniques peuvent se faire en anglais, la langue la plus utilisée dans le cadre du développement logiciel.


Stockage
--------

Toutes les évolutions de l'outil, espérées, planifiées ou réalisées, sont représentées par des [_issues_ GitHub](https://help.github.com/articles/about-issues/). L'ensemble des _issues_ sur tous les dépôts composant les différents modules de l'application simulateur de coût d'embauche est donc la seule source de vérité sur ses évolutions.

L'état d'avancement de la fonctionnalité représentée par l'_issue_ est donné par un _tag_.


Représentation
--------------

Pour faciliter la lecture du processus et regrouper les _issues_ ouvertes sur tous les différents dépôts, nous utilisons [Waffle](https://waffle.io/sgmap/cout-embauche).


Processus
---------

Le passage d'une étape du processus est rendu possible par la validation des conditions suivantes.

### À trier → Définition

Décision informelle sur la base de l'analyse des besoins des usagers, des partenaires, des opportunités et contraintes techniques.

### Définition → Implémentation

- [x] Validation de la définition de l'_issue_ par le demandeur.
- [x] Validation de la définition de l'_issue_ par l'équipe technique.
- [x] Création d'un test invalide (selon la modalité la plus indiquée : unitaire pour l'API, via Ludwig pour une cotisation, d'intégration pour l'interface…).

### Implémentation → Déploiement

- [x] Passage du (ou des) test(s) associé(s) à la définition.
- [x] Aucune régression n'est détectée par les tests.
- [x] Pour les forks de dépôts externes (notamment OpenFisca), une pull request proposant nos modifications a été ouverte.
- [x] Une revue de code a été faite sur les modifications.

### Déploiement → Communication

- [x] Aucune régression n'est détectée sur les tests applicables en production (Ludwig, tests d'intégration).

### Communication → Fait

- [x] Si la fonctionnalité touche les utilisateurs, une [release](https://github.com/sgmap/cout-embauche/releases), et potentiellement un tweet, l'ont annoncée.


Contribuer au code
==================

Cette application utilise du JavaScript [Vanilla](http://vanilla-js.com).
