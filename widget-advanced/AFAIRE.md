Intégration :


  Q
  - qui met à jour les résultats du widget ?

Moteur :
- Chaque élément (FormDecorated ou Group) a une prop `when` qui définit si elle est affichée ou non.
- Cela fonctionne comme une liste chaînée. Pour un enchaînement simple, on vérifiera le .dirty de l'élément précédent ?
- Pour un enchaînement conditionnel, on utilisera la valeur du champs
- Pour supporter le "je passe" de l'utilisateur, ou l'annulation d'un choix précédemment fait, `pass` est une réponse possible qui doit pouvoir être donnée à une forme. .dirty veut donc dire que l'utilisateur a vu cette question, et y a répondu ou l'a passée, donc que l'on peut passer à la suite. Ou alors utiliser `touched` qui semble pouvoir dire si la Form a été annulée. Non ça n'a pas l'air de marcher.
Bouton `annuler` / `non renseigné` -> dans certains cas, choix au niveau du front de la valeur a appliquer. Mais cela affiche quoi comme résultat ?
Ou pour l'instant, ne pas gérer de bouton annuler !!
- Un groupe doit avoir une valeur terminale, une `conclusion`, sur laquelle les futures Forms peuvent construire des conditions.

==> cela nous permet, à partir des données des forms seulement (state.form géré par redux-form), d'avoir :
- des formes complétées (ou "passées"), dont seul le résumé est affiché. Elles ont été validées (submitted) et l'état est sauvé dans le state.submitted = {[formName]: true | false}
  Pour un radio, on la validera au click sur un bouton. Pour un input, au clic sur un bouton 'Valider'. Pour un RadioInput, au clic sur 'Non' ou sur 'Oui' -> Input -> 'Valider.'
- une forme active : dépliée pour que l'utilisateur puisse y répondre. Son `when` est satisfait. Elle devrait être la seule dans ce cas... sauf pour les retours de l'utilisateur sur une forme complétée. Un clic sur son titre / résumé annule son 'submitted', elle se rouvre donc, mais en gardant la réponse de l'utilisateur (et donc, les formes dépendantes ne sont pas affectées à ce moment là). Son action pourra la re-valider, et potentiellement modifier la cascade.
- des forms cachées en fonction du `when` car pas encore d'actualité ou dont les conditions ne sont pas remplies.
- renderHeader qui est dans FormDecorator ne devrait pas être spécifique à un type de forme. Il devrait juste avoir à afficher un résultat, qui sera geré par la forme. On imagine donc que celle-ci renseignera un champ "result" générique. Revoir le principe de redux-form ! Notamment l'example radio, pour finir Question.

Implémentation actuelle :
(: Now that Input, continue until Select)

- Groups of questions. Visible (css) and invisible groups (just for conditionals factorization).
- try to implement a draft of AT/MP
  - New Select form
  Connaissez-vous votre taux ?
  when code-risque is TC || effectif < 20
  -> taux
  when effectif > 200
  -> estimation du taux, expliquer l'importante nuance

  Pour l'instant nous travaillons sur un dépot github indépendant.
  Il faut pouvoir spécifier le code risque et l'envoyer comme une variable à OpenFisca.
  Il faut pouvoir obtenir une liste de codes risques, leur noms et le taux correspondant.
  Openfisca-web-api/assets ? Ou possible de le faire dans le cadre actuel ? Params ?
  Garder l'entrée simple ? taux élevé, bas etc.


Questions :

- [ui] indiquer subtilement où est l'action de l'utilisateur : le champ de réponse dans les apps de messagerie.

- [ui] comment utiliser le logo habituel à gauche du message ? Y mettre les groupes ? Y mettre l'acteur concerné (URSSAF, Carsat...)

- [ui] avancement global / par groupe

- resume is human text, result is the machine value ?

- [expressivité] formName en plus de form c'est chiant. Pour l'instant, pas vraiment de solution. Sauf à créer un nouveau Decorator qui set le reduxForm( form: XX) et le passe en props, mais ça fait une couche en plus.

- Intégrer tout ce bordel au widget primaire

- [expressivité] Rendre les conditions de forms plus naturelles (vraies phrase -> abc-def-g, ...)
  - access form field without specifying `.value`
  - one prop for condition, one for conditionvalue ?
