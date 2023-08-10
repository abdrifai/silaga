import useSWR from "swr";

interface DataProps {
  pnsID: string;
}

const DataComponent: React.FC<DataProps> = ({ pnsID }) => {
  // Definisikan fungsi untuk mengambil data dari API
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  // Gunakan useSWR untuk melakukan fetch data dan mengelola state caching
  const { data, error } = useSWR(`/api/diklat/${pnsID}`, fetcher, {
    revalidateOnMount: false,
  });

  if (error) {
    return <div>Riwayat Diklat belum ada</div>;
  }

  if (!data) {
    return <div>Memuat data...</div>;
  }

  return (
    <>
      <div className="p-2 font-bold border-b-2 text-slate-500">
        Riwayat Diklat Yang Telah di Ikuti
      </div>
      <div className="grid grid-cols-12 gap-3 p-2 col-span-2 pt-3">
        {/* <div className="col-span-2">Nama Diklat</div> */}
        {data.data.map((item: any) => (
          //     <li key={item.id}>{item.nmDiklat}</li>

          <div className="col-span-10" key={item.id}>
            <p className="font-semibold orange_gradient">{item.nmDiklat}</p>
            <p className="text-slate-400">{item.noSertifikat}</p>
            <p className="text-slate-400">{item.tglSertifikat}</p>
          </div>
        ))}
      </div>
    </>
    //     <div>
    //       <h1>Data dari API</h1>
    //       <ul>
    //         {console.log(data.data)}
    //         {data.data.map((item: any) => (
    //           <li key={item.id}>{item.nmDiklat}</li>
    //         ))}
    //       </ul>
    //     </div>
  );
};

export default DataComponent;
