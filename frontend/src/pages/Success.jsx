import { Button, Result } from "antd";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartProvider";
const Success = () => {
  const { setCartItems } = useContext(CartContext);
  useEffect(() => {
    setCartItems([]);
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
            <Button key="buy">Siparişlerim</Button>,
          ]}
        />
      </div>
    </div>
  );
};

export default Success;
