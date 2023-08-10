"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CardBox from "@/app/components/card/CardBox";
import "react-datepicker/dist/react-datepicker.css";
import FormRencana from "./FormRencana";
import LinkButton from "@/app/components/form/LinkButton";
import DropdownActionTable from "@/app/components/dropdown/DropdownAction";

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

const PenyusunanPage = () => {
  const [toggel, setToggel] = useState(false);
  const [data, setData] = useState([]);
  const [rencIDSelect, setRencIDSelect] = useState("");
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  const handleToggel = () => {
    setToggel((prev) => !prev);
  };

  const resetToDefault = () => {
    setRencIDSelect("");
    console.log("handle reset");
    setToggel((prev) => !prev);
  };

  const handleData = async (data: FormData) => {
    setFormData(data);
    // console.log("page penyusunan :", data);
    if (data.id) {
      // console.log("id ada", data.id);
      try {
        // Panggil API untuk menyimpan data
        const response = await fetch(`/api/diklat/perencanaan`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          // console.log("upadated successfuly :", await response.json());
          toast("Updated Successfull !!", {
            hideProgressBar: true,
            autoClose: 2000,
            type: "success",
          });
          getRencDiklat();
        } else {
          // Jika terjadi kesalahan dalam menyimpan data, tangani di sini
          console.error("Gagal upadate data :", await response.json());
          toast("failed update !!", {
            hideProgressBar: true,
            autoClose: 2000,
            type: "error",
          });
        }
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }

      setToggel(false);
    } else {
      // console.log("id kosong");
      try {
        // Panggil API untuk menyimpan data
        const response = await fetch("/api/diklat/perencanaan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          toast("Save Successfull !!", {
            hideProgressBar: true,
            autoClose: 2000,
            type: "success",
          });
          getRencDiklat();
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

      setToggel(false);
    }
  };

  const formatDateForDatabase = (tanggal: any) => {
    const year = tanggal.getFullYear();
    const month = String(tanggal.getMonth() + 1).padStart(2, "0");
    const day = String(tanggal.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getRencDiklat = async () => {
    const result = await fetch("/api/diklat/perencanaan");
    const data = await result.json();
    // console.log(data.data);
    setData(data.data);
  };

  useEffect(() => {
    getRencDiklat();
  }, []);

  const handleDelete = async (id: any) => {
    const result = await fetch(`/api/diklat/perencanaan?id=${id}`, {
      method: "DELETE",
    });
    const data = await result.json();
    console.log(data.data == "OK");
    if (data.data === "OK") {
      toast("Delete Successfull !!", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "success",
      });
      getRencDiklat();
    }
  };

  const handleShowDetail = async (id: string) => {
    setToggel(true);
    setRencIDSelect(id);
    // console.log(id);
    // const result = await fetch(`/api/diklat/perencanaan?id=${id}`);
    // const data = await result.json();
    // console.log(data);
  };

  return (
    <div className="container pt-10">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl">Penyusunan Perencanaan Diklat</h1>
        <LinkButton url="/perencanaan">Back</LinkButton>
      </div>
      {toggel && (
        <FormRencana
          onClose={handleToggel}
          onDataReceived={handleData}
          sendId={rencIDSelect}
        />
      )}

      <CardBox
        title="Daftar Rencana Diklat"
        onClose={() => {}}
        buttonAdd={true}
        onToggel={resetToDefault}
      >
        <div className="pt-3">
          <table className="table-auto min-w-full">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" className="px-4 py-2">
                  No
                </th>
                <th scope="col" className="px-4 py-2 text-left">
                  Tahun
                </th>
                <th scope="col" className="px-4 py-2 text-left">
                  Pelatihan
                </th>
                <th scope="col" className="px-4 py-2">
                  Tanggal Awal
                </th>
                <th scope="col" className="px-4 py-2">
                  Tanggal Akhir
                </th>
                <th scope="col" className="px-4 py-2">
                  Status
                </th>
                <th scope="col" className="px-4 py-2">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="overflow-y-scroll">
              {data &&
                data.map((item: any, index: number) => (
                  <tr
                    key={index}
                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 hover:cursor-pointer"
                    onClick={() => {}}
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-center">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {item.tahun}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {item.namaDiklat}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-center">
                      {new Date(item.tglAwal).toLocaleDateString("id")}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-center">
                      {new Date(item.tglAkhir).toLocaleDateString("id")}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-center">
                      -
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-center">
                      <DropdownActionTable
                        title="Action"
                        onClickEdit={() => {
                          handleShowDetail(item.id);
                        }}
                        onClickHapus={() => handleDelete(item.id)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </CardBox>
    </div>
  );
};

export default PenyusunanPage;
