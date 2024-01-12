import { Button, Form, Input, Spin, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const CreateCategoryPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/categories`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      });
      navigate(`/admin/categories`);
      if (response.ok) {
        message.success("Kategori başarıyla oluşturuldu.");
        form.resetFields();
      } else {
        message.error("Kategori oluşturulurken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Kategori oluşturma hatası :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin tip="Loading..." size="large" spinning={loading}>
      <Form form={form} name="basic" layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Kategori İsmi"
          name="name"
          rules={[
            {
              required: true,
              message: "Lütfen kategori adını giriniz!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Kategori görseli (link)"
          name="img"
          rules={[
            {
              required: true,
              message: "Lütfen kategori görsel linkini giriniz!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Oluştur
        </Button>
      </Form>
    </Spin>
  );
};

export default CreateCategoryPage;
