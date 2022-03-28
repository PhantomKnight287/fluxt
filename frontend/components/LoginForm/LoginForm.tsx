import styles from "./LoginForm.module.scss";
import {
  TextInput,
  PasswordInput,
  Container,
  Title,
  Anchor,
  Text,
  Paper,
  Button,
} from "@mantine/core";
import { LoginFormProps } from "@types";

export default function LoginForm({
  onSubmit,
  password,
  setPassword,
  setEmail,
  email,
}: LoginFormProps) {
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
        <Anchor<"a">
          href="#"
          size="sm"
          onClick={(event) => event.preventDefault()}
        >
          Create account
        </Anchor>
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
