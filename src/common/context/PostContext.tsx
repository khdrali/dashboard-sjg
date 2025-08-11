import React, { createContext, useContext, useState } from "react";

export type PosItem = {
  id: number;
  number: string;
  creationDate: string;
  customer: string;
  salesperson: string;
  Activities: string;
  total: number;
  status: string;
};

type PosContextType = {
  posData: PosItem[];
  setPosData: React.Dispatch<React.SetStateAction<PosItem[]>>;
  updatePosItem: (updated: PosItem) => void;
  deletePosItem: (id: number) => void;
  addPosItem: (item: PosItem) => void;
};

const PosContext = createContext<PosContextType | undefined>(undefined);

const initialPosData: PosItem[] = [
  {
    id: 12,
    number: "500012",
    creationDate: "08/03/2025 22:08",
    customer: "Testing",
    salesperson: "Muhammad Rafli",
    Activities: "Active",
    total: 2000000,
    status: "Quotation",
  },
  {
    id: 11,
    number: "500011",
    creationDate: "08/03/2025 22:08",
    customer: "Another",
    salesperson: "Khaidar Ali",
    Activities: "Pending",
    total: 900000,
    status: "Quotation",
  },
  {
    id: 10,
    number: "500010",
    creationDate: "08/03/2025 22:08",
    customer: "Testing",
    salesperson: "Muhammad Rafli",
    Activities: "Active",
    total: 2000000,
    status: "Quotation",
  },
  {
    id: 9,
    number: "500009",
    creationDate: "08/03/2025 22:08",
    customer: "Another",
    salesperson: "Khaidar Ali",
    Activities: "Pending",
    total: 900000,
    status: "Quotation",
  },
  {
    id: 8,
    number: "500008",
    creationDate: "08/03/2025 22:08",
    customer: "Testing",
    salesperson: "Muhammad Rafli",
    Activities: "Active",
    total: 2000000,
    status: "Quotation",
  },
  {
    id: 7,
    number: "500007",
    creationDate: "08/03/2025 22:08",
    customer: "Another",
    salesperson: "Khaidar Ali",
    Activities: "Pending",
    total: 900000,
    status: "Quotation",
  },
  {
    id: 6,
    number: "500006",
    creationDate: "08/03/2025 22:08",
    customer: "Testing",
    salesperson: "Muhammad Rafli",
    Activities: "Active",
    total: 2000000,
    status: "Quotation",
  },
  {
    id: 5,
    number: "500005",
    creationDate: "08/03/2025 22:08",
    customer: "Another",
    salesperson: "Khaidar Ali",
    Activities: "Pending",
    total: 900000,
    status: "Quotation",
  },
  {
    id: 4,
    number: "500004",
    creationDate: "08/03/2025 22:08",
    customer: "Testing",
    salesperson: "Muhammad Rafli",
    Activities: "Active",
    total: 2000000,
    status: "Quotation",
  },
  {
    id: 3,
    number: "500003",
    creationDate: "08/03/2025 22:08",
    customer: "Another",
    salesperson: "Khaidar Ali",
    Activities: "Pending",
    total: 900000,
    status: "Quotation",
  },
  {
    id: 2,
    number: "500002",
    creationDate: "08/03/2025 22:08",
    customer: "Testing",
    salesperson: "Muhammad Rafli",
    Activities: "Active",
    total: 2000000,
    status: "Quotation",
  },
  {
    id: 1,
    number: "500001",
    creationDate: "08/03/2025 22:08",
    customer: "Another",
    salesperson: "Khaidar Ali",
    Activities: "Pending",
    total: 900000,
    status: "Quotation",
  },
];

export const PosProvider = ({ children }: { children: React.ReactNode }) => {
  const [posData, setPosData] = useState(initialPosData);

  const updatePosItem = (updatedItem: PosItem) => {
    setPosData((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const deletePosItem = (id: number) => {
    setPosData((prev) => prev.filter((item) => item.id !== id));
  };

  const addPosItem = (newItem: PosItem) => {
    setPosData((prev) => [newItem, ...prev]);
  };

  return (
    <PosContext.Provider
      value={{ posData, setPosData, updatePosItem, deletePosItem, addPosItem }}
    >
      {children}
    </PosContext.Provider>
  );
};

export const usePosContext = () => {
  const context = useContext(PosContext);
  if (!context)
    throw new Error("usePosContext must be used within PosProvider");
  return context;
};
