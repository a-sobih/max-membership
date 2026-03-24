import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import App from "./App.jsx";
import "./styles/globals.css";
import "./i18n/i18n.js";
import i18n from "./i18n/i18n.js";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import { persistor, store } from "./rtk/store.js";


const lng = i18n.language || "ar";
document.documentElement.setAttribute("dir", lng === "ar" ? "rtl" : "ltr");
document.documentElement.setAttribute("lang", lng);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <Provider store={store}> */}
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <App />
      {/* </PersistGate> */}
      {/* </Provider> */}
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>,
);
