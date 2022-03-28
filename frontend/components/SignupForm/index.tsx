import React from "react";
import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
} from "@mantine/core";
import Link from "next/link";
import { SignupFormProps } from "@types";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    paddingTop: 80,
    minWidth: 400,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    width: 120,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export function SignUpForm({
  email,
  onSubmit,
  password,
  setEmail,
  setPassword,
  setUsername,
  username,
}: SignupFormProps) {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title
          order={2}
          className={classes.title}
          align="center"
          mt="md"
          mb={20}
        >
          Create a New Account
        </Title>
        <form onSubmit={() => {}}>
          <TextInput
            label="Username"
            placeholder="Phantom Knight"
            size="md"
            mb="md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            size="md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button fullWidth mt="xl" size="md" onClick={onSubmit}>
            Sign Up
          </Button>
        </form>

        <Text align="center" mt="md">
          Already have an account?{" "}
          <Link href="/login">
            <a
              style={{
                textDecoration: "none",
                color: "#1c7ed6",
              }}
            >
              Login
            </a>
          </Link>
        </Text>
      </Paper>
    </div>
  );
}
