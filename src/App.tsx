import { memo } from "react";
import useDht22Data from "./hooks/useDht22Data";
import useAirQualitySensor from "./hooks/useAirQualitySensor";
import useLightSensor from "./hooks/useLightSensor";
import useMotionSensor from "./hooks/useMotionSensor";
import useElectricitySensor from "./hooks/useElectricitySensor";
import "./App.css";

const SensorData = memo(function SensorData({
  label,
  value,
  unit,
}: {
  label: string;
  value: number | string | null;
  unit?: string;
}) {
  return (
    <div className="data-item">
      <span className="label">{label}:</span>
      <span className="value">
        {value !== null ? `${value}${unit || ""}` : "N/A"}
      </span>
    </div>
  );
});

function App() {
  const { temperature, humidity, isLoading, error } = useDht22Data();
  const { co2 } = useAirQualitySensor();
  const { luminosity } = useLightSensor();
  const { motionDetected } = useMotionSensor();
  const { power } = useElectricitySensor();

  if (isLoading) {
    return <p className="loading">Chargement des données...</p>;
  }

  if (error) {
    return (
      <div className="error">
        <p>Erreur: {error}</p>
        <p>
          Vérifiez que le serveur ESP32 est démarré sur http://localhost:5000
        </p>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Données ESP32/DHT22</h1>
      <div className="data-container">
        <SensorData label="Température" value={temperature} unit="°C" />
        <SensorData label="Humidité" value={humidity} unit="%" />
        <SensorData label="Qualité de l'air (CO2)" value={co2} unit=" ppm" />
        <SensorData label="Luminosité" value={luminosity} unit=" lux" />
        <SensorData
          label="Mouvement détecté"
          value={motionDetected ? "Oui" : "Non"}
        />
        <SensorData label="Consommation électrique" value={power} unit=" W" />
      </div>
    </div>
  );
}

export default App;
