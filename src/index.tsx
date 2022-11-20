import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ErrorHandler } from "./core/api-handler/api-handler";

import "./scss/volt.scss";

// vendor styles
import "react-datetime/css/react-datetime.css";
import { store } from "./redux/store";
import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ErrorHandler>
        <ScrollToTop />
        <HomePage />
      </ErrorHandler>
    </BrowserRouter>
  </Provider>
);
