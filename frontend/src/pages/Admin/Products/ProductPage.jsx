import { Button, Popconfirm, Space, Table, message } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
const ProductPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const columns = [
    {
      title: "Product Görseli",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => (
        // imgSrc.map((img, index) => (
        //   <img src={img} key={index} alt="Image" style={{ width: 100 }} />
        // )),
        <img src={imgSrc[0]} alt="Image" style={{ width: 100 }} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Kategori",
      dataIndex: "categoryName",
      key: "categoryName",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Fiyat",
      dataIndex: "price",
      key: "price",
      render: (text) => <span>{text.current.toFixed(2)}₺</span>,
    },
    {
      title: "İndirim",
      dataIndex: "price",
      key: "price",
      render: (text) => <span>%{text.discount}</span>,
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
        <Space key={record._id}>
          <Button
            type="primary"
            onClick={() => navigate(`/admin/products/update/${record._id}`)}
            key={index}
          >
            Düzenle
          </Button>
          <Popconfirm
            title="Ürün Sil"
            description="Ürünü silmek istediğinizden emin misiniz?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteProduct(record._id)}
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
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const [categoriesRensponse, productsResponse] = await Promise.all([
        fetch(`${apiUrl}/api/categories`),
        fetch(`${apiUrl}/api/products`),
      ]);
      if (!categoriesRensponse.ok || !productsResponse.ok) {
        message.error("Veri getirme başarısız!!!...");
      }
      const [categoriesData, productsData] = await Promise.all([
        categoriesRensponse.json(),
        productsResponse.json(),
      ]);

      const productWithCategories = productsData.map((product) => {
        console.log("product=>", product);
        const categoryId = product.category;
        const category = categoriesData.find((item) => item._id === categoryId);

        return {
          ...product,
          categoryName: category ? category.name : "",
        };
      });

      console.log("productWithCategories", productWithCategories);
      setDataSource(productWithCategories);
    } catch (error) {
      console.log("Veri  hatası :", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  const deleteProduct = async (productId) => {
    console.log("productId", productId);
    try {
      const response = await fetch(`${apiUrl}/api/products/${productId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        message.success("Ürünü başarıyla silindi...");
        fetchProducts();
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
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
      loading={loading}
    />
  );
};

export default ProductPage;
