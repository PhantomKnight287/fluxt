import { useState } from "react";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import type { AppProps } from "next/app";
import { UserStateProvider } from "@context/User";
import { ChannelsProvider } from "@context/Channels";
export default function App({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <ChannelsProvider>
        <NotificationsProvider>
          <UserStateProvider>
            <MantineProvider
              theme={{ colorScheme }}
              withGlobalStyles
              withNormalizeCSS
            >
              <Component {...pageProps} />
            </MantineProvider>
          </UserStateProvider>
        </NotificationsProvider>
      </ChannelsProvider>
    </ColorSchemeProvider>
  );
}
