import { NextRequest, NextResponse } from "next/server";

const URL_BACKEND = process.env.URL_BACKEND;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  let url = `${URL_BACKEND}/api/diklat/follow`;

  const finalUrl = id === null ? url : `${url}/${id}`;

  try {
    const res = await fetch(finalUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    // console.error("Terjadi kesalahan:", error);
    return NextResponse.json({ message: error });
  }
}

export async function POST(request: Request) {
  const { rencDiklatId, status, pegawaiId } = await request.json();

  const newData = {
    rencDiklatId,
    status,
    pegawaiId,
  };

  try {
    const res = await fetch(`${URL_BACKEND}/api/diklat/follow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Terjadi kesalahan Respon Server:", error);
    return NextResponse.json({
      message: `Terjadi kesalahan pada server . ( ${error})`,
    });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const rencDiklatId = searchParams.get("rencDiklatId");
  const pegawaiId = searchParams.get("pegawaiId");

  try {
    const res = await fetch(
      `${URL_BACKEND}/api/diklat/follow/${rencDiklatId}/pegawai/${pegawaiId}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    // console.error("Terjadi kesalahan Respon Server:", error);
    return NextResponse.json({
      message: `Terjadi kesalahan di server . ( ${error})`,
    });
  }
}

export async function PUT(request: Request) {
  // const { searchParams } = new URL(request.url);
  // const id = searchParams.get("id");

  const { id, rencDiklatId, status, pegawaiId } = await request.json();

  const newData = {
    id,
    rencDiklatId,
    status,
    pegawaiId,
  };

  try {
    const res = await fetch(`${URL_BACKEND}/api/diklat/follow/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log("Terjadi kesalahan Respon Server ketika PUT:", error);
    return NextResponse.json({
      message: `Terjadi kesalahan pada server next response PUT. ( ${error})`,
    });
  }
}
