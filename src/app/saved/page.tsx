"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { College } from "@/types";
import CollegeCard from "@/components/college/CollegeCard";
import Link from "next/link";

export default function SavedPage() {
  const { user, loading: authLoading } = useAuth();
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Agar auth state resolve nahi hui hai, toh rukna padega
    if (authLoading) return;
    
    // Agar user logged in nahi hai, toh loaders off kar do
    if (!user) { 
      setLoading(false); 
      return; 
    }

    setLoading(true);
    fetch("/api/saved")
      .then((r) => {
        if (!r.ok) throw new Error("Network response failure");
        return r.json();
      })
      .then((data) => {
        // Safe check taaki data structural mismatch na ho
        setColleges(data.data || data || []);
      })
      .catch((err) => console.error("Error fetching saved colleges:", err))
      .finally(() => setLoading(false));
  }, [user, authLoading]);

  const handleRemove = async (id: string) => {
    // Optimistic UI updates - Pehle UI se hatao taaki smoothness bani rahe
    setColleges((prev) => prev.filter((c) => c.id !== id));

    try {
      // Backend ko actual REST payload sync bhejo
      const res = await fetch("/api/colleges/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collegeId: id }),
      });
      
      if (!res.ok) {
        throw new Error("Failed to sync status on server");
      }
    } catch (error) {
      console.error("Database alignment error:", error);
      // Fallback: Agar server crash ho jaye toh items ko dubara state me daal do
      fetch("/api/saved")
        .then((r) => r.json())
        .then((data) => setColleges(data.data || data || []));
    }
  };

  if (authLoading || loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="h-6 w-48 bg-slate-200 rounded animate-pulse mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 h-72 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Login to see saved colleges</h2>
        <p className="text-gray-500 mb-6">Create an account to save colleges and revisit them anytime</p>
        <Link href="/auth/login" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Saved Colleges</h1>
          <p className="text-gray-500 text-sm mt-1">
            {colleges.length} college{colleges.length !== 1 ? "s" : ""} saved
          </p>
        </div>
        <Link href="/colleges" className="text-sm text-blue-600 font-medium hover:underline">
          + Find more
        </Link>
      </div>

      {colleges.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
          <div className="text-6xl mb-4">❤️</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No saved colleges yet</h3>
          <p className="text-gray-500 text-sm mb-6">Click the heart icon on any college card to save it here</p>
          <Link href="/colleges" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 text-sm transition-colors">
            Browse Colleges
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {colleges.map((college) => (
            <CollegeCard
              key={college.id}
              college={{ ...college, isSaved: true }}
              onSaveToggle={(id) => handleRemove(id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
