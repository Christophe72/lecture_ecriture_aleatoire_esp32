import useDht22Data from "./useDht22Data";
import "./App.css";

function App() {
  const { temperature, humidity, isLoading, error } = useDht22Data();

  return (
    <div className="app">
      <h1>Données ESP32/DHT22</h1>

      {isLoading && <p className="loading">Chargement des données...</p>}

      {error && (
        <div className="error">
          <p>Erreur: {error}</p>
          <p>
            Vérifiez que le serveur ESP32 est démarré sur http://localhost:5000
          </p>
        </div>
      )}

      {!isLoading && !error && (
        <div className="data-container">
          <div className="data-item">
            <span className="label">Température:</span>
            <span className="value">
              {temperature !== null ? `${temperature.toFixed(1)}°C` : "N/A"}
            </span>
          </div>
          <div className="data-item">
            <span className="label">Humidité:</span>
            <span className="value">
              {humidity !== null ? `${humidity.toFixed(1)}%` : "N/A"}
            </span>
          </div>
        </div>
      )}

      {!isLoading && !error && (temperature === null || humidity === null) && (
        <p className="warning">Aucune donnée disponible</p>
      )}
    </div>
  );
}

export default App;
