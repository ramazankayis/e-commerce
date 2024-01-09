import { Button, Checkbox, Form, Input, Spin, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const UpdateCategoryPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const params = useParams();
  const categoriyId = params.id;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  console.log("categoriyId", categoriyId);
  const onFinish = async (values) => {
    console.log("form", form.getFieldsValue());
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/categories/${categoriyId}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success("Kategori başarıyla güncellendi.");
      } else {
        message.error("Kategori güncelenirken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Kategori güncelleme hatası :", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchSingleCategory = useCallback(async () => {
    setLoading(true);
     
    try {
      const response = await fetch(`${apiUrl}/api/categories/${categoriyId}`);
      if (!response.ok) {
        throw new Error("Verileri getirme hatası");
      }
      const data = await response.json();
      console.log("data", data);
      if (data) {
        form.setFieldsValue({
          name: data.name,
          img: data.img,
        });
      }
    } catch (error) {
      console.log("Veri  hatası :", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchSingleCategory();
  }, [fetchSingleCategory]);

  return (
    <Spin tip="Loading..." size="large" spinning={loading}>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
        onFinish={onFinish}
      >
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
          Güncelle
        </Button>
      </Form>
    </Spin>
  );
};

export default UpdateCategoryPage;
