import React, { useContext, useEffect } from "react";
import { Cartcontext } from "../../contexts/cartcontext";
import { TailSpin } from "react-loader-spinner";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Card() {
  const {
    getUserCart,
    Cartproducts,
    totalCartPrice,
    numOfCartItems,
    removeCartProduct,
    updateCount,
    clearCart,
    cartId,
  } = useContext(Cartcontext);
  async function deleteElement(id) {
    const res = await removeCartProduct(id);
    if (res.status === "success") {
      toast.success("product removed successfully");
    } else {
      toast.error("error accured");
    }
  }

  async function updateCountproduct(idProduct, count) {
    const res = await updateCount(idProduct, count);
    if (res.status === "success") {
      toast.success("count updates successfully");
    } else {
      toast.error("error ");
    }
  }

  useEffect(function () {
    getUserCart();
  }, []);
  if (Cartproducts === null) {
    return (
      <div className="vh-100 d-flex justify-content-center  align-items-center">
        <Helmet>
          <title>Cart</title>
        </Helmet>
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
  if (Cartproducts.length === 0) {
    return (
      <h2 className="text-center">
        <Helmet>
          <title>Cart</title>
        </Helmet>
        No Data Found in Your cart
      </h2>
    );
  }

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <div className="container bg-secondary-subtle my-4">
        <h3>Shop Cart:</h3>
        <h5>Total Price : {totalCartPrice}</h5>
        <h6>Total items : {numOfCartItems}</h6>
        <h6>cart Id : {cartId}</h6>
        <div className="d-flex justify-content-between align-items-center p-3">
          <button className="btn btn-danger">clear cart</button>
          <Link to={"/CreatingOrder"} className="btn btn-primary">
            confirm Payment
          </Link>
        </div>

        {Cartproducts.map(function (product, idx) {
          return (
            <div
              key={idx}
              className="row p-3 border border-white border-bottom-4  "
            >
              <div className="col-md-2 mb-4  ">
                <img
                  src={product.product.imageCover}
                  className="w-100"
                  alt="product"
                />
              </div>
              <div className="col-md-8">
                <h6>{product.product.title}</h6>
                <h6>price :{product.price}</h6>
                <button
                  onClick={() => deleteElement(product.product.id)}
                  className="btn btn-danger"
                >
                  Remove
                </button>
              </div>
              <div className="col-md-2">
                <div className="d-flex">
                  <button
                    onClick={() =>
                      updateCountproduct(product.product.id, product.count + 1)
                    }
                    className="btn btn-success "
                  >
                    +
                  </button>
                  <p className="h4 p-1">{product.count}</p>
                  <button
                    onClick={() =>
                      updateCountproduct(product.product.id, product.count - 1)
                    }
                    className="btn btn-danger"
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
