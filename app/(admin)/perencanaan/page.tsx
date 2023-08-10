"use client";
import LinkButton from "@/app/components/form/LinkButton";
import CardBox from "@/app/components/card/CardBox";
import { useEffect, useState } from "react";
import DropdownStatusPelatihan from "@/app/components/dropdown/DropdownStatusPelatihan";
import { toast } from "react-toastify";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import { useSession } from "next-auth/react";

const PerencanaanDiklat = () => {
  const { data: session } = useSession();
  const [rencana, setRencana] = useState([]);

  const getRencDiklat = async () => {
    const result = await fetch("/api/diklat/perencanaan");
    const data = await result.json();
    setRencana(data.data);
  };

  useEffect(() => {
    getRencDiklat();
  }, []);

  const handleStatus = async (status: string, data: any) => {
    const newData = { ...data, status };
    // console.log(newData);
    try {
      const result = await fetch(`api/diklat/perencanaan?id=${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (result.ok) {
        toast("Save Successfull !!", {
          hideProgressBar: true,
          autoClose: 2000,
          type: "success",
        });
        getRencDiklat();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (session?.user.role === "admin") {
    return (
      <div className="container pt-10">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-xl">Perencanaan Diklat</h1>
          <LinkButton url="/perencanaan/penyusunan">Penyusunan</LinkButton>
        </div>
        <CardBox title="Daftar Pelatihan" onClose={() => {}}>
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
                  <th scope="col" className="px-4 py-2 text-center">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-2">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="overflow-y-scroll">
                {rencana &&
                  rencana.map((item: any, index: number) => (
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
                        {item.status ? (
                          <div className="flex justify-center">
                            {item.status === "publish" ? (
                              <span>
                                <MdOutlinePublishedWithChanges
                                  size={20}
                                  className="text-green-600"
                                />
                              </span>
                            ) : null}
                            {item.status === "close" ? (
                              <span>
                                <AiOutlineCloseCircle size={20} />
                              </span>
                            ) : null}
                            {item.status === "cancel" ? (
                              <span>
                                <FcCancel size={20} />
                              </span>
                            ) : null}
                          </div>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-center">
                        <DropdownStatusPelatihan
                          title="Status Change"
                          onPublish={() => {
                            handleStatus("publish", item);
                          }}
                          onClose={() => {
                            handleStatus("close", item);
                          }}
                          onCancel={() => {
                            handleStatus("cancel", item);
                          }}
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
  } else {
    return (
      <div className="flex items-center justify-center h-3/4 font-bold">
        <span className="pt-52">This Page for Admin</span>
      </div>
    );
  }
};

export default PerencanaanDiklat;
