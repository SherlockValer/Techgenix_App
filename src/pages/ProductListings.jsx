// React library
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// Assets
import favoriteIcon from "../assets/favorite.svg";
import favoriteFilledIcon from "../assets/favorite_filled.svg";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { FaChevronCircleDown } from "react-icons/fa";

// Hooks
import { categories, subCategoriesGenerator } from "../hooks/useCategories";

// Contexts
import useProductDataContext from "../context/productDataContext";

// Utilities
import { starRatingsGenerator } from "../utils/starRatingsGenerator";
import { discountPercentage } from "../utils/discountPercentageCalc";

// Services
import { useCartContext } from "../context/CartContext.jsx";
import { useWishlistContext } from "../context/WishlistContext.jsx";
import WishlistButton from "../components/common/WishlistButton.jsx";
import AddToCart from "../components/common/AddToCart.jsx";

const ProductListings = () => {
  // Fetch all data
  const { allProducts, productsLoading, productsError } =
    useProductDataContext();
  const { cartCount, handleCartButton } = useCartContext();
  const { wishlist, wishlistCount } = useWishlistContext();

  //* State Management

  const [filteredData, setFilteredData] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(useParams().category);
  const [currentSubCategories, setSubCategories] = useState(() => {
    return subCategoriesGenerator(currentCategory);
  });
  const [currentRating, setRating] = useState(4);
  const [currentSortBy, setSortBy] = useState("HTL");

  //* -------------------- Filters -----------------------------

  // To map subcategories on DOM
  const subCategories = subCategoriesGenerator(currentCategory);

  // On initial load
  useEffect(() => {
    const filtered = allProducts.filter(
      (product) => product.mainCategory === currentCategory
    );
    setFilteredData(filtered);
  }, [allProducts]);

  // Set Current Main Category on selecting main category
  const filterHandler = (category) => {
    setCurrentCategory(category);
    setSubCategories(subCategoriesGenerator(category));
  };

  // Adds/Removes Sub categories on checkbox click
  const handleSubCategories = (e) => {
    const { checked, value } = e.target;
    if (value !== "All") {
      if (checked) {
        setSubCategories((prev) => [...prev, value]);
      } else {
        setSubCategories((prev) => prev.filter((cat) => cat !== value));
      }
    } else {
      if (checked) {
        setSubCategories([...subCategories]);
      } else {
        setSubCategories([]);
      }
    }
  };

  // After every change in below filters (One thing to rule them all!)
  useEffect(() => {
    const filteredByRating = allProducts.filter(
      (product) =>
        product.mainCategory === currentCategory &&
        product.ratings >= currentRating &&
        product.ratings < currentRating + 1
    );

    const filterBySubCategories = () => {
      const array = [];
      for (let i = 0; i < currentSubCategories.length; i++) {
        for (let j = 0; j < filteredByRating.length; j++) {
          if (filteredByRating[j].subCategory === currentSubCategories[i]) {
            array.push(filteredByRating[j]);
          }
        }
      }
      return array;
    };

    const filtered = filterBySubCategories();

    // Sorting According to price
    const sorted =
      currentSortBy === "LTH"
        ? filtered.sort(
            (a, b) => parseInt(a.discountPrice) - parseInt(b.discountPrice)
          )
        : filtered.sort(
            (a, b) => parseInt(b.discountPrice) - parseInt(a.discountPrice)
          );
    setFilteredData(sorted);
  }, [currentCategory, currentSubCategories, currentRating, currentSortBy]);

  return (
    <>
      {productsLoading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <div className="loader"></div>
        </div>
      )}
      {Array.isArray(allProducts) &&
        typeof cartCount === "number" &&
        typeof wishlistCount === "number" &&
        !productsLoading && (
          <>
            <main className="container my-3">
              <h4 className="mb-3 fw-bold fs-5 text-danger mb-3">
                All Products ({filteredData.length})
              </h4>
              <div
                style={{
                  width: "12rem",
                  height: "2px",
                  backgroundColor: "#dc3545",
                }}
                className="mb-4"
              ></div>
              <div className="row mb-3">
                {/* Filters */}

                <div className="col-12 col-lg-3 mb-4">
                  <div className="p-3 border border-secondary">
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="fw-bold text-danger mb-0">Filters</p>
                      <FaChevronCircleDown
                        style={{ cursor: "pointer" }}
                        data-bs-toggle="collapse"
                        data-bs-target="#filters"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                      />
                    </div>
                    <div className="collapse my-4" id="filters">
                      {/* Category Filter */}

                      <div className="categoryDiv mb-3">
                        {categories.map((category) => (
                          <span
                            key={category.category}
                            className="d-inline-block me-2 mb-2"
                          >
                            <button
                              className={`btn btn-sm ${
                                currentCategory === category.category
                                  ? "btn-danger"
                                  : ""
                              }`}
                              onClick={() => filterHandler(category.category)}
                            >
                              {category.category}
                            </button>
                          </span>
                        ))}
                      </div>

                      {/* Sub-Categories */}

                      <div className="categoryDiv mb-3">
                        <p className="mb-3 fw-semibold text-danger">
                          Sub-Categories
                        </p>
                        <div className="subcategories-scroll">
                          <div>
                            <label>
                              <input
                                onChange={handleSubCategories}
                                type="checkbox"
                                value="All"
                                checked={
                                  currentSubCategories.length ===
                                  subCategories.length
                                }
                              />{" "}
                              All
                            </label>
                          </div>
                          {subCategories.map((sub, index) => (
                            <div key={index}>
                              <label>
                                <input
                                  onChange={handleSubCategories}
                                  type="checkbox"
                                  value={sub}
                                  checked={currentSubCategories.includes(sub)}
                                />{" "}
                                {sub}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Rating */}

                      <div className="categoryDiv mb-3">
                        <p className="mb-3 fw-semibold text-danger">Rating</p>
                        {[4, 3, 2, 1].map((num) => (
                          <p className="mb-0" key={num}>
                            <input
                              onChange={(e) => setRating(e.target.value)}
                              type="radio"
                              name="rating"
                              value={num}
                              defaultChecked={num === 4 ? true : false}
                            />{" "}
                            {num} Stars and Above
                          </p>
                        ))}
                      </div>

                      {/* Sort By */}

                      <div className="categoryDiv">
                        <p className="mb-3 fw-semibold text-danger">Sort By</p>
                        <p className="mb-0">
                          <input
                            onChange={(e) => setSortBy(e.target.value)}
                            type="radio"
                            name="sortBy"
                            value={"LTH"}
                          />{" "}
                          Price - Low to High
                        </p>
                        <p className="mb-0">
                          <input
                            onChange={(e) => setSortBy(e.target.value)}
                            type="radio"
                            name="sortBy"
                            value={"HTL"}
                            defaultChecked={true}
                          />{" "}
                          Price - High to Low
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Gallery */}

                <div className="col-lg-9 productGallery mb-4">
                  {filteredData && (
                    <div id="productGrid">
                      {filteredData.map((product) => {
                        const inWishlist = wishlist?.find(
                          (item) => item._id === product._id
                        );
                        const heart =
                          inWishlist !== undefined
                            ? favoriteFilledIcon
                            : favoriteIcon;

                        return (
                          <div key={product._id} className="productCard">
                            {/* Wishlist button */}
                            <WishlistButton product={product} />


                            {/* Image */}

                            <img
                              loading="lazy"
                              className="product-img my-3"
                              src={product.image}
                              alt=""
                            />

                            {/* Title */}

                            <p className="productTitle pt-2">
                              <Link to={`/productDetails/${product._id}`}>
                                {product.name}
                              </Link>
                            </p>

                            {/* Ratings */}

                            <p className="mb-0">
                              <span className="starRating pb-0 me-2">
                                {starRatingsGenerator(product.ratings)}
                              </span>
                              {parseInt(product.noOfRatings).toLocaleString()}
                            </p>

                            {/* Price */}

                            <h5 className="mb-0">
                              <sup className="superScript">₹</sup>
                              {product.discountPrice
                                ? parseInt(
                                    product.discountPrice
                                  ).toLocaleString()
                                : parseInt(
                                    product.actualPrice
                                  ).toLocaleString()}
                            </h5>
                            <p>
                              <span className="text-success fw-medium fs-6">
                                <ArrowDownwardIcon sx={{ fontSize: "1.2em" }} />
                                {product.discountPrice
                                  ? discountPercentage(
                                      product.actualPrice,
                                      product.discountPrice
                                    )
                                  : null}
                                %
                              </span>
                              <sub className="subScript ms-1">
                                M.R.P:{" "}
                                {product.actualPrice
                                  ? parseInt(
                                      product.actualPrice
                                    ).toLocaleString()
                                  : "Product Unavailable"}
                              </sub>
                            </p>

                            {/* Add to Cart Button */}
                            <AddToCart product={product} />
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {filteredData.length === 0 && <p>{productsError}</p>}
                </div>
              </div>
            </main>
          </>
        )}
    </>
  );
};

export default ProductListings;
