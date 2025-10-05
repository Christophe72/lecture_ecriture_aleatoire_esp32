import { useCallback, useMemo, useState, type PropsWithChildren } from "react";
import {
  LoadingContext,
  type LoadingContextValue,
} from "./LoadingContextBase.tsx";

// Conserve uniquement le Provider ici pour satisfaire le fast refresh

export function LoadingProvider({ children }: PropsWithChildren) {
  const [count, setCount] = useState(0);
  const [initialCount, setInitialCount] = useState(0);

  const begin = useCallback((opts?: { initial?: boolean }) => {
    setCount((c) => c + 1);
    if (opts?.initial) setInitialCount((c) => c + 1);
  }, []);

  const end = useCallback((opts?: { initial?: boolean }) => {
    setCount((c) => Math.max(0, c - 1));
    if (opts?.initial) setInitialCount((c) => Math.max(0, c - 1));
  }, []);

  const withLoading = useCallback(
    async <T,>(fn: () => Promise<T>, opts?: { initial?: boolean }) => {
      begin(opts);
      try {
        return await fn();
      } finally {
        end(opts);
      }
    },
    [begin, end]
  );

  const value = useMemo<LoadingContextValue>(
    () => ({
      count,
      initialCount,
      isLoading: count > 0,
      isInitialLoading: initialCount > 0,
      begin,
      end,
      withLoading,
    }),
    [begin, count, end, initialCount, withLoading]
  );

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
}

export default LoadingProvider;
