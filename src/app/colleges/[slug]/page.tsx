"use client";
// src/app/colleges/[slug]/page.tsx
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { College, Review } from "@/types";
import StarRating from "@/components/ui/StarRating";
import { useCompare } from "@/contexts/CompareContext";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

type Tab = "overview" | "courses" | "placements" | "reviews";

export default function CollegeDetailPage() {
  const { slug } = useParams();
  const { user } = useAuth();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();

  const [college, setCollege] = useState<(College & { reviews: Review[]; isSaved: boolean }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [isSaved, setIsSaved] = useState(false);

  // Review form
  const [reviewForm, setReviewForm] = useState({
    rating: "5",
    title: "",
    content: "",
    pros: "",
    cons: "",
    batch: "",
    course: "",
  });
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  useEffect(() => {
    fetch(`/api/colleges/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        setCollege(data);
        setIsSaved(data.isSaved);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded-2xl mb-6" />
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-3" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
        </div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold text-gray-700">College not found</h2>
        <Link href="/colleges" className="text-blue-600 mt-3 inline-block">← Back to colleges</Link>
      </div>
    );
  }

  const inCompare = isInCompare(college.id);

  const handleSave = async () => {
    if (!user) { window.location.href = "/auth/login"; return; }
    const method = isSaved ? "DELETE" : "POST";
    const res = await fetch("/api/saved", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ collegeId: college.id }),
    });
    if (res.ok) setIsSaved(!isSaved);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { window.location.href = "/auth/login"; return; }
    setReviewLoading(true);
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...reviewForm, collegeId: college.id }),
    });
    if (res.ok) {
      setReviewSuccess(true);
      const newReview = await res.json();
      setCollege((prev) => prev ? { ...prev, reviews: [newReview, ...prev.reviews] } : prev);
    }
    setReviewLoading(false);
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "courses", label: "Courses" },
    { key: "placements", label: "Placements" },
    { key: "reviews", label: `Reviews (${college.reviews?.length || 0})` },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 pb-24">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-5 flex items-center gap-2">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span>/</span>
        <Link href="/colleges" className="hover:text-blue-600">Colleges</Link>
        <span>/</span>
        <span className="text-gray-900">{college.name}</span>
      </nav>

      {/* Hero */}
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 mb-6">
        <div className="h-56 relative bg-gradient-to-br from-blue-100 to-indigo-200">
          {college.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={college.imageUrl} alt={college.name} className="w-full h-full object-cover" />
          )}
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">{college.type}</span>
                <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full">{college.category}</span>
                {college.rankingNIRF && (
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">NIRF #{college.rankingNIRF}</span>
                )}
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{college.name}</h1>
              <p className="text-gray-500 flex items-center gap-1 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {college.location}
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={handleSave}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  isSaved ? "bg-red-50 text-red-600 border-red-200" : "bg-white text-gray-700 border-gray-200 hover:border-red-200"
                }`}
              >
                <svg className={`w-4 h-4 ${isSaved ? "fill-red-500 text-red-500" : ""}`} fill={isSaved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {isSaved ? "Saved" : "Save"}
              </button>
              <button
                onClick={() => inCompare ? removeFromCompare(college.id) : addToCompare(college as College)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  inCompare ? "bg-blue-600 text-white border-blue-600" : "bg-white text-blue-600 border-blue-200 hover:bg-blue-50"
                }`}
              >
                {inCompare ? "✓ In Compare" : "+ Compare"}
              </button>
              {college.websiteUrl && (
                <a href={college.websiteUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Visit Website ↗
                </a>
              )}
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 pt-5 border-t border-gray-100">
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Rating</p>
              <StarRating rating={college.rating} size="sm" />
              <p className="text-xs text-gray-400 mt-0.5">{college.totalReviews.toLocaleString()} reviews</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">UG Fees/Year</p>
              <p className="text-base font-bold text-gray-900">₹{(college.fees.ug / 100000).toFixed(1)}L</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Avg Package</p>
              <p className="text-base font-bold text-gray-900">₹{(college.placements.avgPackage / 100000).toFixed(1)}L</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Established</p>
              <p className="text-base font-bold text-gray-900">{college.established}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? "text-blue-600 border-b-2 border-blue-600 -mb-px"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">About {college.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{college.about}</p>
              </div>
              {college.rankingQS && (
                <div className="bg-indigo-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Rankings</h3>
                  <div className="flex gap-6 text-sm">
                    {college.rankingNIRF && <div><span className="text-gray-500">NIRF:</span> <strong>#{college.rankingNIRF}</strong></div>}
                    {college.rankingQS && <div><span className="text-gray-500">QS World:</span> <strong>#{college.rankingQS}</strong></div>}
                  </div>
                </div>
              )}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Facilities</h3>
                <div className="flex flex-wrap gap-2">
                  {college.facilities.map((facility) => (
                    <span key={facility} className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full">
                      {facility}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-xs text-blue-600 font-medium">Total Students</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">{college.totalStudents.toLocaleString()}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-xs text-green-600 font-medium">Placement Rate</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">{college.placements.placementRate}%</p>
                </div>
                <div className="bg-orange-50 rounded-xl p-4">
                  <p className="text-xs text-orange-600 font-medium">Highest Package</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">₹{(college.placements.highestPackage / 100000).toFixed(0)}L</p>
                </div>
              </div>
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === "courses" && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Available Courses</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-xs text-gray-500 uppercase">
                      <th className="text-left py-3 px-4 rounded-l-lg">Course</th>
                      <th className="text-left py-3 px-4">Duration</th>
                      <th className="text-left py-3 px-4">Seats</th>
                      <th className="text-right py-3 px-4 rounded-r-lg">Fees/Year</th>
                    </tr>
                  </thead>
                  <tbody>
                    {college.courses.map((course, i) => (
                      <tr key={i} className="border-t border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-800">{course.name}</td>
                        <td className="py-3 px-4 text-gray-600">{course.duration}</td>
                        <td className="py-3 px-4 text-gray-600">{course.seats}</td>
                        <td className="py-3 px-4 text-right font-medium text-gray-800">
                          ₹{(course.fees / 100000).toFixed(1)}L
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Placements Tab */}
          {activeTab === "placements" && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-green-600 font-medium mb-1">Avg Package</p>
                  <p className="text-2xl font-bold text-gray-900">₹{(college.placements.avgPackage / 100000).toFixed(1)}L</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-blue-600 font-medium mb-1">Highest Package</p>
                  <p className="text-2xl font-bold text-gray-900">₹{(college.placements.highestPackage / 100000).toFixed(0)}L</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-purple-600 font-medium mb-1">Placement Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{college.placements.placementRate}%</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Top Recruiters</h3>
                <div className="flex flex-wrap gap-2">
                  {college.placements.topRecruiters.map((r) => (
                    <span key={r} className="bg-white border border-gray-200 text-gray-700 text-sm px-4 py-2 rounded-lg font-medium">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              {/* Write review */}
              {user && !reviewSuccess && (
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-4">Write a Review</h3>
                  <form onSubmit={handleReviewSubmit} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Rating</label>
                        <select value={reviewForm.rating} onChange={(e) => setReviewForm({ ...reviewForm, rating: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                          {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} ⭐</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Batch Year</label>
                        <input type="number" placeholder="2023" value={reviewForm.batch} onChange={(e) => setReviewForm({ ...reviewForm, batch: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Title *</label>
                      <input required type="text" placeholder="Review title" value={reviewForm.title} onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Review *</label>
                      <textarea required rows={3} placeholder="Share your experience..." value={reviewForm.content} onChange={(e) => setReviewForm({ ...reviewForm, content: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Pros</label>
                        <input type="text" placeholder="What's good?" value={reviewForm.pros} onChange={(e) => setReviewForm({ ...reviewForm, pros: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Cons</label>
                        <input type="text" placeholder="What can improve?" value={reviewForm.cons} onChange={(e) => setReviewForm({ ...reviewForm, cons: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                      </div>
                    </div>
                    <button type="submit" disabled={reviewLoading} className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
                      {reviewLoading ? "Submitting..." : "Submit Review"}
                    </button>
                  </form>
                </div>
              )}
              {reviewSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-700 text-sm font-medium">
                  ✓ Review submitted successfully!
                </div>
              )}
              {!user && (
                <div className="bg-blue-50 rounded-xl p-4 text-sm">
                  <Link href="/auth/login" className="text-blue-600 font-medium">Login</Link> to write a review
                </div>
              )}

              {/* Reviews list */}
              {college.reviews && college.reviews.length > 0 ? (
                <div className="space-y-4">
                  {college.reviews.map((review) => (
                    <div key={review.id} className="border border-gray-200 rounded-xl p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-semibold text-sm text-gray-900">{review.user.name}</span>
                            {review.batch && <span className="text-xs text-gray-400">Batch of {review.batch}</span>}
                          </div>
                          <StarRating rating={review.rating} size="sm" />
                        </div>
                        <span className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString("en-IN")}</span>
                      </div>
                      <p className="font-medium text-sm text-gray-900 mb-1">{review.title}</p>
                      <p className="text-sm text-gray-600 mb-2">{review.content}</p>
                      {(review.pros || review.cons) && (
                        <div className="grid grid-cols-2 gap-3 mt-2">
                          {review.pros && (
                            <div className="bg-green-50 rounded-lg p-2">
                              <p className="text-xs font-medium text-green-700 mb-0.5">👍 Pros</p>
                              <p className="text-xs text-gray-600">{review.pros}</p>
                            </div>
                          )}
                          {review.cons && (
                            <div className="bg-red-50 rounded-lg p-2">
                              <p className="text-xs font-medium text-red-700 mb-0.5">👎 Cons</p>
                              <p className="text-xs text-gray-600">{review.cons}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500 text-sm">No reviews yet. Be the first to review!</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
