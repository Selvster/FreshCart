import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Homeslider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <>
      {" "}
      <div>
        <Slider {...settings}>
          <div>
            <img
              style={{ width: "100%", height: "400px" }}
              alt="product"
              src={require("../../images/slider-image-1.jpeg")}
            />
          </div>
          <div>
            <img
              style={{ width: "100%", height: "400px" }}
              alt="product"
              src={require("../../images/slider-image-2.jpeg")}
            />
          </div>
          <div>
            <img
              style={{ width: "100%", height: "400px" }}
              alt="product"
              src={require("../../images/slider-image-3.jpeg")}
            />
          </div>
          <div>
            <img
              style={{ width: "100%", height: "400px" }}
              alt="product"
              src={require("../../images/slider-2.jpeg")}
            />
          </div>
        </Slider>
      </div>
    </>
  );
}
