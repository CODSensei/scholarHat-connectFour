interface CellProps {
  value: string | null;
  onClick: () => void;
  isDarkTheme: boolean;
}

const Cell: React.FC<CellProps> = ({ value, onClick, isDarkTheme }) => {
  return (
    <div
      onClick={onClick}
      className="w-16 h-16 bg-gray-900 rounded-full m-1 flex items-center justify-center cursor-pointer hover:bg-gray-800 transition"
    >
      <div
        className={`w-12 h-12 rounded-full ${
          value === "P1"
            ? "bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
            : value === "P2"
            ? "bg-pink-500 shadow-[0_0_12px_rgba(236,72,153,0.8)]"
            : isDarkTheme
            ? "bg-gray-800 shadow-[0_0_8px_rgba(34,211,238,0.4)]"
            : "bg-gray-300 shadow-[0_0_8px_rgba(59,130,246,0.3)]"
        }`}
      ></div>
    </div>
  );
};

export default Cell;
