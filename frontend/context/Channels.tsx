import { createContext, Dispatch, FC, useContext, useReducer } from "react";
import { Channels, SetChannels } from "../types";
export const ChannelsStateContext = createContext<Channels>([]);

export const ChannelStateDispatchContext = createContext(
  {} as Dispatch<{ type: SetChannels; payload: Channels }>
);

const reducer = (
  state: Channels,
  action: { type: SetChannels; payload: Channels }
) => {
  switch (action.type) {
    case "SET_CHANNELS":
      return [...action.payload]
    default:
      return state;
  }
};

export const ChannelsProvider: FC = ({ children }) => {
  const [userState, dispatch] = useReducer(reducer, []);
  return (
    <ChannelsStateContext.Provider value={userState}>
      <ChannelStateDispatchContext.Provider value={dispatch}>
        {children}
      </ChannelStateDispatchContext.Provider>
    </ChannelsStateContext.Provider>
  );
};

export const useChannels = () => useContext(ChannelsStateContext);
export const useChannelsDispatch = () =>
  useContext(ChannelStateDispatchContext);
