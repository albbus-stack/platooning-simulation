import { createContext, Dispatch, SetStateAction, useState } from "react";

interface DataType {
  distance: number;
  velocity: number;
  time: number;
}

export const DataContext = createContext({
  data: [[]] as DataType[][],
  setData: (() => {}) as Dispatch<SetStateAction<DataType[][]>>,
  carNumber: 6,
  setCarNumber: (() => {}) as Dispatch<SetStateAction<number>>,
});

interface DataProviderProps {
  children: React.ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState([[]] as {
    distance: number;
    velocity: number;
    time: number;
  }[][]);

  const [carNumber, setCarNumber] = useState(6);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        carNumber,
        setCarNumber,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
