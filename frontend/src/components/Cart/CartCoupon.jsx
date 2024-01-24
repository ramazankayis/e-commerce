import { useState } from "react";

const CartCoupon = () => {
  const [couponCode, setCouponCode] = useState("");

  const applyCoupon = (e) => {
  //  e.preventDefault();
    console.log("couponCode", couponCode);
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
        />
        <button type="button" onClick={applyCoupon} className="btn">
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
