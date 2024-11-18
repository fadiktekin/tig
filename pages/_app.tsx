import Layout from "@/components/Layout";
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SWRConfig } from "swr";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const theme = createTheme({
  palette: {
    primary: {
      light: "#f5fed7",
      main: "#E4FC9C",
      dark: "#D1FA56",
      contrastText: "#202A25",
    },
    secondary: {
      light: "#FAF0EF",
      main: "#F9CECB",
      dark: "#FFA69E",
      contrastText: "#202A25",
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <SWRConfig
            value={{
              fetcher: (resource, init) =>
                fetch(resource, init).then((res) => res.json()),
            }}
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SWRConfig>
        </LocalizationProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
