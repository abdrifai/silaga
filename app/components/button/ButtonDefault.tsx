import clsx from "clsx";

interface IProps {
  title?: string;
  primary?: boolean;
  secondary?: boolean;
  onClick?: () => void;
}

const ButtonDefault: React.FC<IProps> = ({ title, onClick }) => {
  const buttonClasses = clsx(
    "text-sm font-bold hover:bg-slate-200 transition py-2 px-3 border rounded-lg outline-none hover:cursor-pointer hover:text-slate-800"
  );
  return (
    <div>
      <button onClick={onClick} className={buttonClasses}>
        {title}
      </button>
    </div>
  );
};

export default ButtonDefault;
