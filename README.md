# 🚀 Job Tracker - Application Full-Stack de Suivi de Candidatures

![Démo de Job Tracker](https://raw.githubusercontent.com/AlexisRevol/job-tracker/main/.github/assets/demo.gif)

### Badges & Qualité

| Catégorie      | Badge                                                                                                                                                                                            |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Qualité**    | [![CodeFactor](https://www.codefactor.io/repository/github/alexisrevol/job-tracker/badge)](https://www.codefactor.io/repository/github/alexisrevol/job-tracker) |
| **CI/CD**      | [![Backend Tests](https://github.com/AlexisRevol/job-tracker/actions/workflows/backend.tests.yml/badge.svg)](https://github.com/AlexisRevol/job-tracker/actions/workflows/backend.tests.yml) [![Frontend Lint](https://github.com/AlexisRevol/job-tracker/actions/workflows/frontend.lint.yml/badge.svg)](https://github.com/AlexisRevol/job-tracker/actions/workflows/frontend.lint.yml) [![Frontend Tests](https://github.com/AlexisRevol/job-tracker/actions/workflows/frontend.tests.yml/badge.svg)](https://github.com/AlexisRevol/job-tracker/actions/workflows/frontend.tests.yml)                                |
| **Licence**    | [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)                                                                                        |
| **Backend**    | ![Python](https://img.shields.io/badge/Python-3.11-3776AB.svg?logo=python) ![FastAPI](https://img.shields.io/badge/FastAPI-0.103.2-009688.svg?logo=fastapi) ![Poetry](https://img.shields.io/badge/Poetry-1.6.1-60A5FA.svg?logo=poetry) ![Pytest](https://img.shields.io/badge/Pytest-7.4.2-0A9EDC.svg?logo=pytest) |
| **Frontend**   | ![Angular](https://img.shields.io/badge/Angular-16.2.0-DD0031.svg?logo=angular) ![TypeScript](https://img.shields.io/badge/TypeScript-5.1.3-3178C6.svg?logo=typescript) ![Karma](https://img.shields.io/badge/Karma-6.4.2-56C5A8.svg?logo=karma) |

---

**Job Tracker** est une application web **production-ready** conçue pour centraliser, gérer et analyser le processus de recherche d'emploi. 

---

## ✨ Fonctionnalités Principales

*   🔐 **Authentification Sécurisée :** Système complet de création de compte et de connexion basé sur des **tokens JWT** (Access & Refresh tokens) pour sécuriser l'accès aux données de chaque utilisateur.
*   📊 **Dashboard Analytique :** Une page d'accueil dynamique qui présente des statistiques clés sur vos candidatures (nombre total, statuts, etc.) pour une visualisation rapide de votre progression.
*   ⚙️ **Gestion Complète (CRUD) :** Interface intuitive pour créer, lire, mettre à jour et supprimer des candidatures avec des informations détaillées.
*   ✅ **Tests Automatisés :** Le projet est couvert par des tests unitaires et d'intégration pour le backend (`pytest`) et des tests unitaires pour le frontend (`Karma`), garantissant la stabilité et la fiabilité de l'application. [1]
*   🚀 **CI/CD avec GitHub Actions :** Un pipeline d'intégration continue est configuré pour lancer automatiquement les tests du backend et du frontend à chaque `push`, assurant ainsi la non-régression et la qualité du code en permanence. [1]
*   📖 **API Auto-Documentée :** L'API FastAPI génère automatiquement une documentation interactive via **Swagger UI** et **ReDoc**, rendant l'API facile à comprendre et à tester.

---

## 🛠️ Architecture et Stack Technique

### 🐍 **Backend (API RESTful)**

Le backend est construit sur une architecture solide, découplée et performante, en utilisant des outils de premier plan de l'écosystème Python.

-   **Framework :** **FastAPI** pour sa rapidité (basé sur Starlette et Pydantic), son typage moderne et ses performances asynchrones.
-   **Gestion de Projet :** **Poetry** pour une gestion des dépendances déterministe et un environnement de développement isolé. [1]
-   **ORM :** **SQLAlchemy** pour une interaction sûre et flexible avec la base de données (SQLite par défaut).
-   **Validation :** **Pydantic** pour la validation, la sérialisation et la documentation automatiques des modèles de données.
-   **Tests :** **Pytest** pour une suite de tests complète, testant les endpoints, la logique métier et les interactions avec la base de données. [1]

### 🅰️ **Frontend (Single Page Application)**

Le frontend est une SPA moderne et réactive, offrant une expérience utilisateur fluide.

-   **Framework :** **Angular** pour sa structure robuste, son écosystème complet et ses performances.
-   **Langage :** **TypeScript** pour un code plus sûr, plus lisible et plus maintenable.
-   **State Management :** Services Angular et programmation réactive (RxJS) pour gérer l'état de l'application.
-   **Tests :** **Karma** et **Jasmine** pour les tests unitaires des composants, assurant la fiabilité de l'interface utilisateur.

---

## 🚀 Lancement en Local

### Prérequis
*   Node.js et npm
*   Python 3.11+
*   Poetry (`pip install poetry`)
*   Angular CLI (`npm install -g @angular/cli`)

### 1. Cloner et préparer le projet

```bash
git clone https://github.com/AlexisRevol/job-tracker.git
cd job-tracker
```

### 2. Lancer le Backend

```bash
# Aller dans le dossier backend
cd backend/

# Installer les dépendances avec Poetry
poetry install

# Activer l'environnement virtuel
poetry shell

# Lancer le serveur (avec hot-reload)
uvicorn main:app --reload
```
> 🔹 L'API sera disponible sur `http://127.0.0.1:8000`.
> 🔹 La documentation Swagger UI est sur `http://127.0.0.1:8000/docs`.

### 3. Lancer le Frontend (dans un autre terminal)

```bash
# Aller dans le dossier frontend
cd frontend/

# Installer les dépendances
npm install

# Lancer le serveur de développement
ng serve
```
> 🔸 L'application sera accessible sur `http://localhost:4200/`.

---

## 👤 Auteur

**Alexis Revol**

*   **GitHub :** [@AlexisRevol](https://github.com/AlexisRevol)
*   **LinkedIn :** [linkedin.com/in/alexis-revol-b68427180/](https://www.linkedin.com/in/alexis-revol-b68427180/)

Un projet construit avec passion pour démontrer des compétences concrètes en développement full-stack. N'hésitez pas à me contacter pour toute question ou opportunité !