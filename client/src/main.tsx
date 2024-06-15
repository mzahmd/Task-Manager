import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider as UrqlProvider } from "urql";
import { client } from "./lib/urqlClient.ts";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UrqlProvider value={client}>
      <App />
    </UrqlProvider>
  </React.StrictMode>,
);
