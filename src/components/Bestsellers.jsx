import WishlistButton from "./common/WishlistButton";
import { starRatingsGenerator } from "../utils/starRatingsGenerator";
import { discountPercentage } from "../utils/discountPercentageCalc";
import { Link } from "react-router-dom";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AddToCart from "./common/AddToCart";

const bestSellers = [
  {
    _id: "67dce44aed20605cd78f1ea5",
    name: "Redmi 9 (Sporty Orange, 4GB RAM, 64GB Storage) | 2.3GHz Mediatek Helio G35 Octa core Processor",
    mainCategory: "Smartphones",
    subCategory: "Redmi",
    image: "https://m.media-amazon.com/images/I/71A9Vo1BatL._AC_UL800_.jpg",
    ratings: "4.1",
    noOfRatings: "319396",
    discountPrice: "9990",
    actualPrice: "10999",
  },
  {
    _id: "67dce44aed20605cd78f1eb8",
    name: "Apple 2020 MacBook Air Laptop M1 chip, 13.3-inch/33.74 cm Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, Fa...",
    mainCategory: "Laptops",
    subCategory: "Business",
    image: "https://m.media-amazon.com/images/I/71jG+e7roXL._AC_UL800_.jpg",
    ratings: "4.7",
    noOfRatings: "4299",
    discountPrice: "85990",
    actualPrice: "99900",
  },
  {
    _id: "67dce44aed20605cd78f1f10",
    name: "boAt BassHeads 100 in-Ear Wired Headphones with Mic (Black)",
    mainCategory: "Headphones",
    subCategory: "Wired Earphones",
    image: "https://m.media-amazon.com/images/I/719elVA3FvL._AC_UL800_.jpg",
    ratings: "4.1",
    noOfRatings: "375110",
    discountPrice: "399",
    actualPrice: "999",
  },
  {
    _id: "67dce44aed20605cd78f1faf",
    name: "Fitbit FB507BKBK Versa 2 Health & Fitness Smartwatch with Heart Rate, Music, Alexa Built-in, Sleep & Swim Tracking, Black/...",
    mainCategory: "Smart Watches",
    subCategory: "Premium",
    image: "https://m.media-amazon.com/images/I/5194ncpe5IL._AC_UL800_.jpg",
    ratings: "4.1",
    noOfRatings: "143611",
    discountPrice: "11010",
    actualPrice: "14999",
  },
];

const BestSellers = () => {

  return (
    <section className="best-sellers py-5">
      <div>
        <h2 className="mb-3 fw-bold fs-5 text-danger">Best Sellers</h2>
        <div
          style={{ width: "9rem", height: "2px", backgroundColor: "#dc3545" }}
        ></div>

        <div className="bestsellerList my-5">
          {bestSellers.map((product) => (
            <div key={product._id} className="bestseller-card">
              {/* Wishlist button */}

              <WishlistButton product={product} />

              {/* Image */}

              <div className="d-flex justify-content-center py-3">
                <img
                  loading="lazy"
                  src={product.image}
                  className="bestseller-img"
                  alt=""
                />
              </div>

              {/* Title */}

              <p className="bestseller-title py-2">
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

              <AddToCart
                product={product}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
