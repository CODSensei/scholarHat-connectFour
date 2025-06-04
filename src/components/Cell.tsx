interface CellProps {
  value: string | null;
  onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ value, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-16 h-16 bg-white rounded-full m-1 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition"
    >
      <div
        className={`w-12 h-12 rounded-full ${
          value === "P1"
            ? "bg-red-500"
            : value === "P2"
            ? "bg-yellow-500"
            : "bg-gray-200"
        }`}
      ></div>
    </div>
  );
};

export default Cell;
