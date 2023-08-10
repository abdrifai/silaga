import { NextResponse } from "next/server";

const URL_BACKEND = process.env.URL_BACKEND;

export async function GET() {
  try {
    const res = await fetch(`${URL_BACKEND}/api/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(request: Request) {
  const { pegawaiId, username, role } = await request.json();

  const newData = {
    pegawaiId,
    username,
    password: username,
    role,
  };

  try {
    const res = await fetch(`${URL_BACKEND}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Terjadi kesalahan Respon Server (route users):", error);
    return NextResponse.json({
      message: `Terjadi kesalahan pada server . ( ${error})`,
    });
  }
}
