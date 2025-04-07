import { useState, useEffect } from "react"
import useGlobalContext from "../context/globalContext"
import { useWishlist } from "../services/useWishlist"


import favoriteIcon from "../assets/favorite.svg"
import favoriteFilledIcon from "../assets/favorite_filled.svg"
import { addToWishList } from "../utils/addToWishList"
import { removeFromWishList } from "../utils/removeFromWishList"


const WishlistButton = ({product}) => {
    const [wishlistArray, setWishlistArray] = useState([])
    const {wishlistCount, setWishlistCount, API_URL} = useGlobalContext()
     

    //* ------------------- Wishlist --------------------------------
    // Fetch wishlist data
    const {data: wishlistData, error:wishlistError} = useWishlist(`${API_URL}/user/67dce53d2b5635c333cd19df/wishlist`)

    // Set Wishlist Data
    useEffect(() => {
        setWishlistArray(wishlistData)
    }, [wishlistData])

    const handleWishlist = (productId) => {
        if(wishlistArray.includes(productId)) {
            setWishlistArray(prevData => prevData.filter(id => id !== productId ))
            removeFromWishList(productId)
            setWishlistCount(count => count -1)
        } else {
            setWishlistArray(prevData => [...prevData, productId])
            addToWishList(productId)
            setWishlistCount(count => count + 1)
        }
    }


    return (
        <>
            <button onClick={() => handleWishlist(product._id)} type="button" className="wishlistBtn" >
                <img src={wishlistArray.includes(product._id)? favoriteFilledIcon : favoriteIcon} alt="" />
            </button>
        </>
    )
}

export default WishlistButton