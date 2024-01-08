import { Button, Popconfirm, Table, message } from "antd";
import React, { useCallback, useEffect, useState } from "react";

const CategoryPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (imgSrc) => (
        <img
          src={imgSrc}
          alt="Image"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => [
        console.log("record", record),
        <Popconfirm
          title="Kullanıcıyı Sil"
          description="Kullanıcıyı silmek istediğinizden emin misiniz?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => deleteUser(record._id)}
          key={record._id}
        >
          <Button type="primary" danger>
            Delete
          </Button>
        </Popconfirm>,
      ],
    },
  ];
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/users`);
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

  const deleteUser = async (userId) => {
    console.log("userId", userId);
    try {
      const response = await fetch(`${apiUrl}/api/users/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        message.success("Kullanıcı başarıyla silindi...");
        fetchUsers();
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
    fetchUsers();
  }, [fetchUsers]);

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
