import { useState } from "react";
import favoriteIcon from "../../assets/favorite.svg";
import favoriteFilledIcon from "../../assets/favorite_filled.svg";
import { useWishlistContext } from "../../context/WishlistContext.jsx";

const WishlistButton = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const { wishlist, wishlistLoading, handleWishlist } = useWishlistContext();

  function handleHeart() {
    const inWishlist = wishlist.find((item) => item._id === product._id);
    return inWishlist !== undefined ? favoriteFilledIcon : favoriteIcon;
  }

  return (
    <>
      {!loading && (
        <button
          onClick={() => {
            setLoading(true)
            handleWishlist(product._id)
            const timer = setInterval(() => {
              if(!wishlistLoading) {
                setLoading(false)
                clearInterval(timer)
              }              
            }, 2000)
          }}
          type="button"
          className="wishlistBtn"
        >
          <img src={handleHeart()} alt="" />
        </button>
      )}

      {loading && <div className="loader1 wishlistBtn"></div>}
    </>
  );
};

export default WishlistButton;
