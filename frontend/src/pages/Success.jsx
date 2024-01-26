import { Button, Result } from "antd";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartProvider";
const Success = () => {
  const {
    cartItems,
    setCartItems,
    couponForOnce,
    setCouponForOnce,
    couponValue,
  } = useContext(CartContext);
  useEffect(() => {
    setCartItems([]);
    localStorage.setItem("cartCoupon", JSON.stringify(false));
  }, [setCartItems]);

  return (
    <div className="success-page">
      <div className="container">
        <Result
          status="success"
          title="Ödeme Başarılı."
          subTitle="Siparişiniz tamamlandı."
          extra={[
            <Link to={"/"} key="home">
              <Button type="primary">Ana Sayfa</Button>
            </Link>,
            <a href="/admin/orders">
              <Button key="buy">Siparişlerim</Button>
            </a>,
          ]}
        />
      </div>
    </div>
  );
};

export default Success;
