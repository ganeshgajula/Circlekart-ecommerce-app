import { createContext, useContext, useReducer } from "react";
import { data, dataReducer } from "../reducer/dataReducer";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, data);

  return (
    <DataContext.Provider value={{ state, dataDispatch: dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
