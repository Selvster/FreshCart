import axios from "axios";
import React, { useContext, useState } from "react";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Cartcontext } from "../../contexts/cartcontext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  const { addProductTocart } = useContext(Cartcontext);

  const [sendLoder, setsendLoder] = useState(false);
  async function addproduct(id) {
    setsendLoder(true);

    const res = await addProductTocart(id);
    console.log(res);
    if (res.status === "success") {
      toast.success(res.message);
    } else {
      toast.error("Error happened");
    }
    setsendLoder(false);
  }

  const { id } = useParams();
  function getProductdetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  const { data, isLoading } = useQuery("Productdetails", getProductdetails);
  console.log(data);

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
        <title>{data.data.data.title.split(" ").slice(0, 2).join(" ")}</title>
      </Helmet>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-3">
            <figure>
              <img className="w-100" src={data.data.data.imageCover} />
            </figure>
          </div>
          <div className="col-md-9  ">
            <div className="details">
              <h1>{data.data.data.title}</h1>
              <p>{data.data.data.description}</p>
              <h5>price: {data.data.data.price} Egp</h5>

              <button
                className="main-bg-color w-100 rounded-3"
                style={{ border: "none", color: "#fff" }}
                onClick={() => addproduct(data.data.data.id)}
              >
                {sendLoder ? (
                  <ThreeDots
                    height="25px"
                    width="25px"
                    radius="9"
                    color="#fff"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=" "
                    visible={true}
                  />
                ) : (
                  "Add To Cart"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
