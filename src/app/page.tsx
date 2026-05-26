// src/app/page.tsx
import Link from "next/link";

const stats = [
  { label: "Colleges Listed", value: "1,000+" },
  { label: "Student Reviews", value: "50,000+" },
  { label: "Courses", value: "5,000+" },
  { label: "Cities Covered", value: "200+" },
];

const features = [
  {
    icon: "🔍",
    title: "Smart Search",
    description: "Search colleges by name, location, type, fees, and more with real-time filters",
  },
  {
    icon: "⚖️",
    title: "Side-by-Side Compare",
    description: "Compare up to 3 colleges on fees, placements, ratings, and facilities",
  },
  {
    icon: "🎯",
    title: "Detailed Profiles",
    description: "Full college pages with courses, placements data, reviews, and Q&A",
  },
  {
    icon: "❤️",
    title: "Save & Track",
    description: "Save your favorite colleges and track them in your personal dashboard",
  },
];

const topColleges = [
  { name: "IIT Madras", type: "IIT", rating: 4.9, nirf: 1, slug: "iit-madras" },
  { name: "IIT Delhi", type: "IIT", rating: 4.7, nirf: 2, slug: "iit-delhi" },
  { name: "IIT Bombay", type: "IIT", rating: 4.8, nirf: 3, slug: "iit-bombay" },
  { name: "NIT Trichy", type: "NIT", rating: 4.4, nirf: 8, slug: "nit-trichy" },
  { name: "BITS Pilani", type: "Deemed", rating: 4.5, nirf: 23, slug: "bits-pilani" },
  { name: "VIT Vellore", type: "Private", rating: 4.0, nirf: 11, slug: "vit-vellore" },
];

const typeColors: Record<string, string> = {
  IIT: "bg-blue-100 text-blue-700",
  NIT: "bg-purple-100 text-purple-700",
  Deemed: "bg-green-100 text-green-700",
  Private: "bg-orange-100 text-orange-700",
};

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Find Your Perfect College in India
          </h1>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            Search, compare, and discover top colleges across India. Make informed decisions with real reviews, placement data, and more.
          </p>

          {/* Search Box */}
          <form action="/colleges" method="GET" className="max-w-2xl mx-auto">
            <div className="flex gap-2 bg-white rounded-xl p-2 shadow-xl">
              <input
                name="search"
                type="text"
                placeholder="Search colleges, cities, courses..."
                className="flex-1 px-4 py-2 text-gray-900 outline-none text-sm rounded-lg"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
              >
                Search
              </button>
            </div>
          </form>

          {/* Quick filters */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {["IIT", "NIT", "Private", "Deemed", "Government"].map((type) => (
              <Link
                key={type}
                href={`/colleges?type=${type}`}
                className="bg-white/20 hover:bg-white/30 text-white text-sm px-4 py-1.5 rounded-full transition-colors border border-white/30"
              >
                {type}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-10 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">
            Everything you need to choose wisely
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow text-center">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Colleges */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Top Colleges</h2>
            <Link href="/colleges" className="text-blue-600 text-sm font-medium hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {topColleges.map((college) => (
              <Link
                key={college.slug}
                href={`/colleges/${college.slug}`}
                className="group bg-gray-50 rounded-xl p-4 text-center hover:bg-blue-50 hover:border-blue-200 border border-transparent transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">{college.name.charAt(0)}</span>
                </div>
                <h3 className="text-xs font-semibold text-gray-800 group-hover:text-blue-600 leading-tight mb-1">
                  {college.name}
                </h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[college.type] || "bg-gray-100 text-gray-700"}`}>
                  {college.type}
                </span>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <svg className="w-3 h-3 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-xs text-gray-600">{college.rating}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Ready to find your college?</h2>
          <p className="text-blue-100 mb-6">Join thousands of students making smarter decisions with CampusFind</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/colleges" className="bg-white text-blue-600 px-6 py-2.5 rounded-lg font-medium hover:shadow-lg transition-shadow text-sm">
              Browse Colleges
            </Link>
            <Link href="/auth/signup" className="bg-blue-500 text-white px-6 py-2.5 rounded-lg font-medium border border-blue-400 hover:bg-blue-400 transition-colors text-sm">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4 text-center text-sm">
        <p>© 2024 CampusFind. Built for the next generation of Indian students.</p>
      </footer>
    </div>
  );
}
