import { UserStateDispatchContext } from "@context/User";
import { useContext } from "react";

export default function useUserStateDispatch() {
  const userStateDispatch = useContext(UserStateDispatchContext);
  return userStateDispatch;
}
