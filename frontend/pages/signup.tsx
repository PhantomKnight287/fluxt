import { SignUpForm } from "@components/SignupForm";
import type { NextPage } from "next";
import styles from "../styles/SignUp.module.scss";
import Head from "next/head";
import { useState } from "react";
import { useNotifications } from "@mantine/notifications";
import { MantineColor } from "@mantine/core";
import useSocket from "@hooks/useSocket";
import { useEffect } from "react";
const SignUpPage: NextPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { showNotification } = useNotifications();
  const socket = useSocket();
  const notif = (color: MantineColor, message: string, title?: string) => {
    showNotification({
      color,
      message,
      title,
    });
  };
  const onSubmit = () => {
    if (!username) return notif("red", "Username is required", "Error");

    if (!password) return notif("red", "Password is required", "Error");

    if (!email) return notif("red", "Email is required", "Error");
    socket.emit("signup", { username, email, password });
  };
  useEffect(() => {
    socket.on("signup", (data) => {
        if (data.status === "failed") notif("red", data.message, "Signup Failed");
    });
  }, []);
  return (
    <>
      <Head>
        <title>SignUp</title>
      </Head>
      <SignUpForm
        {...{
          username,
          setUsername,
          password,
          setPassword,
          email,
          setEmail,
          onSubmit,
        }}
      />
    </>
  );
};
export default SignUpPage;
