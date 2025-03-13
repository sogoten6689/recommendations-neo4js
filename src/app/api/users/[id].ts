import { fetchRecommendedMovies } from "@/lib/neo4j";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });

  const movies = await fetchRecommendedMovies(Number(userId));
  return NextResponse.json(movies);
}
