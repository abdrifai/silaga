"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { data, status } = useSession();
  console.log(data?.user);
  if (data?.user.role === "admin") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="mb-32 grid gap-3 text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
          <Link
            href="/profile/asn"
            className="group rounded-lg border px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 "
          >
            <h2 className={`mb-3 text-2xl font-bold orange_gradient`}>
              Profile ASN
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Riwayat pelatihan yang perna diikuti oleh masing-masing PNS
            </p>
          </Link>

          <Link
            href="/diklat"
            className="group rounded-lg border  px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
          >
            <h2 className={`mb-3 text-2xl font-bold green_gradient`}>
              BangKom
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </Link>

          <Link
            href="/perencanaan"
            className="group rounded-lg border px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className={`mb-3 text-2xl font-bold blue_gradient`}>
              Perencanaan
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Penyusunan Perencanaan pelaksanaan Diklat Kabupaten
            </p>
          </Link>

          <Link
            href="/informasi"
            className="group rounded-lg border px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className={`mb-3 text-2xl font-bold orange_gradient`}>
              Informasi
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Instansi Pembina Penyelenggara Diklat
            </p>
          </Link>
        </div>
      </main>
    );
  } else {
    return (
      <div className="flex items-center justify-center h-3/4 font-bold">
        <span className="pt-52">This Page for Admin</span>
      </div>
    );
  }
};

export default Page;
