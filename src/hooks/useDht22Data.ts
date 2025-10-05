import { useEffect, useState } from "react";
import { useLoading } from "../contexts/LoadingContextBase";

// Interface pour définir le type des données DHT22
interface Dht22Data {
  temperature: number;
  humidity: number;
}

// Interface pour le retour du hook
interface UseDht22DataReturn {
  temperature: number | null;
  humidity: number | null;
  isLoading: boolean;
  error: string | null;
}

export default function useDht22Data(): UseDht22DataReturn {
  const { begin, end } = useLoading();
  const [temperature, setTemperature] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (initial = false) => {
      try {
        setIsLoading(true);
        if (initial) begin({ initial: true });
        else begin();
        setError(null);

        const response = await fetch("http://localhost:5000/dht22");

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data: Dht22Data = await response.json();

        // Validation des données
        if (
          typeof data.temperature === "number" &&
          typeof data.humidity === "number"
        ) {
          setTemperature(data.temperature);
          setHumidity(data.humidity);
        } else {
          throw new Error("Données reçues invalides");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
        console.error("Erreur lors de la récupération des données:", err);
      } finally {
        setIsLoading(false);
        end({ initial });
      }
    };

    // Fetch initial
    fetchData(true);

    // Mise à jour périodique toutes les 2 secondes
    const interval = setInterval(() => fetchData(false), 2000);

    return () => clearInterval(interval);
  }, [begin, end]);

  return { temperature, humidity, isLoading, error };
}
