import LoginForm from "@components/LoginForm";
import { useUserStateDispatch } from "@context/User";
import useSocket from "@hooks/useSocket";
import useUserState from "@hooks/useUserState";
import { MantineColor } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const LoginPage: NextPage = () => {
  const { showNotification } = useNotifications();
  const socket = useSocket();
  const userStateDispatch = useUserStateDispatch();
  const { email } = useUserState();
  const router = useRouter();
  const notif = (color: MantineColor, message: string, title?: string) => {
    showNotification({ message, color, title, autoClose: true });
  };
  useEffect(() => {
    if (email) router.push("/");
    socket.on("connect", () => {
      console.log("connected to socket");
      socket.on("loginChecks", (data) => {
        notif(data.status === "failed" ? "red" : "green", data.message);
        if (data.user) {
          userStateDispatch({ type: "SET_USER", payload: data.user });
        }
      });
    });
  }, [email]);
  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <LoginForm {...{ socket }} />
    </div>
  );
};

export default LoginPage;
