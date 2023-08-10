"use client";

import { useAppSelector } from "@/redux/store";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CgMenuGridR } from "react-icons/cg";
import { CiLogin } from "react-icons/ci";

const SigninButton = () => {
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // const username = useAppSelector((state) => state.auth.value.username);

  return (
    <div className="flex items-center gap-2">
      {session?.user ? (
        <>
          <div className="flex items-center justify-center p-1">
            <p className="text-sky-600 font-bold uppercase pr-5">
              {session.user?.pns?.orang?.nama}
            </p>
            <button
              onClick={() => setShowMenu((prev) => !prev)}
              className="rounded-sm text-sm font-bold hover:bg-slate-400 hover:text-white transition"
            >
              <CgMenuGridR size={25} />
            </button>
            <div
              ref={menuRef}
              className={`${
                showMenu ? "show" : "hidden"
              } absolute top-16 right-12 overflow-auto bg-white bg-opacity-90 shadow-md z-10 border rounded-lg`}
            >
              <div
                className="grid grid-cols-2 gap-5 p-8"
                onClick={() => setShowMenu((prev) => !prev)}
              >
                {session.user.role === "admin" ? (
                  <>
                    <Link
                      href={"/dashboard"}
                      className="shadow-md rounded-md border p-3 hover:bg-slate-500 hover:text-white font-bold"
                    >
                      Dasboard
                    </Link>
                    <Link
                      href={"/profile/asn"}
                      className="shadow-md rounded-md border p-3 hover:bg-slate-500 hover:text-white font-bold"
                    >
                      Profile ASN
                    </Link>
                    <Link
                      href={"/diklat"}
                      className="shadow-md rounded-md border p-3 hover:bg-slate-500 hover:text-white font-bold "
                    >
                      BangKom
                    </Link>
                    <Link
                      href={"/perencanaan"}
                      className="shadow-md rounded-md border p-3 hover:bg-slate-500 hover:text-white font-bold "
                    >
                      Perencanaan
                    </Link>
                    <Link
                      href={"/informasi"}
                      className="shadow-md rounded-md border p-3 hover:bg-slate-500 hover:text-white font-bold "
                    >
                      Informasi
                    </Link>
                    <Link
                      href={"/manajemen/user"}
                      className="shadow-md rounded-md border p-3 hover:bg-slate-500 hover:text-white font-bold "
                    >
                      User Management
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href={"/profile"}
                      className="shadow-md rounded-md border p-3 hover:bg-slate-500 hover:text-white font-bold "
                    >
                      Profile
                    </Link>
                  </>
                )}
                <button
                  className="w-full shadow-md rounded-md border p-3 hover:bg-rose-500 hover:text-white font-bold "
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <button className="text-green-600 text-sm" onClick={() => signIn()}>
          <CiLogin size={30} />
        </button>
      )}
    </div>
  );
};

export default SigninButton;
