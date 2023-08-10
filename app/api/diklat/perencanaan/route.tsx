import { NextRequest, NextResponse } from "next/server";

const URL_BACKEND = process.env.URL_BACKEND;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  let url = `${URL_BACKEND}/api/diklat/perencanaan`;

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
  const { jnsDiklatId, jenjangDiklatId, namaDiklat, tglAwal, tglAkhir, tahun } =
    await request.json();

  const newData = {
    jnsDiklatId,
    jenjangDiklatId,
    namaDiklat,
    tglAwal,
    tglAkhir,
    tahun,
  };

  try {
    const res = await fetch(`http://localhost:5000/api/diklat/perencanaan`, {
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
  const id = searchParams.get("id");

  try {
    const res = await fetch(`${URL_BACKEND}/api/diklat/perencanaan/${id}`, {
      method: "DELETE",
    });

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

  const {
    id,
    jnsDiklatId,
    jenjangDiklatId,
    namaDiklat,
    tglAwal,
    tglAkhir,
    tahun,
    status,
  } = await request.json();

  const newData = {
    jnsDiklatId,
    jenjangDiklatId,
    namaDiklat,
    tglAwal,
    tglAkhir,
    tahun,
    status,
  };

  try {
    const res = await fetch(`${URL_BACKEND}/api/diklat/perencanaan/${id}`, {
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
