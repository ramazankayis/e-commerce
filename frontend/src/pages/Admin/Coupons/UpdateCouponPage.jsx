import { Button, Form, Input, InputNumber, Spin, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const UpdateCouponPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const params = useParams();
  const couponId = params.id;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log("couponId", couponId);
  const onFinish = async (values) => {
    console.log("form", form.getFieldsValue());
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/coupons/${couponId}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      });
      
      if (response.ok) {
        message.success("Kupon başarıyla güncellendi.");
        navigate(`/admin/coupons`);
      } else {
        message.error("Kupon güncelenirken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Kupon güncelleme hatası :", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchSingleCoupon = useCallback(async () => {
    setLoading(true);
     
    try {
      const response = await fetch(`${apiUrl}/api/coupons/${couponId}`);
      if (!response.ok) {
        throw new Error("Verileri getirme hatası");
      }
      const data = await response.json();
      console.log("data", data);
      if (data) {
        form.setFieldsValue({
          code: data.code,
          discountPercent: data.discountPercent,
        });
      }
    } catch (error) {
      console.log("Veri  hatası :", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl,couponId]);

  useEffect(() => {
    fetchSingleCoupon();
  }, [fetchSingleCoupon]);

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
          label="Kupon Kodu"
          name="code"
          rules={[
            {
              required: true,
              message: "Lütfen kupon kodu giriniz!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Kupon indirim oranı"
          name="discountPercent"
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
          Güncelle
        </Button>
      </Form>
    </Spin>
  );
};

export default UpdateCouponPage;
