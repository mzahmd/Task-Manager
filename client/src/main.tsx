import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as UrqlProvider } from "urql";

import App from "./App.tsx";
import { client } from "./lib/urqlClient.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UrqlProvider value={client}>
      <App />
    </UrqlProvider>
  </React.StrictMode>,
);
