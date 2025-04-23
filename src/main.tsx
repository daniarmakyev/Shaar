import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getDefaultStore } from "jotai";
import i18n from "./i18n";
import { notificationAtom } from "./store/store";
import "./index.css";

const store = getDefaultStore();
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
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <MotionConfig transition={{ ease: "anticipate", duration: 0.7 }}>
        <App />
      </MotionConfig>
    </BrowserRouter>
  </QueryClientProvider>
);
