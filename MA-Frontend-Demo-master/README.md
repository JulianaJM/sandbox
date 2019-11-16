# Test d'évaluation Front-end

## Présentation

L'outil est une web-application permettant la visualisation de tous les messages envoyés à une agence.
Les messages peuvent être de plusieurs types différents: e-mail, SMS, vocal...
Il est donc destiné à un collaborateur d'une agence. Il peut visualiser les messages pour une ou plusieurs agences à laquelle il est attaché.
Le but de l'exercice est donc d'implémenter le code client de l'application avec à disposition une API JSON

## Fonctionalités

- Je peux changer d'agence et je vois la liste des message de la dite agence
- Je peux faire défiler la liste des message sur plusieurs pages
- Je clique sur un message et je vois le détail du message
  - Si le message n'était pas lu le compteur se décrémente

## Taches

- Intégrer la version mobile
- Intégrer la liste des messages
- Intégrer la lecture d'un message
- Intégrer la possibilité de changer d'agence (dropdown HTML classique)
- Gérer le compteur de message non-lus
- Gérer la pagination (infinite scroll)

## Bonus de points

- Pouvoir accéder à un message directement depuis l'URL (routing)
- Respecter les maquettes graphiques
  - Element lus/non lus
  - Compteur grisé si 0 message non lu
- Implémenter des dates relatives sur la liste des messages
- Intégrer la version desktop
- Tests unitaires

## Contraintes techniques

- Framework et outillage obligatoire mais libre
- Utiliser l'API
- Qualité de rédaction du code

## Contenu

Les maquettes au format [Sketch](https://www.sketch.com) et [PDF](Maquettes.pdf) sont fournies.
Des _assets_ sont disponibles dans le dossier éponyme.

## API Endpoints

Replace `API_URL` by the one provided or `http://localhost:8080` if you have started it manually (cf. [CONTRIBUTING](CONTRIBUTING.md))

- Realtor list

  - `curl ${API_URL}/realtors`

- Realtor details

  - `curl ${API_URL}/realtors/101`

- Realtor messages list

  - `curl ${API_URL}/realtors/101/messages`
  - `curl ${API_URL}/realtors/101/messages?page=2`

- Single message details

  - `curl ${API_URL}/realtors/101/messages/1001`

- Mark a message as read (data could be `application/x-www-form-urlencoded` or `application/json`)
  - `curl -X PATCH -d 'read=0' ${API_URL}/realtors/101/messages/1001` (explicit mark as read)
  - `curl -X PATCH -H "Content-Type: application/json" http://localhost:8080/realtors/101/messages/1001 -d '{"read":false}' (explicit mark as unread)
    curl -X PATCH -H "Content-Type: application/json" http://34.76.245.13/realtors/101/messages/1062 -d '{"read":true}'
