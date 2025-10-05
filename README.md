# Lecture/Écriture ESP32 - Interface DHT22

Ce projet est une application React TypeScript qui affiche les données d'un capteur DHT22 connecté à un ESP32. Un serveur mock est inclus pour simuler les données si l'ESP32 n'est pas disponible.

## 🚀 Fonctionnalités

- Affichage en temps réel des données de température et d'humidité
- Interface utilisateur moderne et responsive
- Gestion des erreurs et état de chargement
- Serveur mock pour les tests
- Code TypeScript avec types stricts

## 📋 Prérequis

- Node.js (version 16 ou supérieure)
- npm ou pnpm
- ESP32 avec capteur DHT22 (ou utiliser le serveur mock)

## 🛠️ Installation

1. Clonez le repository :

   ```bash
   git clone <url-du-repository>
   cd lecture_ecriture_esp32
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

## 🎯 Utilisation

### Option 1 : Avec serveur mock

1. Installez les dépendances nécessaires pour le serveur mock :

   ```bash
   npm install express cors
   ```

2. Démarrez le serveur mock :

   ```bash
   node mock-server.mjs
   ```

3. Dans un autre terminal, démarrez l'application React :

   ```bash
   npm run dev
   ```

4. Ouvrez [http://localhost:5173](http://localhost:5173) dans votre navigateur.

### Option 2 : Avec ESP32 réel

1. Configurez votre ESP32 pour envoyer des données JSON sur `http://localhost:5000/dht22`.
2. Le format attendu est :
   ```json
   {
     "temperature": 23.5,
     "humidity": 65.2
   }
   ```
3. Démarrez l'application React :

   ```bash
   npm run dev
   ```

4. Ouvrez [http://localhost:5173](http://localhost:5173) dans votre navigateur.

## 🏗️ Structure du projet

```
lecture_ecriture_esp32/
├── src/
│   ├── App.tsx              # Composant principal
│   ├── App.css              # Styles CSS
│   ├── useDht22Data.ts      # Hook personnalisé pour récupérer les données
│   ├── main.tsx             # Point d'entrée
│   └── index.css            # Styles globaux
├── public/                  # Fichiers statiques
├── mock-server.mjs          # Serveur mock pour les tests
├── package.json             # Fichier de configuration npm
└── README.md                # Documentation du projet
```

## 🔧 Configuration

- L'application récupère les données toutes les 2 secondes depuis `http://localhost:5000/dht22`.
- Pour modifier l'URL ou la fréquence, éditez le fichier `src/useDht22Data.ts`.

## 🐛 Dépannage

- **Erreur : `Cannot find module 'express'`** : Installez les dépendances nécessaires avec `npm install express cors`.
- **Erreur : `require is not defined`** : Assurez-vous d'utiliser `node mock-server.mjs`.
- **Problème de connexion** : Vérifiez que le serveur ESP32 ou mock est démarré.
- **Données invalides** : L'application valide que les données reçues sont des nombres.

## 🛡️ Types TypeScript

L'application utilise des interfaces TypeScript strictes :

```typescript
interface Dht22Data {
  temperature: number;
  humidity: number;
}

interface UseDht22DataReturn {
  temperature: number | null;
  humidity: number | null;
  isLoading: boolean;
  error: string | null;
}
```
