"use client";
import SearchASN from "@/app/components/search/modal/SearchASN";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { setCurrentASN } from "@/redux/actions/currentAsn-slice";
import { AppDispatch, useAppSelector, useAppDispatch } from "@/redux/store";
import DataComponent from "./DataComponent";

const Page = () => {
  const { nip, nama, gol, pangkat, jabatan, unor } = useAppSelector(
    (state) => state.currentAsn.value
  );

  const [pnsID, setPnsID] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    const nip = localStorage.getItem("nip");
    setPnsID(localStorage.getItem("id") || "");
      getDataPns(nip||'');
  }, [nip]);

  const getDataPns = async (nip: string) => {
    try {
      const response = await fetch(`/api/pns/${nip}`);
      const data = await response.json();
      // console.log(data.data[0]);
      dispatch(
        setCurrentASN({
          pegawaiId:data.data[0].id,
          nip: nip,
          nama: data.data[0].orang.nama,
          gol: data.data[0].lastGolongan.golongan.gol,
          pangkat: data.data[0].lastGolongan.golongan.pangkat,
          jabatan: data.data[0].lastJabatan.jabatan.nmJab,
          unor: data.data[0].lastJabatan.unor.nmUnor,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container pt-10">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl">Profile ASN</h1>
        <SearchASN />
      </div>
      <div className="mt-4 grid grid-cols-12 gap-3 w-full border rounded-lg shadow-lg p-2 items-center">
        <div className="col-span-1 col-row">
          <Image
            src="/assets/default.png"
            width={200}
            height={300}
            alt="photo"
            className="h-full w-full rounded-lg"
          />
        </div>
        <div className="flex col-span-3">
          <div className="space-y-0">
            <p className="block">{nip}</p>
            <p className="block font-bold">{nama}</p>
            <p className="block">
              {gol}, {pangkat}
            </p>
            <p className="block">
              {/* {data && data?.data[0]?.lastJabatan?.jabatan?.nmJab} */}
            </p>
          </div>
        </div>
        <div className="ml-4 text-left col-span-6">
          <span className="block">
            <p className="block">{jabatan}</p>
            <p className="block">{unor}</p>
            {/* {data && data?.data[0]?.lastJabatan?.unorInduk?.nmUnor} */}
          </span>
          <span className="block">
            {/* {data && data?.data[0]?.lastJabatan?.subUnorSub?.nmUnor} */}
          </span>
        </div>
      </div>

      <div className="mt-4 w-full border rounded-lg shadow-lg p-2 items-center">
        <DataComponent pnsID={pnsID} />
      </div>
    </div>
  );
};

export default Page;
