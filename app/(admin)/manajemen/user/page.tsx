"use client";
import ButtonDefault from "@/app/components/button/ButtonDefault";
import TextboxH from "@/app/components/form/TextBox-H";
import SearchASN from "@/app/components/search/modal/SearchASN";
import { setCurrentASN } from "@/redux/actions/currentAsn-slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

interface FormData {
  pegawaiId?: string;
  role?: string;
  username?: string;
}

const defaultFormData = {
  pegawaiId: "",
  role: "",
  username: "",
  // nama: "",
};

const Page = () => {
  const [toggel, setToggel] = useState(false);
  const [dataUser, setDataUser] = useState([]);
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const username = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const { pegawaiId, nip, nama, gol, pangkat, jabatan, unor } = useAppSelector(
    (state) => state.currentAsn.value
  );

  useEffect(() => {
    getDataUser();
    if (nip) {
      getDataPns(nip);
    }
  }, [nip]);

  const getDataPns = async (nip: string) => {
    try {
      const response = await fetch(`/api/pns/${nip}`);
      const data = await response.json();
      setFormData((prevFormData) => ({
        ...prevFormData,
        pegawaiId: data.data[0].id,
      }));
      // console.log(data.data[0]);
      dispatch(
        setCurrentASN({
          pegawaiId: data.data[0].pegawaiId,
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

  const getDataUser = async () => {
    const result = await fetch("/api/users");
    const data = await result.json();
    // console.log(data.data);
    setDataUser(data.data);
  };

  const handleToggle = () => {
    setToggel((prev) => !prev);
  };

  const handleAddUser = async () => {
    // console.log(formData);
    try {
      // Panggil API untuk menyimpan data
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast("Adding data is successful !!", {
          hideProgressBar: true,
          autoClose: 2000,
          type: "success",
        });
        getDataUser();
      } else {
        // Jika terjadi kesalahan dalam menyimpan data, tangani di sini
        console.error("Gagal menyimpan data.");
        toast("failed save !!", {
          hideProgressBar: true,
          autoClose: 2000,
          type: "error",
        });
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (username.current) {
      const value = username.current.value;
      setFormData((prevData) => ({
        ...prevData,
        username: value,
      }));
    }
  };

  return (
    <div className="container pt-10">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl">User Management</h1>
      </div>
      {toggel ? (
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <div className="flex justify-end">
              <SearchASN />
            </div>
            <div className="mt-4 grid grid-cols-12 gap-3 w-full border rounded-lg shadow-lg py-4 px-10">
              <div className="flex col-span-3">
                <div className="space-y-1">
                  <TextboxH label="Nip" value={nip} />
                  <TextboxH label="Nama" value={nama} />
                  {/* <TextboxH label="Pangkat/Gol" value={gol} /> */}
                </div>
              </div>
              <div className="flex col-span-3">
                <div className="space-y-1">
                  <TextboxH label="Jabatan" value={jabatan} />
                  <TextboxH label="Unor" value={unor} />
                  {/* {data && data?.data[0]?.lastJabatan?.unorInduk?.nmUnor} */}
                </div>
              </div>
              <div className="flex col-span-3">
                <div className="space-y-1">
                  <TextboxH label="UserName" ref={username} />
                  <TextboxH label="Password" ref={password} />
                </div>
              </div>
              <div className="col-span-2">
                <div className="w-full">
                  <label
                    htmlFor="tahun"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value={""}>Pilih Role</option>
                    <option value={"user"}>User</option>
                    <option value={"admin"}>Admin</option>
                  </select>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <ButtonDefault title="Save" onClick={handleAddUser} />
                  <ButtonDefault title="Close" onClick={handleToggle} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-end">
          <ButtonDefault title="Tambah User" onClick={handleToggle} />
        </div>
      )}

      <div className="pt-3">
        <table className="table-auto min-w-full">
          <thead className="border-b border-t font-medium dark:border-neutral-500 text-gray-500">
            <tr>
              <th scope="col" className="px-4 py-2">
                No
              </th>
              <th scope="col" className="px-4 py-2 text-left">
                Username
              </th>
              <th scope="col" className="px-4 py-2 text-left">
                Nama
              </th>
              <th scope="col" className="px-4 py-2">
                Role
              </th>
              <th scope="col" className="px-4 py-2">
                Keterangan
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-scroll">
            {dataUser &&
              dataUser.map((item: any, index: number) => (
                <tr
                  key={index}
                  className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 hover:cursor-pointer"
                  onClick={() => {}}
                >
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-center">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {item.username}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">{item.nama}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-center">
                    {item.role}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-center">
                    {item.pegawaiId}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-center">-</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
