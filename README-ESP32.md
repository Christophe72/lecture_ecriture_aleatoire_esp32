# Lecture/Écriture ESP32 - Interface DHT22

Application React TypeScript pour afficher les données d'un capteur DHT22 connecté à un ESP32.

## 🚀 Fonctionnalités

- ✅ Affichage en temps réel des données de température et d'humidité
- ✅ Interface utilisateur moderne et responsive
- ✅ Gestion d'erreurs et état de chargement
- ✅ Code TypeScript avec types stricts
- ✅ Validation des données reçues
- ✅ Serveur mock pour les tests

## 📋 Prérequis

- Node.js (version 16 ou supérieure)
- pnpm ou npm
- ESP32 avec capteur DHT22 (ou utiliser le serveur mock)

## 🛠️ Installation

1. Cloner le repository
2. Installer les dépendances :
   ```bash
   pnpm install
   ```

## 🎯 Utilisation

### Option 1 : Avec serveur mock (pour les tests)

1. Installer les dépendances du serveur mock :

   ```bash
   # Copier le package.json mock
   cp mock-server-package.json package-mock.json
   # Installer dans un dossier temporaire
   mkdir mock-temp && cd mock-temp
   npm init -y
   npm install express cors nodemon
   cd ..
   ```

2. Démarrer le serveur mock :

   ```bash
   node mock-server.js
   ```

3. Dans un autre terminal, démarrer l'application React :

   ```bash
   pnpm dev
   ```

4. Ouvrir http://localhost:5173 dans votre navigateur

### Option 2 : Avec ESP32 réel

1. Configurer votre ESP32 pour envoyer des données JSON sur `http://localhost:5000/dht22`
2. Le format attendu est :

   ```json
   {
     "temperature": 23.5,
     "humidity": 65.2
   }
   ```

3. Démarrer l'application React :
   ```bash
   pnpm dev
   ```

## 🏗️ Structure du projet

```
src/
├── App.tsx              # Composant principal
├── App.css              # Styles CSS
├── useDht22Data.ts      # Hook personnalisé pour récupérer les données
├── main.tsx             # Point d'entrée
└── index.css            # Styles globaux

mock-server.js           # Serveur mock pour les tests
```

## 🔧 Configuration

L'application récupère les données toutes les 2 secondes depuis `http://localhost:5000/dht22`.

Pour changer l'URL ou la fréquence, modifiez le fichier `src/useDht22Data.ts`.

## 📱 Interface

L'interface affiche :

- État de chargement initial
- Messages d'erreur en cas de problème de connexion
- Température en °C (avec 1 décimale)
- Humidité en % (avec 1 décimale)
- Design responsive et moderne

## 🐛 Dépannage

- **Erreur de connexion** : Vérifiez que le serveur ESP32 ou mock fonctionne sur le port 5000
- **Données invalides** : L'application valide que les données reçues sont des nombres
- **CORS** : Le serveur mock inclut les headers CORS nécessaires

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
