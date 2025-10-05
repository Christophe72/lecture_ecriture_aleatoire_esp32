#!/bin/bash

# Script pour démarrer le serveur mock ESP32
echo "🚀 Démarrage du serveur mock ESP32..."

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez installer Node.js."
    exit 1
fi

# Vérifier si les modules sont disponibles
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    
    # Créer un package.json temporaire pour les dépendances du serveur mock
    cat > package-temp.json << EOF
{
  "name": "esp32-mock-temp",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5"
  }
}
EOF

    # Installer les dépendances
    npm install --package-lock=package-temp.json
    
    # Nettoyer
    rm package-temp.json
fi

echo "🎯 Serveur mock démarré avec succès !"
echo "📊 Données DHT22 disponibles sur http://localhost:5000/dht22"
echo "❤️  Santé du serveur sur http://localhost:5000/health"
echo ""
echo "Pour arrêter le serveur, utilisez Ctrl+C"
echo ""

# Démarrer le serveur mock
node mock-server.js