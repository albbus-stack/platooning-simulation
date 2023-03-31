import { useContext } from "react";
import { DataContext } from "../DataProvider";

const SettingsSliver: React.FC = () => {
  const { carNumber, setCarNumber, carSpacing, setCarSpacing } =
    useContext(DataContext);

  return (
    <>
      <section className="flex flex-col items-center justify-center w-full h-full gap-5 text-lg">
        <div className="flex flex-row items-center justify-center w-full gap-10 px-20">
          <p>Car number</p>
          <input
            type="range"
            min="2"
            max="10"
            value={carNumber}
            onChange={(e) => setCarNumber(parseInt(e.target.value))}
            className="w-1/2 p-1 transition-colors duration-300 cursor-pointer accent-slate-800 hover:accent-slate-700"
          />
          <p className="font-bold">{carNumber}</p>
        </div>
        <div className="flex flex-row items-center justify-center w-full gap-10 px-20">
          <p>Car spacing</p>
          <input
            type="range"
            min="110"
            max="300"
            value={carSpacing}
            onChange={(e) => setCarSpacing(parseInt(e.target.value))}
            className="w-1/2 p-1 transition-colors duration-300 cursor-pointer accent-slate-800 hover:accent-slate-700"
          />
          <p className="font-bold">
            {(1 + (carSpacing - 110) / 10).toFixed(1)}
          </p>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center w-full gap-10 text-lg">
        <p>Other settings...</p>
      </section>
    </>
  );
};

export default SettingsSliver;
