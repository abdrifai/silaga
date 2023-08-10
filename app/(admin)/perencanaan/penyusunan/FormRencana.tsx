"use client";

import CardBox from "@/app/components/card/CardBox";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

interface FormData {
  id: string;
  jnsDiklatId: string;
  jenjangDiklatId: string;
  namaDiklat: string;
  tglAwal: Date | null;
  tglAkhir: Date | null;
  tahun: string;
}

const defaultFormData = {
  id: "",
  jnsDiklatId: "0",
  jenjangDiklatId: "0",
  tglAkhir: new Date(),
  tglAwal: new Date(),
  namaDiklat: "",
  tahun: "",
};

interface FormRencanaProps {
  title?: string;
  footer?: boolean;
  border?: boolean;
  onClose?: () => void;
  onSave?: () => void;
  onDataReceived?: (data: FormData) => void;
  sendId?: string;
}

const FormRencana: React.FC<FormRencanaProps> = ({
  onClose,
  onDataReceived,
  sendId,
}) => {
  const [dataJnsDiklat, setDataJnsDiklat] = useState([]);
  const [dataJenjangDiklat, setDataJenjangDiklat] = useState([]);
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  const getByID = async (id: string) => {
    if (id !== "") {
      const result = await fetch(`/api/diklat/perencanaan?id=${id}`);
      const data = await result.json();
      setFormData({
        id: data.data[0].id,
        tahun: data.data[0].tahun,
        namaDiklat: data.data[0].namaDiklat,
        jnsDiklatId: data.data[0].jnsDiklatId,
        jenjangDiklatId: data.data[0].jenjangDiklatId,
        tglAwal: new Date(data.data[0].tglAwal),
        tglAkhir: new Date(data.data[0].tglAkhir),
      });

      getRefJenjangDiklat(data.data[0].jnsDiklatId);
    } else {
      setFormData(defaultFormData);
    }
    // console.log(data.data);
  };

  useEffect(() => {
    getRefJenisDiklat();
    getByID(sendId||'');
  }, [sendId]);

  const onSave = () => {
    if (onDataReceived) {
      onDataReceived(formData);
    }
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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "jnsDiklatId") {
      getRefJenjangDiklat(value);
    }
  };

  return (
    <CardBox
      title="Perencanaan"
      onClose={onClose}
      onSave={onSave}
      footer={true}
    >
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <label
            htmlFor="tahun"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tahun
          </label>
          <select
            id="tahun"
            name="tahun"
            value={formData.tahun}
            onChange={handleChange}
            className="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value={""}>Pilih Tahun</option>
            <option value={"2023"}>2023</option>
            <option value={"2024"}>2024</option>
            <option value={"2025"}>2025</option>
          </select>
        </div>
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
        <div className="col-span-12">
          <label
            htmlFor="uraian"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Uraian
          </label>
          <textarea
            rows={3}
            id="namaDiklat"
            className="w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="namaDiklat"
            value={formData.namaDiklat}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="col-span-2 flex flex-col">
          <label
            htmlFor="jnsKP"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tanggal Awal
          </label>
          <DatePicker
            selected={formData.tglAwal}
            onChange={(date) =>
              handleChange({ target: { value: date, name: "tglAwal" } })
            }
            dateFormat={"dd/MM/yyy"}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="col-span-6 flex flex-col">
          <label
            htmlFor="jnsKP"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tanggal Akhir
          </label>
          <DatePicker
            selected={formData.tglAkhir}
            onChange={(date) =>
              handleChange({ target: { value: date, name: "tglAkhir" } })
            }
            dateFormat={"dd/MM/yyy"}
            className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
    </CardBox>
  );
};

export default FormRencana;
