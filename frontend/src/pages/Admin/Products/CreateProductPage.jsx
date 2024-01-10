import { Button, Form, Input, InputNumber, Select, Spin, message } from "antd";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
const CreateProductPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/categories`);
        if (response.ok) {
          const data = await response.json();

          setCategories(data);
        } else {
          message.error("Veri getirme başarısız!!!...");
        }

        console.log("response=>", response);
      } catch (error) {
        console.log("Veri  hatası :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [apiUrl]);

  const splitOrTrimOperation = (value) => {
    return value.split("\n").map((link) => link.trim());
  };
  const onFinish = async (values) => {
    console.log("values", values);

    const imgLinks = splitOrTrimOperation(values.img);
    const colors = splitOrTrimOperation(values.colors);
    const sizes = splitOrTrimOperation(values.sizes);

    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/products`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          price: {
            current: values.current,
            discount: values.discount,
          },
          colors,
          sizes,
          img: imgLinks,
        }),
      });
      if (response.ok) {
        message.success("Ürün başarıyla oluşturuldu.");
        form.resetFields();
        navigate(`/admin/products`);
      } else {
        message.error("Ürün oluşturulurken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Ürün oluşturma hatası :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin tip="Loading..." size="large" spinning={loading}>
      <Form form={form} name="basic" layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Ürün İsmi"
          name="name"
          rules={[
            {
              required: true,
              message: "Lütfen Ürün adını giriniz!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Ürün Kategorisi "
          name="category"
          rules={[
            {
              required: true,
              message: "Lütfen 1 kategori seçiniz!",
            },
          ]}
        >
          <Select>
            {categories.map((category) => (
              <Select.Option value={category._id} key={category._id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Fiyat"
          name="current"
          rules={[
            {
              required: true,
              message: "Lütfen ürün fiyatını giriniz!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="indirim oranı"
          name="discount"
          rules={[
            {
              required: true,
              message: "Lütfen indirim oranı giriniz!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Ürün Açıklaması"
          name="description"
          rules={[
            {
              required: true,
              message: "Lütfen ürün açıklaması giriniz!",
            },
          ]}
        >
          <ReactQuill style={{ backgroundColor: "white" }} />
        </Form.Item>

        <Form.Item
          label="Ürün görselleri (linkler)"
          name="img"
          rules={[
            {
              required: true,
              message: "Lütfen en az 4 ürün görsel linki giriniz!",
            },
          ]}
        >
          <Input.TextArea
            autoSize={{ minRows: 4 }}
            placeholder="Herbir görsel linkini yeni bir satıra yazınız"
          />
        </Form.Item>
        <Form.Item
          label="Ürün renkleri (RGB kodları)"
          name="colors"
          rules={[
            {
              required: true,
              message: "Lütfen en az 1 ürün rengi giriniz!",
            },
          ]}
        >
          <Input.TextArea
            autoSize={{ minRows: 4 }}
            placeholder="Herbir RGB kodunu yeni bir satıra yazınız"
          />
        </Form.Item>
        <Form.Item
          label="Ürün Bendenleri "
          name="sizes"
          rules={[
            {
              required: true,
              message: "Lütfen en az 1 ürün beden numarası giriniz!",
            },
          ]}
        >
          <Input.TextArea
            autoSize={{ minRows: 4 }}
            placeholder="Herbir beden numarasını yeni bir satıra yazınız"
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Oluştur
        </Button>
      </Form>
    </Spin>
  );
};

export default CreateProductPage;
