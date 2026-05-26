// src/app/api/colleges/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/session"; // ✅ fixed

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const college = await prisma.college.findUnique({
      where: { slug: params.slug },
      include: {
        reviews: {
          include: { user: { select: { name: true } } },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
        questions: {
          include: {
            user: { select: { name: true } },
            answers: {
              include: { user: { select: { name: true } } },
              orderBy: { createdAt: "asc" },
            },
          },
          orderBy: { createdAt: "desc" },
          take: 5,
        },
      },
    });
    if (!college) {
      return NextResponse.json({ error: "College not found" }, { status: 404 });
    }
    const user = getAuthUser();
    let isSaved = false;
    if (user) {
      const saved = await prisma.savedCollege.findUnique({
        where: { userId_collegeId: { userId: user.userId, collegeId: college.id } },
      });
      isSaved = !!saved;
    }
    return NextResponse.json({
      ...college,
      fees: college.fees as object,
      placements: college.placements as object,
      courses: college.courses as object,
      isSaved,
    });
  } catch (error) {
    console.error("College detail error:", error);
    return NextResponse.json({ error: "Failed to fetch college" }, { status: 500 });
  }
}