import Image from "next/image";

export default function Home() {
  return (
    <section className="w-full flex justify-center item-center flex-col">
      <h3 className="head_text text-center pt-28">
        Pengembangan
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">Kompetensi ASN</span>
      </h3>
      <p className="text-center desc px-52">
        Pengembangan kompetensi ASN adalah proses yang bertujuan untuk
        meningkatkan kemampuan dan keterampilan pegawai <br /> dalam menjalankan
        tugas dan tanggung jawabnya di lingkungan instansi pemerintah. Melalui
        pengembangan kompetensi, ASN dapat mengikuti perkembangan dan tuntutan
        pekerjaan yang semakin kompleks dan dinamis. Pengembangan kompetensi
        melibatkan pendidikan, <br /> pelatihan, dan pembelajaran berkelanjutan
        yang terfokus pada aspek teknis, manajerial, dan sosial.
        <br /> ASN perlu menguasai pengetahuan terkini, menggunakan teknologi
        informasi, mengembangkan kemampuan kepemimpinan,
        <br /> berkomunikasi dengan baik, dan beradaptasi dengan perubahan.
        Dengan pengembangan kompetensi yang baik, ASN dapat memberikan
        kontribusi maksimal dalam memberikan pelayanan publik yang efektif,
        efisien, dan berkualitas.
      </p>
      <h4 className="red_gradient antialiased text-center text-3xl pt-5 font-bold">
        Teruslah BELAJAR, BERINOVASI, dan BERPRESTASI.
      </h4>
    </section>
  );
}
