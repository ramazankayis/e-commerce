import { useContext, useState } from "react";
import { CartContext } from "../../context/CartProvider";
import { message } from "antd";
const CartCoupon = () => {
  const {
    cartItems,
    setCartItems,
    couponForOnce,
    setCouponForOnce,
    couponValue,
  } = useContext(CartContext);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [couponCode, setCouponCode] = useState("");
  const applyCoupon = async (e) => {
    //  e.preventDefault();
    console.log("couponCode", couponCode);
    console.log("couponValue1111111", couponValue);

    if (couponCode.trim().length === 0) {
      return message.warning("Boş değer girilemez.");
    }
    try {
      const response = await fetch(
        `${apiUrl}/api/coupons/code/${couponCode.trim()}`
      );
      if (!response.ok) {
        message.error("Girdiğini kupon kodu  hatalı!!!...");
        return;
      }
      const data = await response.json();
      const discountPercent = data.discountPercent;

      setCouponForOnce(true);
      if (!couponValue) {
        const updatedCartItems = cartItems.map((item) => {
          const updatePrice = item.price * (1 - discountPercent / 100);
          return { ...item, price: updatePrice };
        });
        localStorage.setItem("cartCoupon", JSON.stringify(!couponForOnce));
        setCartItems(updatedCartItems);
        message.success(`${couponCode} kupon kodu başarıyla uygulandı.`);
        //console.log('couponForOnce', couponForOnce)
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="actions-wrapper">
      <div className="coupon">
        <input
          type="text"
          className="input-text"
          placeholder="Coupon code"
          onChange={(e) => setCouponCode(e.target.value)}
          value={couponCode}
          disabled={couponValue}
        />
        <button
          type="button"
          onClick={applyCoupon}
          className="btn"
          disabled={couponValue}
        >
          Kupon uygula
        </button>
      </div>
      <div className="update-cart">
        <button className="btn">Update Cart</button>
      </div>
    </div>
  );
};

export default CartCoupon;
