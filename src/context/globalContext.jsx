import { createContext, useContext, useEffect, useState } from "react";
import { useWishlist } from "../services/useWishlist";
import { useCart } from "../services/useCart";

const GlobalContext = createContext()

const useGlobalContext = () => useContext(GlobalContext)
export default useGlobalContext


export const GlobalContextProvider = ({children}) => {
    const [user, setUser] = useState({}) 
    const [wishlistCount, setWishlistCount] = useState(null)
    const [cartCount, setCartCount] = useState(null)

    const API_URL = import.meta.env.VITE_API_URL

    // Fetch wishlist data
    const {data: wishlistData, error:wishlistError} = useWishlist(`${API_URL}/user/${user._id}/wishlist`)

    // Set Wishlist Data
    useEffect(() => {
        setWishlistCount(wishlistData.length)
    }, [wishlistData])

    // Fetch Cart Data
    const {cart, cartError} = useCart(`${API_URL}/user/${user._id}/cart`)

    useEffect(() => {
        if(cart.items) {
            let total = 0
            for(let i=0; i<cart.items.length; i++) {
                total += cart.items[i].quantity
            }
            setCartCount(total)
        }
    }, [cart])

    // Fetch user data
    useEffect(() => {
        fetch(`${API_URL}/login/67dce53d2b5635c333cd19df`)
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(error => console.log(error))
    }, [])
    

    return (
        <GlobalContext.Provider value={{wishlistCount, setWishlistCount, cartCount, setCartCount,user, setUser, API_URL}}>
            {children}
        </GlobalContext.Provider>
    )
}