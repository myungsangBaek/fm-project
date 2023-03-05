import ThemeConfig from "@/config/styles/theme";

import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { Reset } from "styled-reset";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={ThemeConfig}>
        <Reset />
        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  );
}
