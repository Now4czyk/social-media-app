import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, ToastContainerProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const toastConfig: ToastContainerProps = {
  position: "bottom-right",
  autoClose: 2000,
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastContainer {...toastConfig} />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
