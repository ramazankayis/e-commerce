import { Button, Form, Input, InputNumber, Select, Spin, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
const UpdateProductPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const params = useParams();
  const productId = params.id;
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [singleProduct, setSingleProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      const response = await fetch(`${apiUrl}/api/products/${productId}`, {
        method: "PUT",
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
        message.success("Ürün başarıyla güncellendi.");
        form.resetFields();
        navigate(`/admin/products`);
      } else {
        message.error("Ürün güncellenirken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Ürün güncelleme hatası :", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const [categoriesRensponse, singleProductResponse] = await Promise.all([
        fetch(`${apiUrl}/api/categories`),
        fetch(`${apiUrl}/api/products/${productId}`),
      ]);
      if (!categoriesRensponse.ok || !singleProductResponse.ok) {
        message.error("Veri getirme başarısız!!!...");
        return;
      }
      const [categoriesData, singleProductsData] = await Promise.all([
        categoriesRensponse.json(),
        singleProductResponse.json(),
      ]);

      setCategories(categoriesData);
      // setSingleProduct(singleProductsData);

      console.log("singleProductsData.img=>", singleProductsData.img);
      if (singleProductsData) {
        form.setFieldsValue({
          name: singleProductsData.name,
          current: singleProductsData.price.current,
          discount: singleProductsData.price.discount,
          description: singleProductsData.description,
          img: singleProductsData.img.join("\n"),
          colors: singleProductsData.colors.join("\n"),
          sizes: singleProductsData.sizes.join("\n"),
          category: singleProductsData.category,
        });
      }
    } catch (error) {
      console.log("Veri  hatası :", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl, productId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
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
          Güncelle
        </Button>
      </Form>
    </Spin>
  );
};

export default UpdateProductPage;
