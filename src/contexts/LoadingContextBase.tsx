import { createContext, useContext } from "react";

export type LoadingContextValue = {
  count: number;
  initialCount: number;
  isLoading: boolean;
  isInitialLoading: boolean;
  begin: (opts?: { initial?: boolean }) => void;
  end: (opts?: { initial?: boolean }) => void;
  withLoading: <T>(fn: () => Promise<T>, opts?: { initial?: boolean }) => Promise<T>;
};

export const LoadingContext = createContext<LoadingContextValue | undefined>(undefined);

export function useLoading() {
  const ctx = useContext(LoadingContext);
  if (!ctx) throw new Error("useLoading doit être utilisé dans un LoadingProvider");
  return ctx;
}
