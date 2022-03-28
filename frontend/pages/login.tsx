import LoginForm from "@components/LoginForm";
import useSocket from "@hooks/useSocket";
import { MantineColor } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useState } from "react";

const LoginPage: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showNotification } = useNotifications();
  const socket = useSocket();

  const notif = (color: MantineColor, message: string, title?: string) => {
    showNotification({ message, color, title, autoClose: true });
  };
  const onSubmit = () => {
    if (!email)
      return notif("red", "Please Enter Your Email", "Invalid Parameters");
    if (!password)
      return notif("red", "Please Enter Your Password", "Invalid Parameters");

    socket.emit("login", { email, password });
  };
  useEffect(() => {
    socket.on("login", (data) => {
      console.log('data',data)
      if (data.status === "failed") notif("red", data.message, "Login Failed");
    });
  }, []);
  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <LoginForm {...{ email, setEmail, password, setPassword, onSubmit }} />
    </div>
  );
};

export default LoginPage;
