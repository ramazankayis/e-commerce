import CartProgress from "./CartProgress";
import CartTable from "./CartTable";
import CartCoupon from "./CartCoupon";
import "./Cart.css";
import CartTotals from "./CartTotals";
import { useContext } from "react";
import { CartContext } from "../../context/CartProvider";

const Cart = () => {
  const { cartItems } = useContext(CartContext);

  if (cartItems.length === 0) {
    localStorage.setItem("cartCoupon", JSON.stringify(false));
  }
  return (
    <section className="cart-page">
      <div className="container">
        {cartItems.length > 0 ? (
          <div className="cart-page-wrapper">
            <form className="cart-form">
              <CartProgress />
              <div className="shop-table-wrapper">
                <CartTable />
                <CartCoupon />
              </div>
            </form>
            <div className="cart-collaterals">
              <CartTotals />
            </div>
          </div>
        ) : (
          <h2> Sepette hiç ürün yok...</h2>
        )}
      </div>
    </section>
  );
};

export default Cart;
