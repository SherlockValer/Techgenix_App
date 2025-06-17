import { useCart } from "../../hooks/useCart.js";

const AddToCart = ({ product, quantity }) => {
  const { handleCartButton } = useCart();

  return (
    <>
      <button
        onClick={() =>
          handleCartButton(
            product._id,
            product.discountPrice ? product.discountPrice : product.actualPrice,
            quantity
          )
        }
        className="btn btn-danger cartBtn"
      >
        Add to Cart
      </button>
    </>
  );
};

export default AddToCart;
