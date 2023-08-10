import { NextRequest, NextResponse } from "next/server";

const URL_BACKEND = process.env.URL_BACKEND;

export async function GET(
  request: Request,
  { params }: { params: { jenisDiklatID: string } }
) {
  const id = params.jenisDiklatID;
  try {
    const res = await fetch(
      `${URL_BACKEND}/api/referensi/jenjang-diklat/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    return NextResponse.json({ message: "Terjadi kesalahan pada server ..." });
  }
}
