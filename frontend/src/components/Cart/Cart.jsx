import CartProgress from "./CartProgress";
import CartTable from "./CartTable";
import CartCoupon from "./CartCoupon";
import "./Cart.css";
 import CartTotals from "./CartTotals";
 
const Cart = () => {
  return (
    <section className="cart-page">
      <div className="container">
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
      </div>
    </section>
  );
};

export default Cart;
