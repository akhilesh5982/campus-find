// src/app/colleges/[slug]/loading.tsx
export default function CollegeDetailLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-48 mb-5" />
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 mb-6">
        <div className="h-56 bg-gray-200" />
        <div className="p-6">
          <div className="flex justify-between">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-24" />
              <div className="h-7 bg-gray-200 rounded w-80" />
              <div className="h-4 bg-gray-200 rounded w-40" />
            </div>
            <div className="flex gap-2">
              <div className="h-9 bg-gray-200 rounded-lg w-24" />
              <div className="h-9 bg-gray-200 rounded-lg w-28" />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-5 pt-5 border-t border-gray-100">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-1">
                <div className="h-3 bg-gray-200 rounded w-16" />
                <div className="h-5 bg-gray-200 rounded w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 h-96" />
    </div>
  );
}
