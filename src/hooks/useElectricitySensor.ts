import { useEffect, useState, useCallback } from "react";

export default function useElectricitySensor() {
  const [power, setPower] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const updateElectricity = useCallback(() => {
    const simulatedPower = Math.random() * 5000; // Simule des valeurs entre 0 et 5000 watts
    setPower(parseFloat(simulatedPower.toFixed(1)));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const delay = Math.random() * 500; // Ajout d'un délai aléatoire
    updateElectricity();
    const interval = setInterval(updateElectricity, 2000 + delay);
    return () => clearInterval(interval);
  }, [updateElectricity]);

  return { power, isLoading };
}
