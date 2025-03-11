import { fetchMovies } from "@/lib/neo4j";
import { NextResponse } from "next/server";

export async function GET() {
  const movies = await fetchMovies();
  return NextResponse.json(movies);
}
