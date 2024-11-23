import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getDefaultStore } from "jotai";
import i18n from "./i18n.ts";
import { notificationAtom } from "./store/store.ts";
import { APIProvider } from "@vis.gl/react-google-maps";
import "./index.css";

const store = getDefaultStore();
const googleMapsApiKey = import.meta.env.VITE_MAP_KEY;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
    mutations: {
      onError: () => {
        store.set(notificationAtom, (prev) => ({
          ...prev,
          message: i18n.t("error"),
          type: "error",
          isAutoClose: true,
        }));
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <MotionConfig transition={{ ease: "anticipate", duration: 0.7 }}>
        <APIProvider apiKey={googleMapsApiKey}>
          <App />
        </APIProvider>
      </MotionConfig>
    </QueryClientProvider>
  </BrowserRouter>
);
