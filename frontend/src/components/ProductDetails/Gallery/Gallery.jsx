import { useState } from "react";
import productsData from "../../../data.json";
import Slider from "react-slick";
import "./Gallery.css";

const NextBtn = ({ onClick }) => {
  return (
    <button
      className="glide__arrow glide__arrow--right"
      data-glide-dir=">"
      onClick={onClick}
      style={{ zIndex: "2" }}
    >
      <i className="bi bi-chevron-right"></i>
    </button>
  );
};

const PrevBtn = ({ onClick }) => {
  return (
    <button
      className="glide__arrow glide__arrow--left"
      data-glide-dir="<"
      onClick={onClick}
      style={{ zIndex: "2" }}
    >
      <i className="bi bi-chevron-left"></i>
    </button>
  );
};
const Gallery = () => {
  console.log("productsData", productsData[0].img.thumbs[0]);
  const [activeImg, setActiveImg] = useState({
    img: productsData[0].img.singleImage,
    imgIndex: 0,
  });

  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
  };
  return (
    <div className="product-gallery">
      <div className="single-image-wrapper">
        <img src={activeImg.img} id="single-image" alt="" />
      </div>
      <div className="product-thumb">
        <div className="glide__track" data-glide-el="track">
          <ol className="gallery-thumbs glide__slides">
            <Slider {...sliderSettings}>
              {productsData[0].img.thumbs.map((itemImg, index) => (
                <li
                  key={index}
                  onClick={() =>
                    setActiveImg({
                      img: productsData[0].img.thumbs[index],
                      imgIndex: index,
                    })
                  }
                  className="glide__slide glide__slide--active"
                >
                  <img
                    src={itemImg}
                    alt=""
                    className={`img-fluid ${
                      activeImg.imgIndex === index ? "active" : ""
                    }`}
                  />
                </li>
              ))}
            </Slider>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
