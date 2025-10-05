import { useEffect, useState, useCallback } from "react";

export default function useAirQualitySensor() {
  const [co2, setCo2] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const updateAirQuality = useCallback(() => {
    const simulatedCo2 = 400 + Math.random() * 200; // Simule des valeurs entre 400 et 600 ppm
    setCo2(parseFloat(simulatedCo2.toFixed(1)));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const delay = Math.random() * 1000; // Ajout d'un délai aléatoire
    const interval = setInterval(updateAirQuality, 2000 + delay);
    return () => clearInterval(interval);
  }, [updateAirQuality]);

  return { co2, isLoading };
}
