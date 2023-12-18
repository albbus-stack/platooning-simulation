interface SliverIconButtonProps {
  label?: string;
  onClick: () => void;
  icon: JSX.Element;
}

const SliverIconButton: React.FC<SliverIconButtonProps> = ({
  label,
  onClick,
  icon,
}) => {
  return (
    <div className="relative group/btn">
      {label && (
        <div className="top-[-100%] -translate-y-[45%] left-[50%] translate-x-[-50%] w-max text-center hidden z-20 group-hover/btn:inline-block absolute px-3 py-2 text-sm font-medium text-white duration-300 rounded-lg shadow-sm opacity-80 bg-gray-700">
          <span>{label}</span>
          <div className="absolute bottom-[-3px] left-[50%] -translate-x-[50%] w-5 h-5 rotate-45 bg-gray-700 z-[-1]" />
        </div>
      )}
      <button
        className="flex items-center justify-center bg-[#e2e8ff] w-10 h-full pt-[.1rem] font-bold transition-all duration-300 border border-b-0 rounded-md rounded-b-none border-slate-800 group-hover/btn:text-slate-500 group-hover/btn:bg-slate-300"
        onClick={onClick}
      >
        {icon}
      </button>
    </div>
  );
};

export default SliverIconButton;
