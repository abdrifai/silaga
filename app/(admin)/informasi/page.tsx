import React from "react";

const InformasiPage = () => {
  return (
    <div className="container pt-10">
      <div className="flex items-center justify-between pb-2 border-b-2">
        <h1 className="font-bold text-xl">Informasi Instansi Pembina</h1>
      </div>
      <div className="grid grid-cols-3 gap-4 pt-8">
        {/* card 1 */}
        <div className="border rounded-md shadow-md p-4">
          <span className="font-bold text-slate-500 text-xl">
            Badan Kepegawaian Negara
          </span>
          <div className="gap-2 flex flex-col">
            <p className="text-blue-500 font-semibold hover:cursor-pointer hover:underline">
              Analis Sumber Daya Manusia Aparatur
            </p>
            <p className="text-blue-500 font-semibold hover:cursor-pointer hover:underline">
              Asesor Sumber Daya Manusia Aparatur
            </p>
            <p className="text-blue-500 font-semibold hover:cursor-pointer hover:underline">
              Auditor Kepegawaian
            </p>
            <p className="text-blue-500 font-semibold hover:cursor-pointer hover:underline">
              Auditor Manajemen Aparatur Sipil Negara
            </p>
            <p className="text-blue-500 font-semibold hover:cursor-pointer hover:underline">
              Pranata Sumber Daya Manusia Aparatur
            </p>
          </div>
        </div>
        {/* card 2 */}
        <div className="border rounded-md shadow-md p-4">
          <span className="font-bold text-slate-500 text-xl">
            Badan Pusat Statistik
          </span>
          <div className="gap-2 flex flex-col">
            <p className="text-blue-500 font-semibold hover:cursor-pointer hover:underline">
              Pranata Komputer
            </p>
            <p className="text-blue-500 font-semibold hover:cursor-pointer hover:underline">
              Statistisi
            </p>
          </div>
        </div>
        {/* card 3 */}
        <div className="border rounded-md shadow-md p-4">
          <span className="font-bold text-slate-500 text-xl">
            Kementerian Keuangan
          </span>
          <div className="gap-2 flex flex-col">
            <p className="text-blue-500 font-semibold hover:cursor-pointer hover:underline">
              Analis Anggaran
            </p>
            <p className="text-blue-500 font-semibold hover:cursor-pointer hover:underline">
              Analis Keuangan Pusat dan Daerah
            </p>
            <p className="text-blue-500 font-semibold hover:cursor-pointer hover:underline">
              Analis Pembiayaan dan Risiko Keuangan
            </p>
            <p className="text-blue-500 font-semibold hover:cursor-pointer hover:underline">
              Analis Perbendaharaan Negara
            </p>
            <p className="text-blue-500 font-semibold hover:cursor-pointer hover:underline">
              Asisten Penilai Pajak
            </p>
          </div>
        </div>
        {/* card 4 */}
        <div className="border rounded-md shadow-md p-4">
          <span className="font-bold text-slate-500 text-xl">
            Kementerian Pekerjaan Umum dan Perumahan
          </span>
          <div className="gap-2 flex flex-col">
            <p className="text-blue-500 font-semibold hover:cursor-pointer hover:underline">
              Pembina Jasa Konstruksi
            </p>
            <p className="text-blue-500 font-semibold hover:cursor-pointer hover:underline">
              Teknik Jalan dan Jembatan
            </p>
            <p className="text-blue-500 font-semibold hover:cursor-pointer hover:underline">
              Teknik Pengairan
            </p>
            <p className="text-blue-500 font-semibold hover:cursor-pointer hover:underline">
              Teknik Penyehatan Lingkungan
            </p>
            <p className="text-blue-500 font-semibold hover:cursor-pointer hover:underline">
              Teknik Tata Bangunan dan Perumahan
            </p>
          </div>
        </div>
        {/* card 5 */}
        <div className="border rounded-md shadow-md p-4">
          <span className="font-bold text-slate-500 text-xl">
            Kementerian Pendidikan dan Kebudayaan
          </span>
          <div className="gap-2 flex flex-col">
            <p className="text-blue-500 font-semibold hover:cursor-pointer hover:underline">
              Guru
            </p>
            <p className="text-blue-500 font-semibold hover:cursor-pointer hover:underline">
              Pamong Belajar
            </p>
            <p className="text-blue-500 font-semibold hover:cursor-pointer hover:underline">
              Pamong Budaya
            </p>
            <p className="text-blue-500 font-semibold hover:cursor-pointer hover:underline">
              Pengawas Sekolah
            </p>
            <p className="text-blue-500 font-semibold hover:cursor-pointer hover:underline">
              Pengembang Kurikulum
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformasiPage;
