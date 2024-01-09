import { Button, Popconfirm, Space, Table, message } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
const CategoryPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const columns = [
    {
      title: "Kategori Görseli",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => (
        <img src={imgSrc} alt="Image" style={{ width: 100 }} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
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
        <Space>
          <Button
            type="primary"
            onClick={() => navigate(`/admin/categories/update/${record._id}`)}
            key={index}
          >
            Düzenle
          </Button>
          <Popconfirm
            title="Kategoriyi Sil"
            description="Kategoriyi silmek istediğinizden emin misiniz?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteCategory(record._id)}
            key={record._id}
          >
            <Button type="primary" danger key={record._id}>
              Delete
            </Button>
          </Popconfirm>
        </Space>,
      ],
    },
  ];
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/categories`);
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

  const deleteCategory = async (categoryId) => {
    console.log("categoryId", categoryId);
    try {
      const response = await fetch(`${apiUrl}/api/categories/${categoryId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        message.success("Kategoriyi başarıyla silindi...");
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

export default CategoryPage;
