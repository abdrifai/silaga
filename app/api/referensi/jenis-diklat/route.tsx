import { NextRequest, NextResponse } from "next/server";

const URL_BACKEND = process.env.URL_BACKEND;

export async function GET() {
  try {
    const res = await fetch(`${URL_BACKEND}/api/referensi/jenis-diklat`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    return NextResponse.json({ message: "Terjadi kesalahan pada server." });
  }
}
