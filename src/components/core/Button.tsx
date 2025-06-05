import React from "react";

interface ButtonProps {
  buttonCSS?: string;
  onClick: () => void;
  title: string;
}

const Button: React.FC<ButtonProps> = ({ buttonCSS, onClick, title }) => {
  return (
    <button
      className={`w-full px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition ${buttonCSS}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
