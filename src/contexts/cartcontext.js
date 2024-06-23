import axios from "axios";
import { data } from "jquery";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import toast from "react-hot-toast";

export const Cartcontext = createContext();

export function CartContextprovider({ children }) {
  const [Cartproducts, setCartproducts] = useState(null);
  const [totalCartPrice, settotalCartPrice] = useState(0);
  const [numOfCartItems, setnumOfCartItems] = useState(0);
  const [cartId, setcartId] = useState(null);

  useEffect(function () {
    getUserCart();
  }, []);

  async function clearCart() {
    try {
      const { data } = await axios.delete(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      setCartproducts([]);
      setnumOfCartItems(0);
      settotalCartPrice(0);

      return data;
    } catch (error) {
      toast.error("error ");
    }
  }
  async function updateCount(productid, count) {
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productid}`,
        {
          count: count,
        },
        { headers: { token: localStorage.getItem("token") } }
      );
      setCartproducts(data.data.products);
      settotalCartPrice(data.data.totalCartPrice);
      setnumOfCartItems(data.numOfCartItems);
      return data;
    } catch (error) {
      toast.error("error accured");
    }
  }
  async function removeCartProduct(productid) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productid}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      setCartproducts(data.data.products);
      setnumOfCartItems(data.numOfCartItems);
      settotalCartPrice(data.data.totalCartPrice);

      return data;
    } catch (error) {
      toast.error("error accured");
    }
  }
  async function getUserCart() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { headers: { token: localStorage.getItem("token") } }
      );
      setnumOfCartItems(data.numOfCartItems);
      settotalCartPrice(data.data.totalCartPrice);
      setCartproducts(data.data.products);
      setcartId(data.data._id);

      return data;
    } catch (e) {
      console.log("error", e);
    }
  }
  async function addProductTocart(productid) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: productid,
        },
        { headers: { token: localStorage.getItem("token") } }
      );
      setnumOfCartItems(data.numOfCartItems);
      settotalCartPrice(data.totalCartPrice);
      // setCartproducts(data.data.products);

      return data;
    } catch (e) {
      console.log("error", e);
    }
  }

  return (
    <Cartcontext.Provider
      value={{
        addProductTocart,
        Cartproducts,
        totalCartPrice,
        numOfCartItems,
        getUserCart,
        removeCartProduct,
        updateCount,
        clearCart,
        cartId,
        setCartproducts,
        setnumOfCartItems,
        settotalCartPrice,
      }}
    >
      {children}
    </Cartcontext.Provider>
  );
}
