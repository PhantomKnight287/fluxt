import { UserStateContext } from "@context/User";
import { useContext } from "react";

export default function useUserState() {
  const userContext = useContext(UserStateContext);
  return userContext;
}
