import React, { createContext, Dispatch, SetStateAction, useState } from "react";

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
  graphData: [[]] as DataType[][],
  setGraphData: (() => {}) as Dispatch<SetStateAction<DataType[][]>>,
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
  const [graphData, setGraphData] = useState([[]] as {
    distance: number;
    velocity: number;
    time: number;
  }[][]);

  // Default values
  const [carNumber, setCarNumber] = useState(6);
  const [carSpacing, setCarSpacing] = useState(5.0);
  const [timeHeadway, setTimeHeadway] = useState(1.25);
  const [leadingCarChart, setLeadingCarChart] = useState<GraphPoints[]>(
    [0, 1, 2, 3, 4].map((i) => {
      return {
        time: i,
        velocity: i * 2 + 2,
      };
    })
  );

  return (
    <DataContext.Provider
      value={{
        graphData,
        setGraphData,
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
