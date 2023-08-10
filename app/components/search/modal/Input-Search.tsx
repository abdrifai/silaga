"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

interface InputSearchProps {
  onSearch: (searchQury: string) => void;
}

const InputSearch: React.FC<InputSearchProps> = ({ onSearch }) => {
  const [searchQ, setSearchQ] = useState("");
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    onSearch(searchQ);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQ(e.target.value);
  };

  return (
    <div>
      <div className="relative flex items-center w-full">
        <AiOutlineSearch className="absolute w-6 h-6 ml-3 pointer-events-none" />
        <form onSubmit={handleSearch} className="w-full">
          <input
            type="text"
            className="w-full pr-3 pl-10 py-2 font-semibold text-black border-none ring-2 ring-gray-300 focus:ring-1 placeholder-gray-300 hover:ring-1 active:ring-1"
            placeholder="Search NIP or Nama"
            value={searchQ}
            onChange={handleChange}
          />
        </form>
      </div>
    </div>
  );
};

export { InputSearch };
