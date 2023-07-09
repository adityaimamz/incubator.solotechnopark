import "@/styles/globals.css";
import React from "react";
import "aos/dist/aos.css";
import { AppProvider } from "@/context/AppContext";

export default function App({ Component, pageProps }) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}
