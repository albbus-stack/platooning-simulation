import { Size } from "./SliverProvider";
import React from "react";

interface SliverButtonProps {
  size: Size;
  label: Size;
  onClick: () => void;
}

const SliverButton: React.FC<SliverButtonProps> = ({
  size,
  label,
  onClick,
}) => {
  return (
    <button
      className={
        "border border-slate-800 border-b-0 font-mono mr-4 p-1 hover:text-slate-500 hover:bg-slate-300 transition-all duration-300 rounded-md rounded-b-none w-10 pb-1 " +
        (size === label ? "bg-slate-300 text-black hover:text-black" : "")
      }
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default SliverButton;
