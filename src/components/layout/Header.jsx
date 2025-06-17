import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

// Custom CSS
import "../../App.css";

// Material UI Icons
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { MdAccountCircle, MdOutlineShoppingCart } from "react-icons/md";
import { HiShoppingBag } from "react-icons/hi";
import { BsSearch, BsXLg } from "react-icons/bs";

import useGlobalContext from "../../context/globalContext";
import { toast } from "react-toastify";

const Header = () => {
  const [searchQuery, setQuery] = useState("");
  const [searchResult, setResult] = useState([]);
  const [showResult, setShow] = useState(false);
  const [error, setError] = useState(null);

  // useNavigate to go to a location
  const navigate = useNavigate();

  const { wishlistCount, cartCount, setCartCount, API_URL } =
    useGlobalContext();

  // Fetch Search Data
  const searchBtnHandler = () => {
    if (searchQuery) {
      fetch(`${API_URL}/search/${searchQuery}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            setResult(data);
            setShow(true);
          } else {
            throw data.error;
          }
        })
        .catch((error) => setError(error));
    } else {
      toast.error("Please enter some input");
    }
  };

  const handleCloseSearch = () => {
    setQuery("");
    setResult([]);
    setShow(false);
    setError("");
  };

  const handleSearchClick = (productId) => {
    navigate(`/productDetails/${productId}`);
    window.location.reload();
  };

  return (
    <header>
      <div className="container py-3">
        <nav className="navbar navbar-expand-lg d-flex justify-content-between align-items-center">
          <div>
            <button
              className="navbar-toggler order-0"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <Link
              className="navbar-brand order-1 electrolize-regular fs-4 fw-bold"
              to="/"
            >
              Tech
              <span className="electrolize-regular text-primary fs-4 fw-bold">
                Genix
              </span>
            </Link>
          </div>

          <div
            className="collapse navbar-collapse order-4 order-lg-2 order-md-4 order-sm-4"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item fs-5">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item fs-5">
                <NavLink className="nav-link" to="/products/Smartphones">
                  Products
                </NavLink>
              </li>
              <li className="nav-item fs-5">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item fs-5">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Login, Wishlist, Cart */}
          <div className="order-3 col-auto d-flex justify-content-end align-items-center">
            <button
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#searchBar"
              aria-expanded="false"
              aria-controls="searchBar"
              className="fs-5"
            >
              <BsSearch />
            </button>

            <button type="button">
              <NavLink to="/wishlist">
                <FaRegHeart className="fs-5" />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger font-xs">
                  {wishlistCount}
                  <span className="visually-hidden">unread messages</span>
                </span>
              </NavLink>
            </button>

            <button type="button">
              <NavLink to="/cart">
                <MdOutlineShoppingCart className="fs-5" />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger font-xs">
                  {cartCount}
                  <span className="visually-hidden">unread messages</span>
                </span>
              </NavLink>
            </button>

            <div className="dropdown">
              <button
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                data-bs-display="static"
              >
                <FaRegUser className="fs-5" />
              </button>

              <ul
                className="dropdown-menu"
                style={{ fontSize: "12px", left: "auto", right: "16px" }}
              >
                <li>
                  <Link
                    className="dropdown-item d-flex gap-2 align-items-center"
                    to="/account"
                  >
                    <MdAccountCircle style={{ fontSize: "16px" }} />
                    Manage My Account
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item d-flex gap-2 align-items-center"
                    to="/account/orders"
                  >
                    <HiShoppingBag style={{ fontSize: "16px" }} />
                    My Orders
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      {/* Search Section */}
      <div
        className="container flex justify-content-center position-relative collapse"
        id="searchBar"
      >
        {/* Search Bar */}
        <div className="input-group">
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            className="form-control"
            value={searchQuery}
            placeholder="What are you looking for?"
            name="search"
          />

          <span onClick={searchBtnHandler} className="input-group-text">
            <BsSearch />
          </span>
          <span
            onClick={handleCloseSearch}
            data-bs-toggle="collapse"
            data-bs-target="#searchBar"
            className="input-group-text"
          >
            <BsXLg />
          </span>
        </div>

        {showResult && searchResult.length !== 0 && (
          <ul className="searchBarList list-group container">
            {searchResult.length !== 0 &&
              searchResult.map((product) => (
                <li
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSearchClick(product._id)}
                  className="list-group-item d-flex gap-4"
                >
                  <img
                    style={{
                      width: "3rem",
                      height: "3rem",
                      objectFit: "contain",
                      marginRight: "0.3rem",
                    }}
                    src={product.image}
                    alt=""
                  />
                  <p style={{ fontSize: "small" }}>{product.name}</p>
                </li>
              ))}
          </ul>
        )}

        {!showResult && error && (
          <ul className="searchBarList list-group container">
            <li className="list-group-item">{error}</li>
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
