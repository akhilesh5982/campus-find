"use client";
// src/components/Navbar.tsx
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useCompare } from "@/contexts/CompareContext";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { compareList } = useCompare();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CF</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              Campus<span className="text-blue-600">Find</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/colleges" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Colleges
            </Link>
            <Link href="/compare" className="relative text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Compare
              {compareList.length > 0 && (
                <span className="absolute -top-2 -right-4 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </Link>
            {user && (
              <Link href="/saved" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Saved
              </Link>
            )}
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm text-gray-700 font-medium">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-500 hover:text-red-500 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-3 border-t border-gray-100 space-y-1">
            <Link href="/colleges" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>
              Colleges
            </Link>
            <Link href="/compare" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>
              Compare {compareList.length > 0 && `(${compareList.length})`}
            </Link>
            {user && (
              <Link href="/saved" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>
                Saved
              </Link>
            )}
            <div className="border-t border-gray-100 pt-2 mt-2">
              {user ? (
                <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg">
                  Logout ({user.name})
                </button>
              ) : (
                <>
                  <Link href="/auth/login" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg" onClick={() => setMenuOpen(false)}>
                    Login
                  </Link>
                  <Link href="/auth/signup" className="block px-3 py-2 text-blue-600 font-medium hover:bg-blue-50 rounded-lg" onClick={() => setMenuOpen(false)}>
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
