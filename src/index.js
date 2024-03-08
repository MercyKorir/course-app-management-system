import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.css";
import App from "./App";

// Get the root element from the DOM
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App component to the root element
root.render(
  // Wrap the App component in a BrowserRouter
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
