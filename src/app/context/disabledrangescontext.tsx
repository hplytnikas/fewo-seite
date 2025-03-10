"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { DateValue } from "@internationalized/date";

interface DisabledRangesContextProps {
  disabledRanges: [DateValue, DateValue][];
  setDisabledRanges: React.Dispatch<React.SetStateAction<[DateValue, DateValue][]>>;
}

const DisabledRangesContext = createContext<DisabledRangesContextProps | undefined>(undefined);

export const DisabledRangesProvider = ({ children }: { children: ReactNode }) => {
  const [disabledRanges, setDisabledRanges] = useState<[DateValue, DateValue][]>([]);

  return (
    <DisabledRangesContext.Provider value={{ disabledRanges, setDisabledRanges }}>
      {children}
    </DisabledRangesContext.Provider>
  );
};

export const useDisabledRanges = () => {
  const context = useContext(DisabledRangesContext);
  if (!context) {
    throw new Error("useDisabledRanges must be used within a DisabledRangesProvider");
  }
  return context;
};