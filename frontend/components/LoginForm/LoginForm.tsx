import Link from "next/link";
import {
  TextInput,
  PasswordInput,
  Container,
  Title,
  Anchor,
  Text,
  Paper,
  Button,
  MantineColor,
} from "@mantine/core";
import { LoginFormProps } from "@types";
import { useState } from "react";
import { useNotifications } from "@mantine/notifications";

export default function LoginForm({
  socket
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showNotification } = useNotifications();
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
  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Link href="/signup">
          <a>Create An Account </a>
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Email"
          placeholder="you@6969.email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button fullWidth mt="xl" onClick={onSubmit}>
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
