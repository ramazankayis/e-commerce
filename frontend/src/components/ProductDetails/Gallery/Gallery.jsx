import { useState } from "react";
import productsData from "../../../data.json";
import Slider from "react-slick";
import "./Gallery.css";
import { useLocation } from "react-router-dom";

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
const Gallery = ({ singleProduct }) => {
  // const { pathname } = useLocation();
  // const subId = pathname.substring(pathname.length - 1, pathname.length);
  // const [activeImg, setActiveImg] = useState({
  //   img: productsData[Number(subId) - 1].img.singleImage,
  //   imgIndex: 0,
  // });
  const { pathname } = useLocation();

  const [activeImg, setActiveImg] = useState({
    img: singleProduct.img[0],
    imgIndex: 0,
  });

  //"https://e-commerce-udemy.netlify.app/img/products/product5/1.png"
  //from "img" search index
  // const regex = "img";
  // const imgValueIndex = activeImg.img.search(regex);

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
        <img src={`${activeImg.img}`} id="single-image" alt="" />
      </div>
      <div className="product-thumb">
        <div className="glide__track" data-glide-el="track">
          <ol className="gallery-thumbs glide__slides">
            <Slider {...sliderSettings}>
              {singleProduct.img.map((itemImg, index) => (
                <li
                  key={index}
                  onClick={() =>
                    setActiveImg({
                      img: itemImg,
                      imgIndex: index,
                    })
                  }
                  className="glide__slide glide__slide--active"
                >
                  <img
                    src={`${itemImg}`}
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
