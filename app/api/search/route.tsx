import { NextResponse } from "next/server";

const URL_BACKEND = process.env.URL_BACKEND;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const nama = searchParams.get("query");
  if (nama !== "") {
    const res = await fetch(`${URL_BACKEND}/api/search-pns?nama=${nama}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return NextResponse.json(data);
  }

  return NextResponse.json([]);
}
