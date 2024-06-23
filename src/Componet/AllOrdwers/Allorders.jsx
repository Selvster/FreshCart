import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { TailSpin } from "react-loader-spinner";

export function Allorders() {
  const [userOrders, setuserOrders] = useState(null);

  useEffect(function () {
    const x = jwtDecode(localStorage.getItem("token"));

    getAllorders(x.id);
  }, []);
  async function getAllorders(id) {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      );
      setuserOrders(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="container border border-black">
        <div className="row ">
          {userOrders?.map(function (order, idx) {
            return (
              <>
                <Helmet>
                  <title>All Orders</title>
                </Helmet>
                <div
                  className="col-md-6 text-center border border-success"
                  key={idx}
                >
                  <div className="order ">
                    <div className="container">
                      <div className="row">
                        {order.cartItems?.map(function (item, index) {
                          return (
                            <div className="col-md-4">
                              <div className="  m-3" key={index}>
                                <div className=" text-center p-3">
                                  <img
                                    src={item.product.imageCover}
                                    className="w-100 me-3"
                                    alt={item.product.tittle}
                                  />
                                  <span className="p-3">
                                    <h6>
                                      {item.product.title
                                        .split(" ")
                                        .slice(0, 2)
                                        .join(" ")}
                                    </h6>
                                    <h6>count:{item.count} </h6>
                                    <h6>item price:{item.price} LE </h6>
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <h6>
                      order sent to user with phone:
                      {order.shippingAddress.phone}
                    </h6>

                    <h6>
                      order sent to user at: {order.shippingAddress.city}{" "}
                    </h6>

                    <h6>Payment Method : {order.paymentMethodType}</h6>
                    <h6>total price : {order.totalOrderPrice} LE</h6>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
