import { useEffect, useState, useCallback } from "react";

export default function useLightSensor() {
  const [luminosity, setLuminosity] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const updateLight = useCallback(() => {
    const simulatedLuminosity = Math.random() * 1000; // Simule des valeurs entre 0 et 1000 lux
    setLuminosity(parseFloat(simulatedLuminosity.toFixed(1)));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const delay = Math.random() * 1000; // Ajout d'un délai aléatoire
    const interval = setInterval(updateLight, 2000 + delay);
    return () => clearInterval(interval);
  }, [updateLight]);

  return { luminosity, isLoading };
}
