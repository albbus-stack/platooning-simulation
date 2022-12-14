interface GraphSliverButtonProps {
  size: "S" | "M" | "L";
  label: "S" | "M" | "L";
  onClick: () => void;
}

const GraphSliverButton = ({
  size,
  label,
  onClick,
}: GraphSliverButtonProps) => {
  const buttonClassName =
    "border border-slate-800 border-b-0 font-mono mr-4 p-1 hover:text-slate-500 hover:bg-slate-300 transition-all duration-300 rounded-md rounded-b-none w-10 pb-1";
  return (
    <button
      className={
        buttonClassName +
        (size === label ? " bg-slate-300 text-black hover:text-black" : "")
      }
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default GraphSliverButton;
