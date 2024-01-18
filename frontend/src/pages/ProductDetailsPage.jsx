import ProductDetails from "../components/ProductDetails/ProductDetails";

import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
const ProductDetailsPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { id: productId } = useParams();
  const [singleProduct, setSingleProduct] = useState(null);

  const fetchSingleProduct = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/api/products/${productId}`);
      if (!response.ok) {
        throw new Error("Verileri getirme hatası");
      }
      const data = await response.json();
      setSingleProduct(data);
    } catch (error) {
      console.log("Veri  hatası :", error);
    }
  }, [apiUrl, productId]);

  useEffect(() => {
    fetchSingleProduct();
  }, [fetchSingleProduct]);

  return singleProduct ? (
    <ProductDetails
      singleProduct={singleProduct}
      setSingleProduct={setSingleProduct}
    />
  ) : (
    <p>Ürün yükleniyor...</p>
  );
};

export default ProductDetailsPage;
