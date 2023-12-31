import { useState } from "react";
import ProductItem from "./ProductItem";
import productsData from "../../data.json";
import Slider from "react-slick";
import "./Products.css";

const NextBtn = ({ onClick }) => {
  return (
    <button className="glide__arrow glide__arrow--right" onClick={onClick}>
      <i className="bi bi-chevron-right"></i>
    </button>
  );
};

const PrevBtn = ({ onClick }) => {
  return (
    <button className="glide__arrow glide__arrow--left" onClick={onClick}>
      <i className="bi bi-chevron-left"></i>
    </button>
  );
};
const Products = () => {
  const [products, setProducts] = useState(productsData);
 
  
  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
    autoplaySpeed: 1500,
    autoplay: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="products">
      <div className="container">
        <div className="section-title">
          <h2>Featured Products</h2>
          <p>Summer Collection New Morden Design</p>
        </div>
        <div className="product-wrapper product-carousel">
          <Slider {...sliderSettings}>
            {products.map((product) => (
              <ProductItem    productItem={product} key={product.id} />
            ))}
          </Slider>

          <div className="glide__arrows"></div>
        </div>
      </div>
    </section>
  );
};

export default Products;
