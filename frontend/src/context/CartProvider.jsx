import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();
const CartProvider = ({ children }) => {

  const [couponForOnce, setCouponForOnce] = useState(false);
  const couponValue = JSON.parse(localStorage.getItem("cartCoupon"));
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (cartItem) => {
    // setCartItems([...cartItems, cartItem]); //1.yol
    setCartItems((prevCart) => [
      ...prevCart,
      {
        ...cartItem,
        quantity: cartItem.quantity ? cartItem.quantity : 1,
      },
    ]);
  };

  const removeFromCart = (itemId) => {
    const filteredCartItems = cartItems.filter(
      (cartItem) => cartItem._id !== itemId
    );
    setCartItems(filteredCartItems);
  };
  return (
    <CartContext.Provider
      value={{
        addToCart,
        setCartItems,
        cartItems,
        couponForOnce,
        setCouponForOnce,
        couponValue,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;
