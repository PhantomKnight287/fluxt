import styles from "./Input.module.scss";
import { Input as MantineInput } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { useState } from "react";
import useUserState from "@hooks/useUserState";
export default function Input({ socket }: { socket: any }) {
  const { showNotification } = useNotifications();
  const [message, setMessage] = useState("");
  const { channelId, username } = useUserState();
  return (
    <div className={styles.inputContainer}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (message.length == 0) return;
          if (message.length > 2000) {
            return showNotification({
              color: "red",
              message: "Message is too long (max 2000 characters)",
            });
          }
          socket.emit("messageCreate", {
            message,
            channel_id: channelId,
            username,
          });
          setMessage("");
        }}
      >
        <MantineInput
          placeholder="Type Here"
          maxLength={2000}
          size="md"
          radius="lg"
          value={message}
          onChange={(e: any) => {
            setMessage(e.target.value);
          }}
          disabled={channelId <= 0}
        />
        <input type="submit" value="Submit" style={{ display: "none" }} />
      </form>
    </div>
  );
}
