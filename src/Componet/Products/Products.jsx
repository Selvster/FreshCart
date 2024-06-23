import axios from "axios";
import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useQuery } from "react-query";
import Homeslider from "../Homeslider/Homeslider";
import CategorySlider from "../CategorySliders/CategorySlider";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Cartcontext } from "../../contexts/cartcontext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function Products() {
  useEffect(function () {
    getUserCart();
  }, []);
  const { addProductTocart, getUserCart } = useContext(Cartcontext);
  async function addproduct(id) {
    const res = await addProductTocart(id);
    if (res.status === "success") {
      console.log("product added successfully form product");
      toast.success(res.message);
    } else {
      toast.error("Error happened");
    }
  }

  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  let { isLoading, data } = useQuery("allproducts", getProducts);

  if (isLoading) {
    return (
      <div className="vh-100 d-flex justify-content-center  align-items-center">
        <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>All Product</title>
      </Helmet>
      <div className="container py-4 ">
        <div className="row p-4 mb-5">
          <div className="col-md-9 p-0">
            <Homeslider />
          </div>
          <div className="col-md-3 p-0">
            <img
              style={{ width: "100%", height: "200px" }}
              src={require("../../images/blog-img-1.jpeg")}
              alt=""
            />
            <img
              style={{ width: "100%", height: "200px" }}
              src={require("../../images/blog-img-2.jpeg")}
              alt=""
            />
          </div>
        </div>
        <h4>Shop Popular Categories</h4>
        <CategorySlider />

        <div className="row gy-4 mt-3">
          {data?.data.data.map(function (product, idx) {
            return (
              <div key={idx} className="col-md-2">
                <Link to={`/productdetails/${product.id}`}>
                  {" "}
                  <div className="product">
                    <img
                      src={product.imageCover}
                      alt="product"
                      className="w-100"
                    />
                    <h6 className="main-color">{product.category.name}</h6>
                    <h5>{product.title.split(" ").slice(0, 2).join(" ")}</h5>
                    <div className="d-flex justify-content-between">
                      <p>{product.price} EGP</p>
                      <span>
                        <i
                          className="fa-solid fa-star "
                          style={{ color: "#f1ca09" }}
                        ></i>
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </div>
                </Link>
                <button
                  className="main-bg-color w-100 rounded-3"
                  style={{ border: "none", color: "#fff" }}
                  onClick={() => addproduct(product.id)}
                >
                  Add to cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
      :
    </>
  );
}
