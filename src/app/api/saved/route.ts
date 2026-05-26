import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const saved = await prisma.savedCollege.findMany({
    where: { userId: user.userId },
    include: { college: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({
    data: saved.map((s) => ({
      ...s.college,
      fees: s.college.fees as object,
      placements: s.college.placements as object,
      courses: s.college.courses as object,
      isSaved: true,
    })),
  });
}

export async function POST(request: NextRequest) {
  const user = getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { collegeId } = await request.json();
  if (!collegeId) return NextResponse.json({ error: "collegeId required" }, { status: 400 });
  try {
    await prisma.savedCollege.create({
      data: { userId: user.userId, collegeId },
    });
    return NextResponse.json({ message: "College saved" });
  } catch {
    return NextResponse.json({ error: "Already saved or not found" }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  const user = getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { collegeId } = await request.json();
  if (!collegeId) return NextResponse.json({ error: "collegeId required" }, { status: 400 });
  await prisma.savedCollege.deleteMany({
    where: { userId: user.userId, collegeId },
  });
  return NextResponse.json({ message: "College unsaved" });
}