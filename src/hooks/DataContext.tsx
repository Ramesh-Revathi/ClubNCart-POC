import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Login {
  userLoginId: string;
  loginVia: string;
}

interface DataState {
  token: string;
  login: Login;
}

const DEFAULT_STATE: DataState = {
  token: '',
  login: {
    userLoginId: '',
    loginVia: ''
  }
};

interface DataContextType {
  data: DataState;
  setData: React.Dispatch<React.SetStateAction<DataState>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState<DataState>(DEFAULT_STATE);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
