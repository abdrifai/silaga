"use client";
import ButtonIkut from "@/app/components/button/ButtonIkut";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const { data, status } = useSession();
  const [daftar, setDaftar] = useState([]);

  const getRencDiklat = async () => {
    const result = await fetch("/api/diklat/perencanaan");
    const data = await result.json();
    // console.log(data.data);
    setDaftar(data.data);
  };

  useEffect(() => {
    getRencDiklat();
  }, []);

  const toggelFollow = async (id: string, status: string) => {
    const newData = {
      rencDiklatId: id,
      status: status,
      pegawaiId: data?.user.pegawaiId,
    };

    // console.log(newData);

    if (status === null || status === undefined) {
      //follow
      try {
        newData.status = "on";
        const result = await fetch(`api/diklat/follow`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        });

        if (result.ok) {
          toast("follow Successfull !!", {
            hideProgressBar: true,
            autoClose: 2000,
            type: "success",
          });
          getRencDiklat();
        }
      } catch (error) {
        console.log("error di route : ", error);
      }
    } else {
      //unfollow
      //get dlu follow untuk mengambil id
      const result = await fetch(
        `/api/diklat/follow?rencDiklatId=${id}&pegawaiId=${newData.pegawaiId}`,
        {
          method: "DELETE",
        }
      );
      const data = await result.json();
      console.log(data.data == "OK");
      if (data.data === "OK") {
        toast("unfollow Successfull !!", {
          hideProgressBar: true,
          autoClose: 2000,
          type: "success",
        });
        getRencDiklat();
      }
    }
  };

  return (
    <div className="container pt-10">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl">Profile </h1>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-2 border-r-2 bg-slate-100 h-[80vh] py-6">
          <div className="flex flex-col justify-center w-full p-3 gap-2">
            <span className="p-2 mb-10 text-slate-400 bg-slate-200 w-full text-center font-bold rounded-md hover:bg-cyan-700 hover:text-white hover:cursor-pointer transition">
              Dashboard
            </span>
            <span className="p-2 text-slate-400 w-full border-b-4 text-center font-bold rounded-md hover:text-slate-600 hover:cursor-pointer transition hover:border-b-4 hover:border-cyan-600">
              Rencana Pelatihan
            </span>
            <span className="p-2 text-slate-400 w-full border-b-4 text-center font-bold rounded-md hover:text-slate-600 hover:cursor-pointer transition hover:border-b-4 hover:border-cyan-600">
              Riwayat Pelatihan
            </span>
          </div>
        </div>
        <div className="col-span-10 p-4">
          <div className="font-bold text-xl text-gray-600">
            Kalender Pengembangan Kompetensi Tahun 2023
          </div>
          <div className="pt-3">
            <table className="table-auto min-w-full">
              <thead className="border-b border-t font-medium dark:border-neutral-500 text-gray-500">
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
                {daftar &&
                  daftar.map((item: any, index: number) => (
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
                        {item.FollowDiklat[0]?.status}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-center">
                        {item.FollowDiklat[0]?.status !== "on" ? (
                          <ButtonIkut
                            title="follow"
                            onfollow={() =>
                              toggelFollow(
                                item.id,
                                item.FollowDiklat[0]?.status
                              )
                            }
                          />
                        ) : (
                          <ButtonIkut
                            title="unfollow"
                            onfollow={() =>
                              toggelFollow(
                                item.id,
                                item.FollowDiklat[0]?.status
                              )
                            }
                          />
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
