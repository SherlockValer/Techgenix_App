import { useWishlist } from "../../hooks/useWishlist.js";

import favoriteIcon from "../../assets/favorite.svg";
import favoriteFilledIcon from "../../assets/favorite_filled.svg";
import useGlobalContext from "../../context/globalContext";

const WishlistButton = ({ product }) => {
  const { wishlist } = useGlobalContext();
  const { handleWishlist } = useWishlist();

  function handleHeart() {
    const inWishlist = wishlist.find((item) => item._id === product._id);
    return inWishlist !== undefined ? favoriteFilledIcon : favoriteIcon;
  }

  return (
    <>
      <button
        onClick={() => handleWishlist(product._id)}
        type="button"
        className="wishlistBtn"
      >
        <img src={handleHeart()} alt="" />
      </button>
    </>
  );
};

export default WishlistButton;
