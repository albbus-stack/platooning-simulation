import { createContext, Dispatch, SetStateAction, useState } from "react";
import useResize from "../../hooks/useResize";

type Size = "S" | "M" | "L";

export const SliverContext = createContext({
  height: 0,
  enableResize: () => {},
  setHeightFromSize: (_: Size) => {},
  size: "M" as Size,
  isSliverOpen: false,
  setIsSliverOpen: (() => {}) as Dispatch<SetStateAction<boolean>>,
  isGraphSliver: false,
  setIsGraphSliver: (() => {}) as Dispatch<SetStateAction<boolean>>,
});

interface SliverProviderProps {
  children: React.ReactNode;
}

export const SliverProvider: React.FC<SliverProviderProps> = ({ children }) => {
  const { height, enableResize, setHeightFromSize, size } = useResize({});

  const [isSliverOpen, setIsSliverOpen] = useState(false);
  const [isGraphSliver, setIsGraphSliver] = useState(false);

  return (
    <SliverContext.Provider
      value={{
        height,
        enableResize,
        setHeightFromSize,
        size,
        isSliverOpen,
        setIsSliverOpen,
        isGraphSliver,
        setIsGraphSliver,
      }}
    >
      {children}
    </SliverContext.Provider>
  );
};
