"use client";

import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { InputSearch } from "./Input-Search";
import ItemTable from "./Item-table";
import Button from "@/app/components/form/Button";

interface PnsSearch {
  id?: string;
  nipBaru?: string;
  orang?: {
    nama?: string;
  };
}

const SearchASN: React.FC<PnsSearch> = () => {
  const [show, setShow] = useState(false);

  const [resultSearch, setResultSearch] = useState<PnsSearch[]>([]);

  const handleSearchQ = async (searchQ: string) => {
    try {
      const response = await fetch(
        `/api/search?query=${encodeURIComponent(searchQ)}`
      );

      if (response.ok) {
        const data = await response.json();
        setResultSearch(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonSearch = () => {
    setShow(!show);
  };

  const handleCallback = () => {
    setShow(!show);
  };

  return (
    <>
      <div>
        <Button onClick={handleButtonSearch}>Search</Button>
      </div>
      <div
        className={`${
          show
            ? "scale-100 duration-500 origin-top-right"
            : "scale-x-0 duration-500 origin-top-right"
        } absolute top-0 right-0 overflow-auto bg-gray-600 bg-opacity-30 shadow-md z-10 w-full h-full `}
      >
        <div className="flex min-h-[calc(100vh-20vh)] items-center justify-center">
          <div className="bg-white p-4 min-w-[40vw] relative">
            <div className="bg-white rounded-r-lg absolute top-0 right-0 translate-x-full translate-y-100">
              <AiOutlineClose
                className="w-8 h-8 cursor-pointer hover:text-white hover:bg-gray-800 hover:rounded-r-lg"
                onClick={() => setShow((prev) => !prev)}
              />
            </div>
            <InputSearch onSearch={handleSearchQ} />
            <div className="pt-5 transition min-h-[350px]">
              <table className="w-full border-gray-200">
                <thead className=" bg-slate-100 border-b-2 border-gray-300 text-left">
                  <tr>
                    <th className="py-3 pl-2 text-sm font-semibold tracking-wide">
                      NIP
                    </th>
                    <th className="py-3 text-sm font-semibold tracking-wide text-left">
                      Nama
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <ItemTable data={resultSearch} callback={handleCallback} />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchASN;
