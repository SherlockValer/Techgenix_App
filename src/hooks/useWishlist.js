import { useState, useEffect } from "react";
import useGlobalContext from "../context/globalContext";
import { toast } from "react-toastify";

export const useWishlist = () => {
  const [refetch, setRefetch] = useState(false);
  const { setWishlistCount, wishlist, setWishlist, API_URL } = useGlobalContext();
  const [wishlistError, setWishlistError] = useState(null);
  const [wishlistLoading, setWishlistLoading] = useState(false)

  useEffect(() => {
    setWishlistLoading(true)

    fetch(`${API_URL}/user/67dce53d2b5635c333cd19df/wishlist/populate`, {
        mode: 'cors'
    })
      .then((res) => res.json())
      .then((data) => {
        setWishlist(data);
        setWishlistCount(data.length);
      })
      .catch((error) => setWishlistError(error.error))
      .finally(() => {
        setRefetch(false)
        setWishlistLoading(false)
      });
  }, [refetch]);

  function addToWishList(productid) {
    fetch(`${API_URL}/user/67dce53d2b5635c333cd19df/wishlist`, {
        mode: 'cors',
      method: "POST",
      body: JSON.stringify({ id: productid }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => toast.success(data.message))
      .catch((error) => toast.error(error));
  }

  function removeFromWishList(productid) {
    fetch(`${API_URL}/user/67dce53d2b5635c333cd19df/wishlist/del`, {
      method: "POST",
      mode: 'cors',
      body: JSON.stringify({ id: productid }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => toast.success(data.message))
      .catch((error) => toast.error(error));
  }

  const handleWishlist = (productId) => {
    const inWishlist = wishlist.find((product) => product._id === productId);

    if (inWishlist !== undefined) {
      removeFromWishList(productId);
    } else {
      addToWishList(productId);
    }

    setRefetch(true);
  };

  return { handleWishlist, wishlistLoading, wishlistError };
};
