// src/app/api/colleges/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const type = searchParams.get("type") || "";
    const state = searchParams.get("state") || "";
    const category = searchParams.get("category") || "";
    const minFees = searchParams.get("minFees");
    const maxFees = searchParams.get("maxFees");
    const minRating = searchParams.get("minRating");
    const sortBy = searchParams.get("sortBy") || "rating";
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "9");

    // Build where clause
    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { city: { contains: search, mode: "insensitive" } },
        { state: { contains: search, mode: "insensitive" } },
      ];
    }
    if (type) where.type = type;
    if (state) where.state = { contains: state, mode: "insensitive" };
    if (category) where.category = category;
    if (minRating) where.rating = { gte: parseFloat(minRating) };

    // Get total count
    const total = await prisma.college.count({ where });

    // Get paginated results
    let orderBy: Record<string, string> = { rating: "desc" };
    if (sortBy === "fees") orderBy = { name: "asc" }; // proxy sort
    if (sortBy === "ranking") orderBy = { rankingNIRF: "asc" };
    if (sortBy === "name") orderBy = { name: "asc" };

    const colleges = await prisma.college.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    // Check saved status if user is logged in
    const user = getAuthUser();
    let savedIds: string[] = [];
    if (user) {
      const saved = await prisma.savedCollege.findMany({
        where: { userId: user.userId },
        select: { collegeId: true },
      });
      savedIds = saved.map((s) => s.collegeId);
    }

    const enriched = colleges.map((c) => ({
      ...c,
      fees: c.fees as object,
      placements: c.placements as object,
      courses: c.courses as object,
      isSaved: savedIds.includes(c.id),
    }));

    return NextResponse.json({
      data: enriched,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.error("Colleges API error:", error);
    return NextResponse.json({ error: "Failed to fetch colleges" }, { status: 500 });
  }
}
