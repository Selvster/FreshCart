import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Blocks } from "react-loader-spinner";

export default function CategorySlider() {
  function getCategoryData() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  const { data, isLoading } = useQuery("getCategoryDatas", getCategoryData);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    arrows: false,
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center  align-items-center">
        <Blocks
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
        />
      </div>
    );
  }

  return (
    <>
      <Slider {...settings}>
        {data?.data.data.map(function (category, idx) {
          return (
            <>
              <div key={idx} className="mb-5">
                <img
                  style={{ width: "100%", height: "400px" }}
                  alt="product"
                  src={category.image}
                />
                <p>{category.name}</p>
              </div>
            </>
          );
        })}
      </Slider>
    </>
  );
}
