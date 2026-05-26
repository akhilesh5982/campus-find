"use client";
// src/components/college/CompareBar.tsx
import { useCompare } from "@/contexts/CompareContext";
import Link from "next/link";

export default function CompareBar() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm font-semibold text-gray-700">
            Compare ({compareList.length}/3):
          </span>
          {compareList.map((college) => (
            <div key={college.id} className="flex items-center gap-1 bg-blue-50 border border-blue-200 rounded-full px-3 py-1">
              <span className="text-xs font-medium text-blue-700 max-w-[150px] truncate">
                {college.name}
              </span>
              <button
                onClick={() => removeFromCompare(college.id)}
                className="text-blue-400 hover:text-blue-600 ml-1"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={clearCompare}
            className="text-xs text-gray-500 hover:text-red-500 transition-colors"
          >
            Clear
          </button>
          <Link
            href="/compare"
            className="text-xs font-medium bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            Compare Now →
          </Link>
        </div>
      </div>
    </div>
  );
}
