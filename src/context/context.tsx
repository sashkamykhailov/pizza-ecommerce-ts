import * as React from "react";

export const AppContext = React.createContext<ContextType | null>(null);

const AppProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [dark, setDark] = React.useState<boolean>(false);

  const changeTheme = (): void => {
    setDark(!dark);
  };

  return (
    <AppContext.Provider value={{ dark, changeTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
