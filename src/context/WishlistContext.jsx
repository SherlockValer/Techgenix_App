import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const WishlistContext = createContext();
export const useWishlistContext = () => useContext(WishlistContext);

export function WishlistContextProvider({ children }) {
  const API_URL = import.meta.env.VITE_API_URL;

  const [wishlistError, setWishlistError] = useState(null);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    setWishlistLoading(true);

    fetch(`${API_URL}/user/67dce53d2b5635c333cd19df/wishlist/populate`, {
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        setWishlist(data);
        setWishlistCount(data.length);
      })
      .catch((error) => setWishlistError(error.error))
      .finally(() => {
        setWishlistLoading(false);
      });
  }, [refetch]);

  function addToWishList(productid) {
    fetch(`${API_URL}/user/67dce53d2b5635c333cd19df/wishlist`, {
      mode: "cors",
      method: "POST",
      body: JSON.stringify({ id: productid }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(data.message);
        setRefetch((toggle) => !toggle);
      })
      .catch((error) => toast.error(error));
  }

  function removeFromWishList(productid) {
    fetch(`${API_URL}/user/67dce53d2b5635c333cd19df/wishlist/del`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ id: productid }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(data.message);
        setRefetch((toggle) => !toggle);
      })
      .catch((error) => toast.error(error));
  }

  const handleWishlist = (productId) => {
    const inWishlist = wishlist.find((product) => product._id === productId);

    if (inWishlist !== undefined) {
      removeFromWishList(productId);
    } else {
      addToWishList(productId);
    }
  };

  const values = {
    refetch,
    wishlist,
    wishlistCount,
    wishlistLoading,
    wishlistError,
    setWishlist,
    setWishlistCount,
    setWishlistLoading,
    setWishlistError,
    setRefetch,
    handleWishlist,
  };

  return (
    <WishlistContext.Provider value={values}>
      {children}
    </WishlistContext.Provider>
  );
}
