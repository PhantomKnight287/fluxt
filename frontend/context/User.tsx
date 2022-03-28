import { FC } from "react";
import { useContext, createContext } from "react";
import { UserContext as UserContextType } from "@types";
const UserContext = createContext({} as UserContextType);

export const UserContextComponent: FC = ({ children }) => {
  const context = useContext(UserContext);
  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};
