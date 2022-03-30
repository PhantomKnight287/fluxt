import { createContext, Dispatch, FC, useContext, useReducer } from "react";
import { UserContext, UserStateDispatchTypes } from "../types";
export const UserStateContext = createContext<UserContext>({
  username: "",
  id: "",
  email: "",
  channelId: -1,
});

export const UserStateDispatchContext = createContext(
  {} as Dispatch<{ type: UserStateDispatchTypes; payload: UserContext }>
);

const reducer = (
  state: UserContext,
  action: { type: UserStateDispatchTypes; payload: UserContext }
) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const UserStateProvider: FC = ({ children }) => {
  const [userState, dispatch] = useReducer(reducer, {
    username: "",
    id: "",
    email: "",
    channelId: -1,
  });
  return (
    <UserStateContext.Provider value={userState}>
      <UserStateDispatchContext.Provider value={dispatch}>
        {children}
      </UserStateDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

export const useUserStateDispatch = () => useContext(UserStateDispatchContext);
