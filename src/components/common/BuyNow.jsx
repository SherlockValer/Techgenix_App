import { useCart } from "../../hooks/useCart.js";
import { useNavigate } from "react-router-dom";

const BuyNow = ({ product, quantity }) => {
  const navigate = useNavigate();

  // Fetch Cart details
  const { handleCartButton } = useCart();

  const handleBuyNow = (productId, price, quantity) => {
    handleCartButton(productId, price, quantity);
    navigate("/cart");
  };

  return (
    <>
      <button
        onClick={() =>
          handleBuyNow(
            product._id,
            product.discountPrice ? product.discountPrice : product.actualPrice,
            quantity
          )
        }
        className="my-2 btn btn-outline-dark"
      >
        Buy Now
      </button>
    </>
  );
};

export default BuyNow;
