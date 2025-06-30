import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export function CartContextProvider({ children }) {
  const API_URL = import.meta.env.VITE_API_URL;

  const [cart, setCart] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);
  const [cartError, setError] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  // fetch cart data
  useEffect(() => {
    setCartLoading(true);

    fetch(`${API_URL}/user/67dce53d2b5635c333cd19df/cart/populate`, {
      mode: "cors",
    })
      .then((res) => res.json())
      .then((cartData) => {
        setCart(cartData);
        cartCounter(cartData.items);
      })
      .catch((error) => setError(error.error))
      .finally(() => {
        setCartLoading(false);
      });
  }, []);

  function cartCounter(items) {
    let total;
    if (items) {
      total = items.reduce((acc, curr) => acc + curr.quantity, 0);
    }
    setCartCount(total);
  }

  function totalPriceCounter(items) {
    let total;
    total = items.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
    return total;
  }

  function updateCart(items, totalPrice) {
    fetch(`${API_URL}/user/67dce53d2b5635c333cd19df/cart`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        items,
        totalPrice,
      }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((msg) => {
        // setRefetch(toggle => !toggle)
        toast.success(msg.message);
      })
      .catch((error) => console.log(error));
  }

  // Add to Cart

  function handleCartButton(productId, price, quantity) {
    const ifItemInCart = cart?.items?.find(
      (product) => product.productId._id === productId
    );

    let itemQuantity = 0;
    if (ifItemInCart !== undefined) {
      if (quantity) {
        itemQuantity = ifItemInCart.quantity + quantity;
      } else {
        itemQuantity = ifItemInCart.quantity + 1;
      }
    } else {
      if (quantity) {
        itemQuantity = quantity;
      } else {
        itemQuantity = 1;
      }
    }

    const newItem = {
      productId: productId,
      quantity: itemQuantity,
      price: parseInt(price),
    };
    const newItems = [
      ...cart.items.filter((item) => item.productId._id !== productId),
      newItem,
    ];

    let newTotalPrice = totalPriceCounter(newItems);
    setCart((prevData) => ({
      ...prevData,
      items: newItems,
      totalPrice: newTotalPrice,
    }));

    cartCounter(newItems);
    updateCart(newItems, newTotalPrice);
  }

  // Change quantity

  function quantityChangeHandler(productId, change) {
    const selectedProduct = cart.items.find(
      (item) => item.productId._id === productId
    );

    const index = cart.items.indexOf(selectedProduct);

    if (change === "increment") {
      selectedProduct.quantity = selectedProduct.quantity + 1;
    } else if (change === "decrement") {
      selectedProduct.quantity = selectedProduct.quantity - 1;
    }

    const updatedCartItems = [...cart.items];
    updatedCartItems.splice(index, 1, selectedProduct);

    let newTotalPrice = totalPriceCounter(updatedCartItems);

    setCart((prevData) => ({
      ...prevData,
      items: updatedCartItems,
      totalPrice: newTotalPrice,
    }));

    cartCounter(updatedCartItems);
    updateCart(updatedCartItems, newTotalPrice);
  }

  // Delete Items from Cart

  function deleteItemHandler(productId, price, quantity) {
    const filteredItems = cart.items.filter(
      (item) => item.productId._id !== productId
    );
    const newTotal = cart.totalPrice - price * quantity;

    setCart((prevData) => ({
      ...prevData,
      items: filteredItems,
      totalPrice: newTotal,
    }));

    cartCounter(filteredItems);
    updateCart(filteredItems, newTotal);
  }

  const value = {
    cart,
    cartLoading,
    cartError,
    cartCount,
    setCartLoading,
    setCartCount,
    setCart,
    setError,
    cartCounter,
    handleCartButton,
    quantityChangeHandler,
    deleteItemHandler,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
