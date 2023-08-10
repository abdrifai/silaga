interface IProps {
  title?: string;
  onfollow?: () => void;
}

const ButtonIkut: React.FC<IProps> = ({ title, onfollow }) => {
  return (
    <div>
      <button
        onClick={onfollow}
        className="text-sm font-semibold hover:bg-rose-600 transition py-2 px-3 border rounded-lg outline-none hover:cursor-pointer hover:text-white"
      >
        {title}
      </button>
    </div>
  );
};

export default ButtonIkut;
