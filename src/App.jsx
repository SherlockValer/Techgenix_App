import { Outlet } from "react-router-dom";

import "./App.css";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { useCart } from "./hooks/useCart.js";
import { useWishlist } from "./hooks/useWishlist.js";

function App() {
  const { cartLoading } = useCart();
  const { wishlistLoading } = useWishlist();

  return (
    <>
      {!cartLoading && !wishlistLoading && (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}

      {(cartLoading || wishlistLoading) && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="loader"></div>
        </div>
      )}
    </>
  );
}

export default App;
