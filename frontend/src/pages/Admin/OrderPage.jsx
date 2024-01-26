import { Spin, Table, message } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";

const OrderPage = () => {
  const MY_STRİPE_SECRET_KEY = import.meta.env.VITE_API_STRIPE_SECRET_KEY;
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Müşteri Email",
      dataIndex: "receipt_email",
      key: "receipt_email",
     
    },
    {
      title: "Sipariş Fiyatı",
      dataIndex: "amount",
      key: "amount", 
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Oluşturma Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => moment().subtract(10, "days").calendar(),
    },
  ];
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.stripe.com/v1/payment_intents`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${MY_STRİPE_SECRET_KEY}`,
        },
      });
      if (response.ok) {
        const data = await response.json();

        setDataSource(data.data);
      } else {
        message.error("Veri getirme başarısız!!!...");
      }

      console.log("response=>", response);
    } catch (error) {
      console.log("Veri  hatası :", error);
    } finally {
      setLoading(false);
    }
  }, [MY_STRİPE_SECRET_KEY]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
 console.log('dataSource', dataSource)
  return (
    <Spin spinning={loading}>
    <Table
      dataSource={dataSource}
      columns={columns} 
      rowKey={(record) => record.id}
      loading={loading}
    />
    </Spin>
  );
};

export default OrderPage;
