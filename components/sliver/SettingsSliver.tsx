import { Dispatch, SetStateAction } from "react";

interface SettingsSliverProps {
  carNumber: number;
  setCarNumber: Dispatch<SetStateAction<number>>;
}
const SettingsSliver: React.FC<SettingsSliverProps> = ({
  carNumber,
  setCarNumber,
}) => {
  return (
    <>
      <section className="flex flex-col items-center justify-center w-full h-full gap-5 text-lg">
        <div className="flex flex-row gap-5">
          <p>Car number</p>
          <input
            type="range"
            min="1"
            max="10"
            value={carNumber}
            onChange={(e) => setCarNumber(parseInt(e.target.value))}
            className="p-1 transition-colors duration-300 cursor-pointer accent-slate-800 hover:accent-slate-700"
          />
          <p className="font-bold">{carNumber}</p>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center w-full gap-5 text-lg">
        <p>Other settings...</p>
      </section>
    </>
  );
};

export default SettingsSliver;
