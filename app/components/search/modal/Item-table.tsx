import { setCurrentASN } from "@/redux/actions/currentAsn-slice";
import { AppDispatch, useAppSelector, useAppDispatch } from "@/redux/store";

interface ItemTableProps {
  callback: (value: string) => void;
  data: any;
}

const ItemTable: React.FC<ItemTableProps> = ({ data, callback }) => {
  const dispatch = useAppDispatch();
  const saveToLocalStorage = (nip: string, pegawaiID: string) => {
    localStorage.setItem("nip", nip);
    localStorage.setItem("id", pegawaiID);
  };

  const handleDoubleClick = async (id: string, nip: string) => {
    saveToLocalStorage(nip, id);
    dispatch(
      setCurrentASN({
        pegawaiId:id,
        nip: nip,
        nama: "",
        gol: "",
        pangkat: "",
        jabatan: "",
        unor: "",
      })
    );
    callback("tes");
  };

  return (
    <>
      {data &&
        data?.data?.map((item: any) => (
          <tr
            key={item.id}
            className="hover:bg-slate-50 hover:cursor-pointer"
            onDoubleClick={() => handleDoubleClick(item.id, item.nipBaru)}
          >
            <td className="pl-2">{item.nipBaru}</td>
            <td>{item.orang.nama}</td>
          </tr>
        ))}
    </>
  );
};

export default ItemTable;
