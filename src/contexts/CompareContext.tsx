"use client";
// src/contexts/CompareContext.tsx
import React, { createContext, useContext, useState } from "react";
import { College } from "@/types";

interface CompareContextType {
  compareList: College[];
  addToCompare: (college: College) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isInCompare: (id: string) => boolean;
}

const CompareContext = createContext<CompareContextType | null>(null);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareList, setCompareList] = useState<College[]>([]);

  const addToCompare = (college: College) => {
    if (compareList.length >= 3) return;
    if (compareList.find((c) => c.id === college.id)) return;
    setCompareList((prev) => [...prev, college]);
  };

  const removeFromCompare = (id: string) => {
    setCompareList((prev) => prev.filter((c) => c.id !== id));
  };

  const clearCompare = () => setCompareList([]);

  const isInCompare = (id: string) => compareList.some((c) => c.id === id);

  return (
    <CompareContext.Provider
      value={{ compareList, addToCompare, removeFromCompare, clearCompare, isInCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}
