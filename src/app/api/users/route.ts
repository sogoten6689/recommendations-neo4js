import { fetchUsers } from "@/lib/neo4j";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sizeParam = searchParams.get("size");
  const fromParam = searchParams.get("from");
  const size = sizeParam ? parseInt(sizeParam, 10) : 10;
  const from = fromParam ? parseInt(fromParam, 10) : 0;
  if (isNaN(size) || size <= 0 || isNaN(from) || from < 0) {
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  }

  const users = await fetchUsers(size, from);
  return NextResponse.json(users);
}
