# 🌟 Conventions GitHub: Commits & Push

## 📌 Introduction

Ce document décrit les conventions à suivre pour les commits et les push sur GitHub afin de garantir un historique clair et structuré.

---

## 🔹 Conventions de Commit

### 1️⃣ Structure d’un Commit

Le format recommandé pour un commit est :

```sh
<type>(<scope>): <message>
```

Exemple :

```sh
feat(auth): ajout de l'authentification avec JWT
fix(ui): correction du bug d'affichage sur mobile
```

### 2️⃣ Types de Commit (Mots-clés)

| **Type**   | **Description** |
|------------|----------------|
| `feat`     | Ajout d'une nouvelle fonctionnalité |
| `fix`      | Correction d'un bug |
| `docs`     | Modification de la documentation |
| `style`    | Changement du style (indentation, espaces, etc.) sans impact sur le code |
| `refactor` | Refactorisation du code (sans ajout de fonctionnalités) |
| `perf`     | Amélioration des performances |
| `test`     | Ajout/modification de tests |
| `chore`    | Modifications mineures (build, CI/CD, etc.) |
| `revert`   | Annulation d'un commit précédent |

### 3️⃣ Bonnes Pratiques de Commit

- Un commit doit être atomique : une seule modification logique par commit.
- Utiliser des messages explicites : éviter `fix bug` ou `update`.
- Utiliser l'impératif : Écrire `add feature` au lieu de `added feature`.
- Séparer les commits : Ne pas mélanger corrections et nouvelles features.

### 4️⃣ Exemples de Commits Bien Rédigés

```sh
git commit -m "feat(api): ajout de la route GET /users"
git commit -m "fix(db): correction de la requête SQL pour PostgreSQL"
git commit -m "docs(readme): ajout des instructions d’installation"
```

---

## 🔹 Conventions de Push

### 1️⃣ Organisation des Branches

- `main` → Version stable en production  
- `develop` → Version en cours de développement  
- `feature/nom-feature` → Nouvelles fonctionnalités  
- `fix/nom-fix` → Corrections de bugs  
- `hotfix/nom-hotfix` → Correction urgente en production  
- `release/x.y.z` → Préparation d’une nouvelle version avant mise en production

### 2️⃣ Commandes de Base

```sh
git checkout -b feature/nouvelle-fonctionnalité  # Création d'une branche
git add .  # Ajout des fichiers modifiés
git commit -m "feat(core): implémentation de la nouvelle fonctionnalité"
git push origin feature/nouvelle-fonctionnalité  # Push vers GitHub
```

### 3️⃣ Faire un Rebase avant de Pusher

Si plusieurs personnes travaillent sur le projet, avant de pusher :

```sh
git checkout develop
git pull origin develop  # Récupération des dernières modifications
git checkout feature/nom-feature
git rebase develop  # Rebase pour garder un historique propre
git push origin feature/nom-feature
```

### 4️⃣ Créer une Pull Request (PR)

- Aller sur GitHub  
- Créer une PR de `feature/nom-feature` vers `develop`  
- Ajouter une description claire  
- Assigner des reviewers  

---

💡 **Bonnes Pratiques** :
- ✅ Un commit = une modification précise  
- ✅ Toujours tester son code avant un commit  
- ✅ Éviter `git commit -m "fix"` (pas explicite)  
- ✅ Éviter de pusher directement sur `main`  
- ✅ Utiliser des branches dédiées pour chaque feature/fix  

---

## 📜 Licence

Ce projet est sous licence MIT.
