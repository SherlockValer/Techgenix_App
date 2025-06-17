import useGlobalContext from "../context/globalContext";
import favoriteFilledIcon from "../assets/favorite_filled.svg";
import { starRatingsGenerator } from "../utils/starRatingsGenerator";
import { discountPercentage } from "../utils/discountPercentageCalc";
import { useWishlist } from "../hooks/useWishlist.js";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import AddToCart from "../components/common/AddToCart";

const WishList = () => {
  const { wishlistCount, wishlist } = useGlobalContext();

  const { wishlistError, wishlistLoading, handleWishlist } = useWishlist();

  return (
    <>
      {wishlistLoading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="loader"></div>
        </div>
      )}
      {!wishlistLoading && wishlist && (
        <>
          <main className="container my-3">
            {/* Heading */}
            <h4 className="mb-3 fw-bold fs-5 text-danger mb-3">
              Wishlist ({wishlistCount})
            </h4>
            <div
              style={{
                width: "10rem",
                height: "2px",
                backgroundColor: "#dc3545",
              }}
              className="mb-4"
            ></div>

            <div className="my-5" id="wishlistGrid">
              {wishlist &&
                wishlist.map((product) => (
                  <div key={product._id} className="wishlist-card">

                    {/* Wishlist button */}
                    
                    <button
                      onClick={() => handleWishlist(product._id)}
                      type="button"
                      className="wishlistBtn"
                    >
                      <img src={favoriteFilledIcon} alt="" />
                    </button>

                    {/* Image */}

                    <img
                      loading="lazy"
                      className="product-img"
                      src={product.image}
                      alt=""
                    />

                    {/* Title */}

                    <p className="productTitle pt-2">{product.name}</p>

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
                        ? parseInt(product.discountPrice).toLocaleString()
                        : parseInt(product.actualPrice).toLocaleString()}
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
                          ? parseInt(product.actualPrice).toLocaleString()
                          : "Product Unavailable"}
                      </sub>
                    </p>
                    {/* Add to Cart Button */}
                    <AddToCart product={product} />
                  </div>
                ))}
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default WishList;
