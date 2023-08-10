"use client";
import { FaPlusCircle } from "react-icons/fa";
interface CardBoxProps {
  title?: string;
  footer?: boolean;
  border?: boolean;
  buttonAdd?: boolean;
  onClose?: () => void;
  onSave?: () => void;
  onToggel?: () => void;
  children: React.ReactNode;
}

const CardBox: React.FC<CardBoxProps> = ({
  title,
  footer,
  border,
  buttonAdd,
  onClose,
  onSave,
  onToggel,
  children,
}) => {
  return (
    <div
      className={`
          w-full border-2 rounded-lg mt-4 transition`}
    >
      <div
        className="grid grid-cols-12 items-center font-bold border-b-2
          h-12"
      >
        {buttonAdd ? (
          <>
            <div className="col-span-1 pl-2 hover:cursor-pointer text-slate-400 hover:text-green-500">
              <FaPlusCircle size={24} onClick={onToggel} />
            </div>
            <div className="col-span-10 flex items-center justify-center">
              {title}
            </div>
          </>
        ) : (
          <div className="col-span-12 flex items-center justify-center">
            {title}
          </div>
        )}
      </div>
      <div className="px-2 py-4">{children}</div>
      {footer ? (
        <div className="border-t-2 p-2 flex items-center gap-2">
          <button
            onClick={onSave}
            className="flex items-center gap-2 border text-slate-300 hover:text-slate-600 rounded-md py-2 px-3 hover:bg-slate-100 font-semibold text-left"
          >
            Simpan
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-2 border text-slate-300 hover:text-slate-600 rounded-md py-2 px-3 hover:bg-slate-100 font-semibold text-left"
          >
            Batal
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CardBox;
