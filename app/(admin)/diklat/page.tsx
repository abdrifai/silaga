"use client";
import React, { useEffect, useState } from "react";

interface FormData {
  jnsDiklatId: string;
  jenjangDiklatId: string;
  namaDiklat: string;
  tglAwal: Date | null;
  tglAkhir: Date | null;
  tahun: string;
}

interface DataPNS {
  nipBaru: string;
  orang: { nama: string };
  lastDiklat: {
    id: string;
    angkatan: string;
    nmDiklat: string;
    noSertifikat: string;
    penyelenggara: string;
    t4pelaksanaan: string;
    tglSertifikat: string;
  };
  lastJabatan: {
    jabatan: {
      nmJab: string;
    };
    subUnorSub: {
      nmUnor: string;
    };
    unorInduk: {
      nmUnor: string;
    };
  };
}

const DiklatPage = () => {
  const [dataJnsDiklat, setDataJnsDiklat] = useState([]);
  const [dataJenjangDiklat, setDataJenjangDiklat] = useState([]);
  const [formData, setFormData] = useState<FormData>({
    jnsDiklatId: "0",
    jenjangDiklatId: "0",
    tglAkhir: new Date(),
    tglAwal: new Date(),
    namaDiklat: "",
    tahun: "",
  });
  const [dataPNS, setDataPNS] = useState<DataPNS[]>([]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "jnsDiklatId") {
      getRefJenjangDiklat(value);
    }

    if (name === "jenjangDiklatId") {
      getDataPNS(value);
    }
  };

  const getDataPNS = async (jenjangDiklatID: string) => {
    const response = await fetch(`/api/pns/diklat/jenjang/${jenjangDiklatID}`);
    const data = await response.json();
    setDataPNS(data.data);
    // console.log(data.data);
  };

  const getRefJenisDiklat = async () => {
    const response = await fetch("/api/referensi/jenis-diklat");
    const data = await response.json();
    setDataJnsDiklat(data.data);
    // console.log(data.data);
  };

  const getRefJenjangDiklat = async (id: any) => {
    const response = await fetch(`/api/referensi/jenjang-diklat/${id}`);
    const data = await response.json();
    setDataJenjangDiklat(data.data);
    // console.log(data);
  };

  useEffect(() => {
    getRefJenisDiklat();
  }, [formData.jnsDiklatId]);

  return (
    <div className="container pt-10">
      <div className="flex items-center justify-between pb-3">
        <h1 className="font-bold text-xl">Pengembangan Kompetensi</h1>
      </div>
      <p>Daftar Pegawai Yang telah mengikuti Pelatihan</p>
      <div className="grid grid-cols-12 gap-4 pt-4">
        <div className="col-span-3">
          <label
            htmlFor="jnsDiklatId"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Jenis Pelatihan/Diklat
          </label>
          <select
            id="jnsDiklatId"
            name="jnsDiklatId"
            value={formData.jnsDiklatId}
            onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="0">Pilih Jenis Pelatihan</option>
            {dataJnsDiklat.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.jnsDiklat}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-9">
          <label
            htmlFor="jenjangDiklatId"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Jenjang Pelatihan
          </label>
          <select
            id="jenjangDiklatId"
            name="jenjangDiklatId"
            value={formData.jenjangDiklatId}
            onChange={handleChange}
            className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="0">Pilih Jenjang Pelatihan</option>
            {dataJenjangDiklat?.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.jenjangDiklat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="pt-10 w-full">
        <table className="w-full table-fixed">
          <thead className="boder border-b-2 font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" className="w-8 px-4 py-2">
                No
              </th>
              <th scope="col" className="px-4 py-2 text-left">
                NIP
              </th>
              <th scope="col" className="px-4 py-2 text-left">
                Nama
              </th>
              <th scope="col" className="px-4 py-2 text-left">
                Pelatihan
              </th>
              <th scope="col" className="px-4 py-2 text-left">
                No. Sertifikat
              </th>
              <th scope="col" className="px-4 py-2">
                Tanggal
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-scroll">
            {dataPNS &&
              dataPNS.map((item: any, index: number) => (
                <tr
                  key={index}
                  className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 hover:cursor-pointer"
                  onClick={() => {}}
                >
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-center text-rose-500">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {item.nipBaru}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {item.orang.nama}
                  </td>
                  <td className="flex-wrap px-4 py-3 text-left">
                    {item.lastDiklat.nmDiklat}
                  </td>
                  <td className="flex-wrap px-4 py-3 text-left">
                    {item.lastDiklat.noSertifikat}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-center">
                    {new Date(item.lastDiklat.tglSertifikat).toLocaleDateString(
                      "id"
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DiklatPage;
