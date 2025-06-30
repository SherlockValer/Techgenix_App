import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";

import "./index.css";

// Import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Import pages
import App from "./App.jsx";
import ProductListings from "./pages/ProductListings.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import WishList from "./pages/WishList.jsx";
import Cart from "./pages/Cart.jsx";
import { GlobalContextProvider } from "./context/globalContext.jsx";
import { ProductDataContextProvider } from "./context/productDataContext.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import Home from "./pages/Home.jsx";
import MyAccount from "./pages/MyAccount.jsx";
import UserProfile from "./components/UserProfile.jsx";
import Addressess from "./components/Addressess.jsx";
import AddNewAddress from "./components/AddNewAddress.jsx";
import Orders from "./components/Orders.jsx";
import About from "./pages/About.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";
import { WishlistContextProvider } from "./context/WishlistContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <ContactUs /> },
      {
        path: "products/:category",
        element: <ProductListings />,
      },
      {
        path: "productDetails/:productId",
        element: <ProductDetails />,
      },
      {
        path: "userProfile",
        element: <UserProfile />,
      },
      {
        path: "wishlist",
        element: <WishList />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "checkout/success/:orderId",
        element: <OrderSuccess />,
      },
      {
        path: "account",
        element: <MyAccount />,
        children: [
          { index: true, element: <UserProfile /> },
          {
            path: "address",
            element: <Addressess />,
          },
          {
            path: "new-address",
            element: <AddNewAddress />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <GlobalContextProvider>
    <ProductDataContextProvider>
      <WishlistContextProvider>
        <CartContextProvider>
          <RouterProvider router={router} />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
        </CartContextProvider>
      </WishlistContextProvider>
    </ProductDataContextProvider>
  </GlobalContextProvider>
);
