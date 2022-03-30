import styles from "./Sidebar.module.scss";
import { useChannels } from "@context/Channels";
import { useState } from "react";
import { Modal, Input, Button } from "@mantine/core";
import useUserState from "@hooks/useUserState";
import useUserStateDispatch from "@hooks/useUserStateDispatch";

export default function Sidebar({ socket }: { socket: any }) {
  const [open, setOpen] = useState(false);
  const [channelName, setChannelName] = useState("");
  const channels = useChannels();
  const userState = useUserState();
  const userStateDispatch = useUserStateDispatch();
  return (
    <div className={styles.SidebarContentContainer}>
      {channels && channels.length ? (
        <>
          {channels.map((channel) => (
            <div
              className={styles.channelInfo}
              onClick={() => {
                userStateDispatch({
                  type: "SET_USER",
                  payload: {
                    ...userState,
                    channelId: channel.id,
                  },
                });
              }}
              key={channel.id}
            >
              {channel.name}
            </div>
          ))}
        </>
      ) : (
        <h4>No Channels Found</h4>
      )}
      <div className={styles.channelInfo} onClick={() => setOpen(!open)}>
        Create New Channel
      </div>
      <Modal centered opened={open} onClose={() => setOpen(false)}>
        <Input
          placeholder="Channel Name"
          value={channelName}
          onChange={(e: any) => setChannelName(e.target.value)}
        />
        <Button
          style={{
            marginTop: "10px",
            marginLeft: "25%",
          }}
          onClick={() => {
            socket.emit("createChannel", { name: channelName });
            setOpen(false);
          }}
        >
          Create New Channel!
        </Button>
      </Modal>
    </div>
  );
}
