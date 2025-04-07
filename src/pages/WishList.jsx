import { useState, useEffect } from "react"
import useGlobalContext from "../context/globalContext"
import Header from "../components/Header"
import Footer from "../components/Footer"
import favoriteFilledIcon from "../assets/favorite_filled.svg"
import { starRatingsGenerator } from "../utils/starRatingsGenerator"
import { discountPercentage } from "../utils/discountPercentageCalc"
import { useWishlist } from "../services/useWishlist"
import { removeFromWishList } from "../utils/removeFromWishList"
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


import AddToCart from "../components/AddToCart"

const WishList = () => {
    const {wishlistCount, setWishlistCount, API_URL} = useGlobalContext()

    const {data: wishlistData, error:wishlistError} = useWishlist(`${API_URL}/user/67dce53d2b5635c333cd19df/wishlist/populate`)

    const [wishlistArray, setWishlistArray] = useState([])


    // Set Wishlist Data
    useEffect(() => {
        setWishlistArray(wishlistData)
    }, [wishlistData])

    const handleWishlist = (productId) => {
        setWishlistArray(prevData => prevData.filter(product => product._id !== productId ))
        removeFromWishList(productId)
        setWishlistCount(count => count -1)
    }

    
    return (
        <>
            <Header />
            <main className="container">
                <h2 className="fs-medium py-3">Wishlist</h2>
                <div id="wishlistGrid">
                    {wishlistArray &&
                        wishlistArray.map(product => (
                            <div key={product._id} className="productCard">
                                {/* Wishlist button */}
                                <button onClick={() => handleWishlist(product._id)} type="button" className="wishlistBtn" >
                                    <img src={favoriteFilledIcon} alt="" />
                                </button>
                                {/* Image */}
                                <img loading="lazy"  src={product.image} alt="" />
                                {/* Title */}
                                <p className="productTitle pt-2">{product.name}</p>
                                {/* Ratings */}
                                <p className="mb-0">
                                    <span className="starRating pb-0 me-2">
                                        {starRatingsGenerator(product.ratings)}
                                    </span> 
                                    {parseInt(product.noOfRatings).toLocaleString()}
                                </p>
                                {/* Price */}
                                <h5 className="mb-0">
                                    <sup className="superScript">₹</sup>
                                    {product.discountPrice ? parseInt(product.discountPrice).toLocaleString() : parseInt(product.actualPrice).toLocaleString()}
                                </h5>
                                <p >
                                    <span className="text-success fw-medium fs-6"><ArrowDownwardIcon sx={{ fontSize: '1.2em' }} />{product.discountPrice ? discountPercentage(product.actualPrice, product.discountPrice) : null }%</span>
                                    <sub className="subScript ms-1">
                                        M.R.P: {product.actualPrice ? parseInt(product.actualPrice).toLocaleString(): "Product Unavailable"}
                                    </sub>
                                </p>
                                {/* Add to Cart Button */}
                                <AddToCart product={product} />
                            </div>
                        ))}
                </div>   
            </main>
            <Footer />

        </>
    )
}

export default WishList