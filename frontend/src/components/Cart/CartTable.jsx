import { useContext } from "react";
import CartItem from "./CartItem";
import { CartContext } from "../../context/CartProvider";

const CartTable = () => {
  const { cartItems } = useContext(CartContext);
  return (
    <table className="shop-table">
      <thead>
        <tr>
          <th className="product-thumbnail">&nbsp;</th>
          <th className="product-thumbnail">&nbsp;</th>
          <th className="product-name">Product</th>
          <th className="product-price">Price</th>
          <th className="product-quantity">Quantity</th>
          <th className="product-subtotal">Subtotal</th>
        </tr>
      </thead>
      <tbody className="cart-wrapper">
        {cartItems.map((item) => (
          <CartItem key={item._id} cartItem={item} />
        ))}
      </tbody>
    </table>
  );
};

export default CartTable;
