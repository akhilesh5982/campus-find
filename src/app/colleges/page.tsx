"use client";
// src/app/colleges/page.tsx
import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { College } from "@/types";
import CollegeCard from "@/components/college/CollegeCard";

export const dynamic = "force-dynamic";

const TYPES = ["All", "IIT", "NIT", "Private", "Deemed", "Government"];
const CATEGORIES = ["All", "Engineering", "Medical", "Management", "Arts"];
const SORT_OPTIONS = [
  { label: "Best Rating", value: "rating" },
  { label: "NIRF Rank", value: "ranking" },
  { label: "Name A-Z", value: "name" },
];

function CollegesContent() {
  const searchParams = useSearchParams();

  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [type, setType] = useState(searchParams.get("type") || "");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [minRating, setMinRating] = useState("");

  const fetchColleges = useCallback(
    async (pageNum = 1, reset = false) => {
      setLoading(true);
      const params = new URLSearchParams({
        page: pageNum.toString(),
        pageSize: "9",
        ...(search && { search }),
        ...(type && type !== "All" && { type }),
        ...(category && category !== "All" && { category }),
        ...(sortBy && { sortBy }),
        ...(minRating && { minRating }),
      });

      try {
        const res = await fetch(`/api/colleges?${params}`);
        const data = await res.json();
        if (reset || pageNum === 1) {
          setColleges(data.data || []);
        } else {
          setColleges((prev) => [...prev, ...(data.data || [])]);
        }
        setTotal(data.total || 0);
        setTotalPages(data.totalPages || 1);
        setPage(pageNum);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    },
    [search, type, category, sortBy, minRating]
  );

  useEffect(() => {
    fetchColleges(1, true);
  }, [fetchColleges]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchColleges(1, true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-24">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Colleges in India</h1>
        <p className="text-gray-500 text-sm mt-1">{total} colleges found</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-20">
            <h2 className="font-semibold text-gray-900 mb-4">Filters</h2>

            <form onSubmit={handleSearch} className="mb-5">
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Search</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="College, city..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
                />
                <button type="submit" className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700">
                  →
                </button>
              </div>
            </form>

            <div className="mb-5">
              <label className="block text-xs font-medium text-gray-600 mb-2">College Type</label>
              <div className="flex flex-wrap gap-1.5">
                {TYPES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t === "All" ? "" : t)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                      (t === "All" && !type) || type === t
                        ? "bg-blue-600 text-white border-blue-600"
                        : "text-gray-600 border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-xs font-medium text-gray-600 mb-2">Category</label>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c === "All" ? "" : c)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                      (c === "All" && !category) || category === c
                        ? "bg-blue-600 text-white border-blue-600"
                        : "text-gray-600 border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-xs font-medium text-gray-600 mb-2">Min Rating</label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
              >
                <option value="">Any rating</option>
                <option value="4.5">4.5+ ⭐</option>
                <option value="4">4.0+ ⭐</option>
                <option value="3.5">3.5+ ⭐</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => {
                setSearch("");
                setType("");
                setCategory("");
                setMinRating("");
                setSortBy("rating");
              }}
              className="w-full mt-4 text-xs text-red-500 hover:text-red-600 py-1.5"
            >
              Reset all filters
            </button>
          </div>
        </aside>

        {/* College Grid */}
        <div className="flex-1">
          {loading && colleges.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
                  <div className="h-44 bg-gray-200" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : colleges.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No colleges found</h3>
              <p className="text-gray-500 text-sm">Try adjusting your filters</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {colleges.map((college) => (
                  <CollegeCard key={college.id} college={college} />
                ))}
              </div>

              {page < totalPages && (
                <div className="mt-8 text-center">
                  <button
                    onClick={() => fetchColleges(page + 1)}
                    disabled={loading}
                    className="bg-white border border-gray-200 text-gray-700 px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm disabled:opacity-50"
                  >
                    {loading ? "Loading..." : `Load More (${total - colleges.length} remaining)`}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CollegesPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 h-72 animate-pulse" />
            ))}
          </div>
        </div>
      }
    >
      <CollegesContent />
    </Suspense>
  );
}