import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
