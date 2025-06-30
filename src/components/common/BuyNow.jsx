import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../context/CartContext.jsx";

const BuyNow = ({ product, quantity }) => {
  const navigate = useNavigate();
  const { handleCartButton } = useCartContext();

  const handleBuyNow = (productId, price, quantity) => {
    handleCartButton(productId, price, quantity);
  };

  return (
    <>
      <button
        onClick={() => {
          handleBuyNow(
            product._id,
            product.discountPrice ? product.discountPrice : product.actualPrice,
            quantity
          );
          navigate("/cart");
          window.location.reload()
        }}
        className="my-2 btn btn-outline-dark"
      >
        Buy Now
      </button>
    </>
  );
};

export default BuyNow;
