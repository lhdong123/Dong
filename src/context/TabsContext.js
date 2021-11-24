
import { createContext, useState } from 'react';

export const tabsContext = createContext(null);

const TabsProvider = ({ children }) => {
  const [value, setValue] = useState(0);
  const [classDetails, setClassDetails] = useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClassDetails = (info) => {
    setClassDetails(info);
  }

  return (
    <tabsContext.Provider
      value={{
        value, handleChange,
        classDetails, handleClassDetails,
      }}
    >
      {children}
    </tabsContext.Provider>
  );
};

export default TabsProvider;