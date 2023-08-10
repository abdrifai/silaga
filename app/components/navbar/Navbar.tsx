"use client";

import Link from "next/link";
import SigninButton from "../SigninButton";
import { BiNetworkChart } from "react-icons/bi";

export default function Navbar() {
  return (
    <div>
      <div className="shadow-lg py-3">
        <div className="container">
          <div className="flex justify-between item-center">
            <div className="font-bold tracking-tighter text-slate-600">
              <Link href={"/"}>
                <span className="text-xl flext itme-center gap-2 leading-relaxed orange_gradient">
                  SILaga
                </span>
              </Link>
            </div>
            <div className="font-bold tracking-tighter text-slate-300">
              <span className="text-lg">
                Badan Kepegawaian dan Pengembangan SDM Daerah Kabupaten Tojo
                Una-Una
              </span>
            </div>
            <div className="">
              <SigninButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
