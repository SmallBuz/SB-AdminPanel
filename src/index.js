
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import {ErrorHandler} from './core/api-handler/api-handler'
// core styles
import "./scss/volt.scss";

// vendor styles
import "react-datetime/css/react-datetime.css";

import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";

ReactDOM.render(
  <BrowserRouter>
    <ErrorHandler>
      <ScrollToTop />
      <HomePage />
    </ErrorHandler>
  </BrowserRouter>,
  document.getElementById("root")
);
