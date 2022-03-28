import { Dispatch, SetStateAction } from "react";

export type UserContext = {
  email: string;
  id: string;
  username: string;
};

export type LoginFormProps = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
};

export type SignupFormProps = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
};