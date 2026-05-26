"use client";
// src/app/compare/page.tsx
import { useCompare } from "@/contexts/CompareContext";
import { College } from "@/types";
import Link from "next/link";
import StarRating from "@/components/ui/StarRating";

function getBest(colleges: College[], getValue: (c: College) => number) {
  const values = colleges.map(getValue);
  const max = Math.max(...values);
  return values.map((v) => v === max);
}

function getLowest(colleges: College[], getValue: (c: College) => number) {
  const values = colleges.map(getValue);
  const min = Math.min(...values);
  return values.map((v) => v === min);
}

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  if (compareList.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">⚖️</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">No colleges to compare</h2>
        <p className="text-gray-500 mb-6">Add colleges from the listing page to compare them side by side</p>
        <Link href="/colleges" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors">
          Browse Colleges
        </Link>
      </div>
    );
  }

  const ratings = getBest(compareList, (c) => c.rating);
  const avgPkg = getBest(compareList, (c) => c.placements.avgPackage);
  const highPkg = getBest(compareList, (c) => c.placements.highestPackage);
  const placementRate = getBest(compareList, (c) => c.placements.placementRate);
  const lowestFees = getLowest(compareList, (c) => c.fees.ug);
  const nirf = getLowest(compareList, (c) => c.rankingNIRF || 999);

  const rows = [
    { label: "Type", getValue: (c: College) => c.type, highlight: null },
    { label: "Location", getValue: (c: College) => c.location, highlight: null },
    { label: "Established", getValue: (c: College) => c.established.toString(), highlight: null },
    { label: "NIRF Rank", getValue: (c: College) => c.rankingNIRF ? `#${c.rankingNIRF}` : "N/A", highlight: nirf },
    { label: "UG Fees/Year", getValue: (c: College) => `₹${(c.fees.ug / 100000).toFixed(1)}L`, highlight: lowestFees },
    { label: "Avg Package", getValue: (c: College) => `₹${(c.placements.avgPackage / 100000).toFixed(1)}L`, highlight: avgPkg },
    { label: "Highest Package", getValue: (c: College) => `₹${(c.placements.highestPackage / 100000).toFixed(0)}L`, highlight: highPkg },
    { label: "Placement Rate", getValue: (c: College) => `${c.placements.placementRate}%`, highlight: placementRate },
    { label: "Total Students", getValue: (c: College) => c.totalStudents.toLocaleString(), highlight: null },
    {
      label: "Top Recruiters",
      getValue: (c: College) => c.placements.topRecruiters.slice(0, 3).join(", "),
      highlight: null,
    },
    {
      label: "Facilities",
      getValue: (c: College) => c.facilities.slice(0, 4).join(", "),
      highlight: null,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-24">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">College Comparison</h1>
          <p className="text-gray-500 text-sm mt-1">Comparing {compareList.length} colleges</p>
        </div>
        <div className="flex gap-3">
          <button onClick={clearCompare} className="text-sm text-red-500 hover:text-red-600 font-medium">
            Clear All
          </button>
          <Link href="/colleges" className="text-sm text-blue-600 font-medium hover:text-blue-700">
            + Add More
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {/* College headers */}
        <div className={`grid divide-x divide-gray-100`} style={{ gridTemplateColumns: `200px repeat(${compareList.length}, 1fr)` }}>
          <div className="p-5 bg-gray-50" />
          {compareList.map((college) => (
            <div key={college.id} className="p-5 relative">
              <button
                onClick={() => removeFromCompare(college.id)}
                className="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="h-24 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl overflow-hidden mb-3">
                {college.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={college.imageUrl} alt={college.name} className="w-full h-full object-cover" />
                )}
              </div>
              <Link href={`/colleges/${college.slug}`} className="font-semibold text-gray-900 text-sm hover:text-blue-600 leading-tight block mb-1">
                {college.name}
              </Link>
              <StarRating rating={college.rating} size="sm" />
            </div>
          ))}
        </div>

        {/* Comparison rows */}
        {rows.map((row, rowIdx) => (
          <div
            key={row.label}
            className={`grid divide-x divide-gray-100 border-t border-gray-100 ${rowIdx % 2 === 0 ? "" : "bg-gray-50/40"}`}
            style={{ gridTemplateColumns: `200px repeat(${compareList.length}, 1fr)` }}
          >
            <div className="p-4 flex items-center">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{row.label}</span>
            </div>
            {compareList.map((college, colIdx) => {
              const isHighlighted = row.highlight ? row.highlight[colIdx] : false;
              return (
                <div
                  key={college.id}
                  className={`p-4 flex items-center ${isHighlighted ? "bg-green-50" : ""}`}
                >
                  <span className={`text-sm ${isHighlighted ? "font-semibold text-green-700" : "text-gray-700"}`}>
                    {row.getValue(college)}
                    {isHighlighted && <span className="ml-1 text-green-500">✓</span>}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-4 text-center">
        ✓ Green cells indicate the best value for that metric
      </p>
    </div>
  );
}
