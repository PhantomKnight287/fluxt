import useSocket from "@hooks/useSocket";
import useUserState from "@hooks/useUserState";
import Input from "@components/Input";
import { Messages } from "@types";
import { useEffect, useState } from "react";
import styles from "./Chat.module.scss";
import { Avatar } from "@mantine/core";

export default function Chat() {
  const { channelId } = useUserState();
  const [messages, setMessages] = useState<Messages>([]);
  const socket = useSocket();
  useEffect(() => {
    socket.emit("getMessages", { id: channelId });
    console.log(channelId);
    socket.on("Messages", (data) => {
      setMessages(data.messages);
    });
  }, [channelId]);
  return (
    <div className={styles.container}>
      <div style={{ opacity: 0 }}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio,
        quidem.
      </div>
      {messages && messages.length ? (
        <>
          {messages.map((message) => (
            <div className={styles.message} key={message.id}>
              <div className={styles.userInfoHolder}>
                <div className={styles.userInfo}>
                  <Avatar radius="xl" />
                </div>
              </div>
              <div className={styles.messageContainer}>
                <span>{message.username}</span> <br/>
                {message.message}
              </div>
            </div>
          ))}
        </>
      ) : (
        <h4>No Messages Found</h4>
      )}
      <Input {...{ socket }} />
    </div>
  );
}
