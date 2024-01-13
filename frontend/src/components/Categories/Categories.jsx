import { useCallback, useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import "./Categories.css";
import { message } from "antd";
const Categories = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [categories, setCategories] = useState([]);

  const fetchCategories = useCallback(async () => {
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
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <section className="categories">
      <div className="container">
        <div className="section-title">
          <h2>All Categories</h2>
          <p>Summer Collection New Morden Design</p>
        </div>
        <ul className="category-list">
          {categories.map((category) => (
            <CategoryItem key={category._id} category={category} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Categories;
