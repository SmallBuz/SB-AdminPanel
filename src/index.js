import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ErrorHandler } from "./core/api-handler/api-handler";
// core styles
import "./scss/volt.scss";

// vendor styles
import "react-datetime/css/react-datetime.css";

import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <BrowserRouter>
    <ErrorHandler>
      <ScrollToTop />
      <HomePage />
    </ErrorHandler>
  </BrowserRouter>
);
