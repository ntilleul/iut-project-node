# 🎬 IUT Project - API Films & Notifications

## 📌 Présentation du projet

Cette application est une API REST développée en Node.js avec le framework Hapi (hapipal).  
Elle permet de :

- Gérer des utilisateurs avec authentification JWT
- Gérer une bibliothèque de films (CRUD complet)
- Gérer une liste de films favoris par utilisateur
- Envoyer des notifications par email
- Générer un export CSV des films via un système asynchrone (message broker simulé)
- Tester l'application avec une couverture maximale (Lab)

Le projet met en pratique :
- Authentification & gestion de rôles (admin / user)
- Validation avec Joi
- ORM avec Objection.js via Schwifty
- Services métier via Schmervice
- Migrations avec Knex
- Envoi d’emails avec Nodemailer
- Gestion d’environnement sécurisé

---

### Organisation

- **Routes** → Gestion HTTP
- **Services** → Logique métier
- **Models** → Interaction base de données (Objection.js)
- **Migrations** → Gestion du schéma SQL (Knex)
- **Plugins** → Configuration serveur (auth, mail, etc.)

---

# 🔐 Gestion des rôles

Deux scopes sont définis :

- `admin`
- `user`

| Action | user | admin |
|--------|------|-------|
| Voir les films | ✅ | ✅ |
| Ajouter un film | ❌ | ✅ |
| Modifier un film | ❌ | ✅ |
| Supprimer un film | ❌ | ✅ |
| Gérer ses favoris | ✅ | ✅ |
| Export CSV | ❌ | ✅ |

Les permissions sont configurées directement dans les routes via `auth.scope`.

---

# ⚙️ Installation

## 1️⃣ Cloner le projet

```bash
git clone https://github.com/ntilleul/iut-project-node.git
cd iut-project
```

## 2️⃣ Installer les dépendances

```bash
npm install
```

---

# 🌍 Configuration des variables d’environnement

Créer un fichier .env à la racine du projet.

## 🔧 Configuration serveur

```bash
PORT=3000
HOST=localhost
# Configuration base de données (MySQL)
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=iut_project
🔐 Configuration JWT
JWT_SECRET=secretkey
📧 Configuration Email (Ethereal recommandé)
MAIL_HOST=smtp.ethereal.email
MAIL_PORT=587
MAIL_USER=your_ethereal_user
MAIL_PASS=your_ethereal_password
MAIL_FROM="IUT Project <no-reply@iutproject.com>"
```

---

# 🗄 Base de données
### Créer la base
```SQL
CREATE DATABASE iut_project;
```
### Lancer les migrations
```SQL
npx knex migrate:latest
```
### Rollback des migrations
```SQL
npx knex migrate:rollback
```

---

# 🚀 Lancer l’application
```bash
npm start
```

### L’API sera disponible sur :
```
http://localhost:3000
```
### Documentation Swagger :
```
http://localhost:3000/documentation
```

---

# 👤 Gestion des utilisateurs
## Création

- Mot de passe hashé avant stockage

- Scope par défaut : user

- Email de bienvenue envoyé automatiquement

## Authentification

- Génération d’un JWT

- Token requis pour accéder aux routes protégées

---

# 🎬 Gestion des films

Chaque film contient :

- `title`

- `description`

- `releaseDate`

- `director`

- `createdAt`

- `updatedAt`

## Fonctionnalités

- Création (admin uniquement)

- Modification (admin uniquement)

- Suppression (admin uniquement)

- Consultation (user et admin)

- Validation effectuée avec Joi.

---

# ❤️ Gestion des favoris

Relation Many-to-Many entre `user` et `film`.

## Règles métier

- Impossible d’ajouter deux fois le même film en favoris

- Impossible de supprimer un film non présent dans les favoris

- Suppression automatique des favoris si un film est supprimé

---

# 📧 Notifications
## Nouveau film

- Envoi d’un email à tous les utilisateurs

## Modification d’un film

- Envoi d’un email uniquement aux utilisateurs ayant le film en favoris

- Envoi réalisé via Nodemailer.

- Pour les tests, utilisation recommandée de :
```
https://ethereal.email
```

---

# 📦 Export CSV

Endpoint réservé aux administrateurs.

Fonctionnement :

- Génération d’un fichier CSV contenant tous les films

- Envoi du fichier en pièce jointe par email

- Aucun fichier retourné directement dans la réponse HTTP

---

# 🛠 Technologies utilisées

- Node.js
- Hapi
- Hapipal
- Objection.js
- Knex
- Joi
- JWT
- Nodemailer
- Lab
- MySQL
