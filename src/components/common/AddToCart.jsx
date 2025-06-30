import { useCartContext } from "../../context/CartContext.jsx";

const AddToCart = ({ product, quantity }) => {
  const { handleCartButton } = useCartContext();

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
