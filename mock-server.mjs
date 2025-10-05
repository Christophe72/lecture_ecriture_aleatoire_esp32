// Serveur mock pour simuler les données ESP32/DHT22
import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Fonction pour générer des données aléatoires réalistes
function generateMockData() {
  // Température entre 18°C et 28°C
  const temperature = 18 + Math.random() * 10;
  // Humidité entre 40% et 80%
  const humidity = 40 + Math.random() * 40;

  return {
    temperature: parseFloat(temperature.toFixed(1)),
    humidity: parseFloat(humidity.toFixed(1)),
    timestamp: new Date().toISOString(),
  };
}

// Route pour obtenir les données DHT22
app.get("/dht22", (req, res) => {
  const data = generateMockData();

  console.log(`[${new Date().toISOString()}] Données envoyées:`, data);

  res.json(data);
});

// Route de santé
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Serveur mock ESP32 fonctionnel",
    timestamp: new Date().toISOString(),
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur mock ESP32 démarré sur http://localhost:${PORT}`);
  console.log(
    `📊 Données DHT22 disponibles sur http://localhost:${PORT}/dht22`
  );
  console.log(`❤️  Santé du serveur sur http://localhost:${PORT}/health`);
});
