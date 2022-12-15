import { createContext, useState, Dispatch, SetStateAction } from "react";
import useResize from "../hooks/useResize";

export const SliverContext = createContext({
  height: 0,
  enableResize: () => {},
  setHeightFromSize: (size: "S" | "M" | "L") => {},
  size: "M" as "S" | "M" | "L",
  isSliverOpen: false,
  setIsSliverOpen: (() => {}) as Dispatch<SetStateAction<boolean>>,
});

interface SliverProviderProps {
  children: React.ReactNode;
}

export const SliverProvider: React.FC<SliverProviderProps> = ({ children }) => {
  const { height, enableResize, setHeightFromSize, size } = useResize({});

  const [isSliverOpen, setIsSliverOpen] = useState(false);

  return (
    <SliverContext.Provider
      value={{
        height,
        enableResize,
        setHeightFromSize,
        size,
        isSliverOpen,
        setIsSliverOpen,
      }}
    >
      {children}
    </SliverContext.Provider>
  );
};
