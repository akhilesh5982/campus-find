"use client";
// src/app/colleges/page.tsx
import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { College } from "@/types";
import CollegeCard from "@/components/college/CollegeCard";

export const dynamic = "force-dynamic";

const TYPES = ["All", "IIT", "NIT", "Private", "Deemed", "Government"];
// ... baaki sab same rehta hai ...

function CollegesContent() {   // <-- sirf yeh naam badla
  const searchParams = useSearchParams();
  // ... poora content same ...
}

export default function CollegesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading...</div>}>
      <CollegesContent />
    </Suspense>
  );
}