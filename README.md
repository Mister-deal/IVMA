IVMA - Inventory Management Application

IVMA est une application fullstack de gestion de stocks conçue pour les besoins des entreprises, avec une interface web et web mobile.
Elle permet de suivre les produits, gérer les mouvements de stock, et générer des alertes en temps réel.
📌 Fonctionnalités
📦 Gestion des produits

    Ajout, modification et suppression de produits

    Suivi des quantités en stock

    Alertes de stock faible

    Génération de codes QR pour les produits

🔄 Mouvements de stock

    Historique des entrées/sorties

    Signature électronique pour validation

    Association des mouvements aux utilisateurs

👥 Gestion des utilisateurs

    Système de rôles (admin, manager, employé)

    Authentification sécurisée (JWT)

    Réinitialisation de mot de passe

📊 Tableau de bord

    Statistiques en temps réel

    Export des données (CSV, PDF)

    Notifications pour les alertes

📱 Responsive Design

    Interface adaptée pour web et mobile

    Expérience utilisateur optimisée

🛠️ Technologies utilisées
Frontend

    Angular (avec hooks et context API)

    Ionic (pour la version mobile)

    Chakra UI / Material-UI (design system)

    Axios (requêtes HTTP)

Backend

    Node.js (runtime JavaScript)

    Express.js (framework API)

    Prisma (ORM pour la base de données)

    JWT (authentification)

    Swagger (documentation API)

Base de données

    Mysql (base relationnelle)

DevOps & Déploiement

    Docker (containerisation)

    GitHub Actions (CI/CD)

🚀 Installation
Prérequis

    Node.js v18+

    MySQL 

    Ionic CLI (npm i -g @ionic/cli)

# 1. Cloner le dépôt
git clone https://github.com/Mister-deal/IVMA.git
cd IVMA

# 2. Backend
cd backend
npm install
cp .env.example .env # Configurer les variables
npx prisma migrate dev
npm run dev

# 3. Frontend Web
cd ../frontend
npm install
ng serve

# 4. Mobile
cd ../mobile
npm install
ionic serve # Pour le web mobile
ionic capacitor run android # Pour build mobile

📱 Captures d'écran

Version Web
Dashboard Web

Version Mobile
App Mobile
📊 Architecture
Copy

IVMA/
├── backend/          # API Node.js
├── frontend/         # Angular Web
├── mobile/           # Ionic Mobile
├── docker-compose.yml
└── README.md

📄 Documentation
Documentation	Lien
API Swagger	http://localhost:3000/api-docs

