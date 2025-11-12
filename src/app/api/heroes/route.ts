import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(process.env.API_URL as string);

  if (!res.ok) {
    return NextResponse.json({ message: "Failed to fetch from MockAPI" }, { status: 502 });
  }

  const data = await res.json();

  return NextResponse.json({ data });
}
