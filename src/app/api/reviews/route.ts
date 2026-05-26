import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const user = getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { collegeId, rating, title, content, pros, cons, batch, course } =
    await request.json();
  if (!collegeId || !rating || !title || !content) {
    return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
  }
  const review = await prisma.review.create({
    data: {
      userId: user.userId,
      collegeId,
      rating: parseFloat(rating),
      title,
      content,
      pros: pros || null,
      cons: cons || null,
      batch: batch ? parseInt(batch) : null,
      course: course || null,
    },
    include: { user: { select: { name: true } } },
  });
  const reviews = await prisma.review.findMany({
    where: { collegeId },
    select: { rating: true },
  });
  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  await prisma.college.update({
    where: { id: collegeId },
    data: { rating: Math.round(avgRating * 10) / 10, totalReviews: reviews.length },
  });
  return NextResponse.json(review, { status: 201 });
}