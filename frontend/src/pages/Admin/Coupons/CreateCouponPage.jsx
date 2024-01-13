import { Button, Form, Input, InputNumber, Spin, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateCouponPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("values", values);
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/coupons`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      });
      navigate(`/admin/coupons`);
      if (response.ok) {
        message.success("Kupon başarıyla oluşturuldu.");
        form.resetFields();
      } else {
        message.error("Kupon oluşturulurken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Kupon oluşturma hatası :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin tip="Loading..." size="large" spinning={loading}>
      <Form form={form} name="basic" layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Kupon Kodu"
          name="code"
          style={{ maxWidth: 300 }}
          rules={[
            {
              required: true,
              message: "Lütfen Kupon kodu giriniz!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Kupon indirimi oranı"
          name="discountPercent"
          style={{ maxWidth: 300 }}
          rules={[
            {
              required: true,
              message: "Lütfen kupon indirim oranı giriniz!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Oluştur
        </Button>
      </Form>
    </Spin>
  );
};

export default CreateCouponPage;
