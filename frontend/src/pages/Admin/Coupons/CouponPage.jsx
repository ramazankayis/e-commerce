import { Button, Popconfirm, Space, Table, message } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
const CouponPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const columns = [
    {
      title: "Kupon Kodu",
      dataIndex: "code",
      key: "code",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "İndirim Oranı",
      dataIndex: "discountPercent",
      key: "discountPercent",
      render: (text) => <b> %{text}</b>,
    },
    {
      title: "Oluşturma Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => moment().subtract(10, "days").calendar(),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record, index) => [
        console.log("record", record),
        console.log("index", index),
        <Space key={record._id}>
          <Button
            type="primary"
            onClick={() => navigate(`/admin/categories/update/${record._id}`)}
            key={index}
          >
            Düzenle
          </Button>
          <Popconfirm
            title="Kuponu Sil"
            description="Kuponu silmek istediğinizden emin misiniz?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteCoupon(record._id)}
            key={record._id}
          >
            <Button type="primary" danger key={record._id}>
              SİL
            </Button>
          </Popconfirm>
        </Space>,
      ],
    },
  ];
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/coupons`);
      if (response.ok) {
        const data = await response.json();

        setDataSource(data);
      } else {
        message.error("Veri getirme başarısız!!!...");
      }

      console.log("response=>", response);
    } catch (error) {
      console.log("Veri  hatası :", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  const deleteCoupon = async (couponId) => {
    console.log("couponId", couponId);
    try {
      const response = await fetch(`${apiUrl}/api/coupons/${couponId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        message.success("Kuponu başarıyla silindi...");
        fetchCategories();
      } else {
        message.error("Silme işlemi başarısız!!!...");
      }

      console.log("response=>", response);
    } catch (error) {
      console.log("Silme hatası :", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
      loading={loading}
    />
  );
};

export default CouponPage;
