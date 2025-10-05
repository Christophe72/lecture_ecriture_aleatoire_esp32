import { useEffect, useState, useCallback } from "react";

export default function useMotionSensor() {
  const [motionDetected, setMotionDetected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const updateMotion = useCallback(() => {
    const simulatedMotion = Math.random() > 0.5; // Simule une détection de mouvement aléatoire
    setMotionDetected(simulatedMotion);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const delay = Math.random() * 500; // Ajout d'un délai aléatoire
    updateMotion();
    const interval = setInterval(updateMotion, 2000 + delay);
    return () => clearInterval(interval);
  }, [updateMotion]);

  return { motionDetected, isLoading };
}
