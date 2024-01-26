import { useContext, useState } from "react";
import { CartContext } from "../../context/CartProvider";
import { message } from "antd";
import { loadStripe } from "@stripe/stripe-js";
const CartTotals = () => {
  const stripePubicKey = import.meta.env.VITE_API_STRIPE_PUBLIC_KEY;
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [fastCargoChecked, setFastCargoChecked] = useState(false);
  const { cartItems } = useContext(CartContext);
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  console.log("cartItems", cartItems);

  const cartItemTotals = cartItems.map((item) => {
    const itemTotal = item.price * item.quantity;

    return itemTotal;
  });

  const subTotals = cartItemTotals.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  }, 0);

  const cargoFee = 15;

  const cartTotals = fastCargoChecked
    ? (subTotals + cargoFee).toFixed(2)
    : subTotals.toFixed(2);

  console.log("cartItemTotals", cartItemTotals);
  console.log("subTotals", subTotals);
  console.log("fastCargoChecked", fastCargoChecked);

  const handlePayment = async () => {
    if (!user) {
      return message.warning("Ödeme yapabilmek için giriş yapmalısınız!!");
    }
    const body = {
      products: cartItems,
      user: user,
      cargoFee: fastCargoChecked ? cargoFee : 0,
    };

    try {
      const stripe = await loadStripe(stripePubicKey);

      const res = await fetch(`${apiUrl}/api/payment`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        return message.error("Ödeme işlemi başarısız oldu.!");
      }

      const session = await res.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.log("error", error);
    }
    console.log("body", body);
  };

  return (
    <div className="cart-totals">
      <h2>Cart totals</h2>
      <table>
        <tbody>
          <tr className="cart-subtotal">
            <th>Subtotal</th>
            <td>
              <span id="subtotal">₺{subTotals.toFixed(2)}</span>
            </td>
          </tr>
          <tr>
            <th>Shipping</th>
            <td>
              <ul>
                <li>
                  <label>
                    Fast Cargo: ₺15.00
                    <input
                      type="checkbox"
                      id="fast-cargo"
                      checked={fastCargoChecked}
                      onChange={() => setFastCargoChecked(!fastCargoChecked)}
                    />
                  </label>
                </li>
                <li>
                  <a href="#">Change Address</a>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>Total</th>
            <td>
              <strong id="cart-total">₺{cartTotals}</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="checkout">
        <button className="btn btn-lg" onClick={handlePayment}>
          Proceed to checkout
        </button>
      </div>
    </div>
  );
};

export default CartTotals;
