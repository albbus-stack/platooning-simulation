import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { VELOCITY_DELAY } from "./P5Canvas";

export interface DataType {
  distance: number;
  velocity: number;
  time: number;
}

export interface GraphPoints {
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
  tau: 0,
  setTau: (() => {}) as Dispatch<SetStateAction<number>>,
  kp: 0,
  setKp: (() => {}) as Dispatch<SetStateAction<number>>,
  kd: 0,
  setKd: (() => {}) as Dispatch<SetStateAction<number>>,
  velocityFrameDelay: 0,
  setVelocityFrameDelay: (() => {}) as Dispatch<SetStateAction<number>>,
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
  const [timeHeadway, setTimeHeadway] = useState(0.5);
  const [tau, setTau] = useState(0.1);
  const [kp, setKp] = useState(0.2);
  const [kd, setKd] = useState(0.7);
  const [velocityFrameDelay, setVelocityFrameDelay] = useState(VELOCITY_DELAY);
  // SIMULATION
  // /*
  const [leadingCarChart, setLeadingCarChart] = useState<GraphPoints[]>(
    // [0, 10, 15, 25, 35].map((velocity, time) => {
    [2, 4, 6, 8, 10].map((velocity, time) => {
      return {
        time,
        velocity,
      };
    })
  );
  // */

  // EXPERIMENT
  /*
  const [leadingCarChart, setLeadingCarChart] = useState<GraphPoints[]>(
      [0, 1, 2, 3, 4].map((velocity, time) => {
          return {
              time: i,
              velocity: i * 2 + 2,
          };
      })
  );
   */

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
        tau,
        setTau,
        kp,
        setKp,
        kd,
        setKd,
        velocityFrameDelay,
        setVelocityFrameDelay,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
