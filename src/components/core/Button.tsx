import React from "react";

interface ButtonProps {
  buttonCSS?: string;
  onClick: () => void;
  title: string;
  isDarkTheme?: boolean;
}

const Button: React.FC<ButtonProps> = ({ buttonCSS, onClick, title }) => {
  return (
    <button className={`${buttonCSS}`} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
