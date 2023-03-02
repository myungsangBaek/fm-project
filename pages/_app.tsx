import ThemeConfig from "@/config/styles/theme";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={ThemeConfig}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
