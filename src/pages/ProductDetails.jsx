
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { starRatingsGenerator } from "../utils/starRatingsGenerator";
import { discountPercentage } from "../utils/discountPercentageCalc";

import useGlobalContext from "../context/globalContext";

//* Images
import { IoShieldCheckmarkOutline, IoSync } from "react-icons/io5";


//* Buttons
import AddToCart from "../components/common/AddToCart";
import WishlistButton from "../components/common/WishlistButton";
import BuyNow from "../components/common/BuyNow";
import { BsCashStack, BsTruck } from "react-icons/bs";

const ProductDetails = () => {
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);
  const productIdObj = useParams();

  const [quantity, setQuantity] = useState(1);

  const { API_URL } = useGlobalContext();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `${API_URL}/products/${productIdObj.productId}`
        );

        const json = await response.json();
        setDetails(json);
      } catch (error) {
        setError(error);
      }
    };

    fetchProductDetails();
  }, []);

  const decrementHandler = () => {
    setQuantity((quantity) => quantity - 1);
  };

  const incrementHandler = () => {
    setQuantity((quantity) => quantity + 1);
  };

  return (
    <>
      <main className="container py-5">
        {details && (
          <div className="row d-flex justify-content-between">
            <div className="col-md-3 d-flex flex-column mb-3">
              {/* Wishlist Button */}
              <WishlistButton product={details} />

              {/* Product Image */}
              <img
                style={{ height: "280px", objectFit: "contain" }}
                className="img-fluid mb-4"
                src={details.image}
                alt=""
              />

              {/* Buttons */}
              <BuyNow product={details} quantity={quantity} />
              <AddToCart product={details} quantity={quantity} />
            </div>

            <div className="col-md-8">
              {/* Product Name */}

              <h5>{details.name}</h5>

              {/* Product Rating */}

              <p className="my-3">
                {details.ratings}{" "}
                <span className="starRating">
                  {starRatingsGenerator(details.ratings)} ({details.noOfRatings}
                  )
                </span>{" "}
              </p>

              {/* Price  */}

              <h5 className="mb-3">
                ₹
                {details.discountPrice
                  ? parseInt(details.discountPrice).toLocaleString()
                  : parseInt(details.actualPrice).toLocaleString()}
                <span className="MRP ms-1">
                  ₹
                  {details.actualPrice
                    ? parseInt(details.actualPrice).toLocaleString()
                    : "Product Unavailable"}
                </span>
              </h5>

              {/* Discount */}

              <p className="mb-3">
                <span className="text-success fw-medium fs-6">
                  {details.discountPrice
                    ? discountPercentage(
                        details.actualPrice,
                        details.discountPrice
                      )
                    : null}
                  % off
                </span>
              </p>

              {/* Quantity */}

              <p className="mb-3">
                <span className="quantity-btn-span">
                  <button
                    onClick={decrementHandler}
                    disabled={quantity > 1 ? false : true}
                    className="btn btn-sm btn-danger"
                  >
                    -
                  </button>
                  <input type="number" min={1} max={100} value={quantity} />
                  <button
                    onClick={incrementHandler}
                    className="btn btn-sm btn-danger"
                  >
                    +
                  </button>
                </span>
              </p>
              <hr />

              {/* Trust Section */}

              <div className="row d-flex gap-2  text-muted pt-3">
                <div className="col-md-2 d-flex flex-column gap-2 mb-0">
                  <IoSync className="fs-5" />
                  <p>7 days Replacement</p>
                </div>
                <div className="col-md-2 d-flex flex-column gap-2 mb-0">
                  <BsTruck className="fs-5" />
                  <p>Free Delivery</p>
                </div>
                <div className="col-md-2 d-flex flex-column gap-2 mb-0">
                  <IoShieldCheckmarkOutline className="fs-5" />
                  <p>1 Year Warranty</p>
                </div>
                <div className="col-md-2 d-flex flex-column gap-2 mb-0">
                  <BsCashStack className="fs-5" />
                  <p>Cash/Pay on Delivery</p>
                </div>
              </div>
              <hr />

              <div className="text-muted ">
                <p>Description:</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Accusamus quam totam voluptatem ipsum. Asperiores
                  reprehenderit dignissimos alias eligendi ex autem, ratione
                  fugit ut vel nisi!
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                  repellat ad provident laudantium rem! Ipsam, earum maxime.
                  Suscipit tempora sed voluptatum nobis veritatis molestiae
                  voluptatibus.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam
                  odit ea laudantium expedita fugit non, quod assumenda sit
                  veniam fugiat illum atque eos aliquid tempore.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default ProductDetails;
