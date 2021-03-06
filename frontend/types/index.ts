import { Dispatch, SetStateAction } from "react";

export type UserContext = {
  email: string;
  id: string;
  username: string;
  channelId: number;
};

export type LoginFormProps = {
  socket: any;
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

export type UserStateDispatchTypes =
  | "SET_EMAIL"
  | "SET_USERNAME"
  | "SET_USER"
  | "SET_ID";

export type Channels = {
  id: number;
  name: string;
}[];

export type SetChannels = "SET_CHANNELS";

export type Messages = {
  id: number;
  message: string;
  username: string;
}[];
