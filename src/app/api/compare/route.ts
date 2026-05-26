// src/app/api/compare/route.ts
export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get("ids");

  if (!ids) {
    return NextResponse.json({ error: "ids parameter required" }, { status: 400 });
  }

  const idList = ids.split(",").slice(0, 3);

  const colleges = await prisma.college.findMany({
    where: { id: { in: idList } },
  });

  return NextResponse.json({
    data: colleges.map((c) => ({
      ...c,
      fees: c.fees as object,
      placements: c.placements as object,
      courses: c.courses as object,
    })),
  });
}
