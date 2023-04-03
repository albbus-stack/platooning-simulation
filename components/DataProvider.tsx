import { createContext, Dispatch, SetStateAction, useState } from "react";

interface DataType {
  distance: number;
  velocity: number;
  time: number;
}

interface GraphPoints {
  time: number;
  velocity: number;
}

export const DataContext = createContext({
  data: [[]] as DataType[][],
  setData: (() => {}) as Dispatch<SetStateAction<DataType[][]>>,
  carNumber: 0,
  setCarNumber: (() => {}) as Dispatch<SetStateAction<number>>,
  carSpacing: 0,
  setCarSpacing: (() => {}) as Dispatch<SetStateAction<number>>,
  timeHeadway: 0,
  setTimeHeadway: (() => {}) as Dispatch<SetStateAction<number>>,
  leadingCarChart: [{}] as GraphPoints[],
  setLeadingCarChart: (() => {}) as Dispatch<SetStateAction<GraphPoints[]>>,
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
  const [carSpacing, setCarSpacing] = useState(5.0);
  const [timeHeadway, setTimeHeadway] = useState(1.5);
  const [leadingCarChart, setLeadingCarChart] = useState<GraphPoints[]>(
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
      return {
        time: i,
        velocity: i * 5,
      };
    })
  );

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        carNumber,
        setCarNumber,
        carSpacing,
        setCarSpacing,
        timeHeadway,
        setTimeHeadway,
        leadingCarChart,
        setLeadingCarChart,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
