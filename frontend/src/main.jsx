import React from "react";
import ReactDOM from "react-dom/client";
import MainLayout from "./Layouts/MainLayout.jsx";
import CartProvider from "./context/CartProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CartProvider>
      <MainLayout>
        <App />
      </MainLayout>
    </CartProvider>
  </BrowserRouter>
);
