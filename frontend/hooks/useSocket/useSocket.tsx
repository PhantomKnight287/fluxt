import { io } from "socket.io-client";
import { backendUrl } from "@constants";
export default function useSocket(url?: string) {
  const socket = io(url || backendUrl);

  return socket;
}
