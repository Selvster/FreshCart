import axios from "axios";
import React from "react";
import { useContext } from "react";
import toast from "react-hot-toast";
import { Cartcontext } from "../../contexts/cartcontext";

export function Creatingorder() {
  const { cartId, settotalCartPrice, setCartproducts, setnumOfCartItems } =
    useContext(Cartcontext);

  console.log(cartId, "cartid");

  async function confirmCashPayment() {
    const phoneValue = document.querySelector("#phone").value;
    const cityValue = document.querySelector("#city").value;
    const detailsValue = document.querySelector("#detials").value;

    const shipDetails = {
      shippingAddress: {
        details: detailsValue,
        phone: phoneValue,
        city: cityValue,
      },
    };
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,

        shipDetails,

        {
          headers: { token: localStorage.getItem("token") },
        }
      );

      if (data.status === "success") {
        toast.success("order confirmed cusseccfuly");
        setCartproducts([]);
        setnumOfCartItems(0);
        settotalCartPrice(0);
        window.open("http://localhost:3000/Products", "_blank");
      } else {
        toast.error("not confirmed");
      }
    } catch (error) {
      toast.error("error happened");
      console.log(error);
    }
  }

  async function confirmOnlinePayment() {
    const phoneValue = document.querySelector("#phone").value;
    const cityValue = document.querySelector("#city").value;
    const detailsValue = document.querySelector("#detials").value;

    const shipDetails = {
      shippingAddress: {
        details: detailsValue,
        phone: phoneValue,
        city: cityValue,
      },
    };
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        shipDetails,
        {
          headers: { token: localStorage.getItem("token") },
          params: { url: "http://localhost:3000" },
        }
      );
      window.open(data.session.url, "_blank");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="container p-5">
        <form>
          <div class="mb-3">
            <label htmlFor="" className="htmlForabel">
              Phone
            </label>
            <input type="tel" id="phone" className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              City
            </label>
            <input type="text" id="city" className="form-control" i />
          </div>
          <div className="mb-3 ">
            <label type="text">details</label>

            <input type="text" id="detials" className="form-control" />
          </div>

          <button
            type="button"
            onClick={confirmOnlinePayment}
            className="btn btn-primary m-3"
          >
            confirm Online Payment
          </button>
          <button
            type="button"
            onClick={confirmCashPayment}
            className="btn btn-success"
          >
            confirm cash Payment
          </button>
        </form>
      </div>
    </>
  );
}
