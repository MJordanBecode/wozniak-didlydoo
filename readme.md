# API Documentation

## Introduction
Cette API permet la gestion d'événements et la gestion des présences des participants. Elle est basée sur Express et utilise un système de base de données simple pour stocker les événements et les participants.

## Installation

1. Clonez ce dépôt :
   ```sh
   git clone <repo-url>
   ```
2. Installez les dépendances :
   ```sh
   npm install
   ```
3. Démarrez le serveur :
   ```sh
   npm start
   ```

## Routes

### 1. Gestion des événements et des présences

| **Méthode** | **Route**                    | **Description**                                  | **Corps de requête (JSON)** | **Réponse (JSON)** |
|------------|-----------------------------|------------------------------------------------|---------------------------|-------------------|
| **GET**    | `/events`                    | Récupérer tous les événements                  | *Aucun*                   | Liste des événements |
| **GET**    | `/events/:_id`               | Récupérer un événement spécifique              | *Aucun*                   | Détails de l'événement |
| **POST**   | `/events`                    | Créer un nouvel événement                      | `{ "name": "Nom", "author": "Auteur", "description": "Texte", "dates": ["YYYY-MM-DD"] }` | Événement créé |
| **PATCH**  | `/events/:_id`               | Modifier un événement existant                 | `{ "name": "Nom", "description": "Texte" }` (champs modifiables) | Événement mis à jour |
| **DELETE** | `/events/:_id`               | Supprimer un événement                         | *Aucun*                   | `{ "message": "Delete successful" }` |
| **POST**   | `/events/:_id/attend`        | Ajouter un participant à un événement         | `{ "name": "Participant", "dates": ["YYYY-MM-DD"] }` | Événement mis à jour |
| **PATCH**  | `/events/:_id/attend`        | Modifier la présence d'un participant         | `{ "name": "Participant", "dates": ["YYYY-MM-DD"] }` | Événement mis à jour |
| **GET**    | `/attendees`                 | Récupérer tous les participants               | *Aucun*                   | Liste des participants |
| **GET**    | `/attendees/:_name`          | Récupérer un participant spécifique           | *Aucun*                   | Détails du participant |

## Middleware utilisé
- `idSpecific` : Vérifie la validité de l'ID d'un événement.
- `noBody` : Vérifie que le corps de la requête n'est pas vide.
- `getElem` : Récupère un élément spécifique depuis la base de données.
- `validation(schema)` : Valide les données envoyées avec un schéma prédéfini.

## Licence
Ce projet est sous licence MIT.
