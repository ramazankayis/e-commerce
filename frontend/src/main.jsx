import React from "react";
import ReactDOM from "react-dom/client";
import CartProvider from "./context/CartProvider.jsx";
import  {LayoutDefault}  from "./Layouts/Layout.jsx";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CartProvider>
      <LayoutDefault>
        <App />
      </LayoutDefault>
    </CartProvider>
  </BrowserRouter>
);
