import "./App.css";
import Layout from "./Componet/Layout/Layout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Products from "./Componet/Products/Products";
import Notfound from "./Componet/Notfound/Notfound";
import Card from "./Componet/Card/Card";
import Register from "./Componet/Register/Register";
import Login from "./Componet/Login/Login";
import Profile from "./Componet/Profile/Profile";
import { Authprovider } from "./contexts/authContext";
import ProtectedRoute from "./Componet/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from "./Componet/ProductDetails/ProductDetails";
import { CartContextprovider } from "./contexts/cartcontext";
import { Toaster } from "react-hot-toast";
import { Creatingorder } from "./Componet/Creating0rder/Creatingorder";
import { Allorders } from "./Componet/AllOrdwers/Allorders";
import { Offline, Online } from "react-detect-offline";

const myRouter = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "Products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },

      {
        path: "ProductDetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Allorders />
          </ProtectedRoute>
        ),
      },
      {
        path: "Creatingorder",
        element: (
          <ProtectedRoute>
            <Creatingorder />
          </ProtectedRoute>
        ),
      },

      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Card />
          </ProtectedRoute>
        ),
      },
      { path: "Register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <Notfound /> },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default function App() {
  let queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CartContextprovider>
          <Authprovider>
            <RouterProvider router={myRouter} />;
          </Authprovider>
        </CartContextprovider>
        <Toaster />
      </QueryClientProvider>

      <Offline>
        <div className="postion-fixed bottom-0 start-0 text-white rounded-3 bg-dark w-25 text-center m-3">
          oops.. you are offline now
        </div>
      </Offline>
    </>
  );
}
