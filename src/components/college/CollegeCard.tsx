"use client";
// src/components/college/CollegeCard.tsx
import Link from "next/link";
import { College } from "@/types";
import StarRating from "@/components/ui/StarRating";
import { useAuth } from "@/contexts/AuthContext";
import { useCompare } from "@/contexts/CompareContext";
import { useState } from "react";

interface CollegeCardProps {
  college: College;
  onSaveToggle?: (id: string, saved: boolean) => void;
}

const typeColors: Record<string, string> = {
  IIT: "bg-blue-100 text-blue-700",
  NIT: "bg-purple-100 text-purple-700",
  Private: "bg-orange-100 text-orange-700",
  Deemed: "bg-green-100 text-green-700",
  Government: "bg-teal-100 text-teal-700",
};

export default function CollegeCard({ college, onSaveToggle }: CollegeCardProps) {
  const { user } = useAuth();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const [isSaved, setIsSaved] = useState(college.isSaved || false);
  const [savingLoading, setSavingLoading] = useState(false);

  const inCompare = isInCompare(college.id);

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      window.location.href = "/auth/login";
      return;
    }
    setSavingLoading(true);
    try {
      const method = isSaved ? "DELETE" : "POST";
      const res = await fetch("/api/saved", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collegeId: college.id }),
      });
      if (res.ok) {
        setIsSaved(!isSaved);
        onSaveToggle?.(college.id, !isSaved);
      }
    } finally {
      setSavingLoading(false);
    }
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inCompare) {
      removeFromCompare(college.id);
    } else {
      addToCompare(college as College);
    }
  };

  return (
    <Link href={`/colleges/${college.slug}`} className="group block">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all duration-200">
        {/* Image */}
        <div className="relative h-44 bg-gradient-to-br from-blue-100 to-indigo-200 overflow-hidden">
          {college.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={college.imageUrl}
              alt={college.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-5xl font-bold text-blue-300">{college.name.charAt(0)}</span>
            </div>
          )}
          {/* Save button */}
          <button
            onClick={handleSave}
            disabled={savingLoading}
            className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:scale-110 transition-transform"
          >
            <svg
              className={`w-4 h-4 ${isSaved ? "text-red-500 fill-red-500" : "text-gray-400"}`}
              fill={isSaved ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* Type badge */}
          <div className="absolute top-3 left-3">
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${typeColors[college.type] || "bg-gray-100 text-gray-700"}`}>
              {college.type}
            </span>
          </div>

          {/* NIRF Badge */}
          {college.rankingNIRF && (
            <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
              NIRF #{college.rankingNIRF}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
            {college.name}
          </h3>
          <p className="text-xs text-gray-500 flex items-center gap-1 mb-3">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {college.location}
          </p>

          <div className="flex items-center justify-between mb-3">
            <StarRating rating={college.rating} size="sm" />
            <span className="text-xs text-gray-400">{college.totalReviews.toLocaleString()} reviews</span>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-gray-50 rounded-lg p-2">
              <p className="text-xs text-gray-500">UG Fees</p>
              <p className="text-xs font-semibold text-gray-800">
                ₹{(college.fees.ug / 100000).toFixed(1)}L/yr
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-2">
              <p className="text-xs text-gray-500">Avg Package</p>
              <p className="text-xs font-semibold text-gray-800">
                ₹{(college.placements.avgPackage / 100000).toFixed(1)}L
              </p>
            </div>
          </div>

          <button
            onClick={handleCompare}
            className={`w-full text-xs font-medium py-1.5 rounded-lg border transition-colors ${
              inCompare
                ? "bg-blue-600 text-white border-blue-600"
                : "text-blue-600 border-blue-200 hover:bg-blue-50"
            }`}
          >
            {inCompare ? "✓ Added to Compare" : "+ Compare"}
          </button>
        </div>
      </div>
    </Link>
  );
}
