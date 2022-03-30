import { io } from "socket.io-client";
import { backendUrl } from "@constants";
import { useEffect } from "react";
export default function useSocket(url?: string) {
  const socket = io(url || backendUrl);
  socket.connect();
  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);
  return socket;
}
