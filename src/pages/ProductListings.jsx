// React library
import { use, useEffect, useRef, useState } from "react"
import { useParams, Link } from "react-router-dom"

// Assets
import favoriteIcon from "../assets/favorite.svg"
import favoriteFilledIcon from "../assets/favorite_filled.svg"

// Hooks
import { categories, subCategoriesGenerator } from "../hooks/useCategories"

// Components
import Header from "../components/Header"
import Footer from "../components/Footer"

// Contexts
import useProductDataContext from "../context/productDataContext"
import useGlobalContext from "../context/globalContext"

// Utilities
import { starRatingsGenerator } from "../utils/starRatingsGenerator"
import { discountPercentage } from "../utils/discountPercentageCalc"
import { removeFromWishList } from "../utils/removeFromWishList"
import { addToWishList } from "../utils/addToWishList"

// Services
import { useCart } from "../services/useCart"
import { useWishlist } from "../services/useWishlist"


const ProductListings = () => {

    // Fetch all data
    const {allProducts, productsLoading, productsError} = useProductDataContext()


    //* State Management

    const [filteredData, setFilteredData] = useState([])
    const [currentCategory, setCurrentCategory] = useState(useParams().category)
    const [currentSubCategories, setSubCategories] = useState(() => {
        return subCategoriesGenerator(currentCategory)
    })
    const [currentRating, setRating] = useState(4)
    const [currentSortBy, setSortBy] = useState("HTL")

    const [cartData, setCartData] = useState({})
    const {cartCount, setCartCount, API_URL} = useGlobalContext()

    const [wishlistArray, setWishlistArray] = useState([])
    const {wishlistCount, setWishlistCount} = useGlobalContext()


    //* -------------------- Filters -----------------------------

    // To map subcategories on DOM
    const subCategories = subCategoriesGenerator(currentCategory)


    // On initial load
    useEffect(() => {
        const filtered = allProducts.filter(product => product.mainCategory === currentCategory)
        setFilteredData(filtered)
    }, [allProducts])


    // Set Current Main Category on selecting main category
    const filterHandler = (category) => {
        setCurrentCategory(category)
        setSubCategories(subCategoriesGenerator(category))
    }   

    // Adds/Removes Sub categories on checkbox click
    const handleSubCategories = (e) => {
        const {checked, value} = e.target
        if(value !== "All") {
            if(checked) {
                setSubCategories(prev => [...prev, value])
            } else {
                setSubCategories(prev => prev.filter(cat => cat !== value))
            }
        } else {
            if(checked) {
                setSubCategories([...subCategories])
            } else {
                setSubCategories([])
            }
        }

    }


    // After every change in below filters (One thing to rule them all!)
    useEffect(() => { 
        const filteredByRating = allProducts.filter(product => (
            product.mainCategory === currentCategory && product.ratings >= currentRating && product.ratings < (currentRating + 1)
        ))


        const filterBySubCategories = () => {
            
            const array  = []
            for(let i =0; i<currentSubCategories.length; i++) {
                for(let j=0; j<filteredByRating.length; j++) {
                    if(filteredByRating[j].subCategory === currentSubCategories[i]) {
                        array.push(filteredByRating[j])
                    }
                }
            }
            return array
        }
        

        const filtered = filterBySubCategories()

        // Sorting According to price
        const sorted = currentSortBy === "LTH" ? filtered.sort((a, b) => parseInt(a.discountPrice) - parseInt(b.discountPrice)) : filtered.sort((a, b) => parseInt(b.discountPrice) - parseInt(a.discountPrice))
        setFilteredData(sorted)

    }, [currentCategory, currentSubCategories, currentRating, currentSortBy])


    //* ---------------------- Cart -------------------------
    // Fetch Cart details
    const {cart, cartError} = useCart(`${API_URL}/user/67dce53d2b5635c333cd19df/cart`)

    useEffect(() => {
        setCartData(cart)
    }, [cart])

    // handle cart button
    const handleCartButton = (productId, price) => {
        const ifItemInCart = cartData.items.find(product => product.productId === productId)
        let itemQuantity = 0
        if(ifItemInCart !== undefined) {
            if(quantity) {
                itemQuantity = ifItemInCart.quantity + quantity
            } else {
                itemQuantity = ifItemInCart.quantity + 1
            }
        } else {
            if(quantity) {
                itemQuantity = quantity
            } else {
                itemQuantity = 1
            }
        }

        const newItem = {productId: productId, quantity: itemQuantity, price: parseInt(price)}
        const newItems = [...cartData.items.filter(item => item.productId !== productId), newItem]

        let newTotalPrice = 0
        for(let i=0; i<newItems.length; i++){
            newTotalPrice += newItems[i].quantity * newItems[i].price
        }

        setCartData(prevData => ({...prevData, items: newItems, totalPrice: newTotalPrice}))

        let total = 0
        for(let i=0; i<newItems.length; i++) {
            total += newItems[i].quantity
        }
        setCartCount(total)

        fetch(`${API_URL}/user/67dce53d2b5635c333cd19df/cart`, {
            method: "POST",
            body: JSON.stringify({
                items: newItems,
                totalPrice: newTotalPrice
            }),
            headers: {
                "content-type": "application/json"
            }
        })
        .then(res => res.json())
        .then(msg => alert(msg.message))
        .catch(error => console.log(error))

    }
    
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
            <Header />
            <main className="container">
                <div className="row">

                    <div className="col-12 col-md-3 mb-4"> 
                    <div className="p-3 border rounded bg-light">

                        <p className="fw-bold">Filters</p>

                        {/* Category Filter */}
                        <div className="categoryDiv mb-3">
                        {categories.map(category => (
                            <span key={category.category} className="d-inline-block me-2 mb-2">
                            <button
                                className="btn btn-sm"
                                style={
                                currentCategory === category.category
                                    ? {
                                        color: "rgb(211, 104, 3)",
                                        border: "0.05rem solid rgb(211, 104, 3)",
                                        borderRadius: "0.3rem",
                                        backgroundColor: "#fff",
                                    }
                                    : {
                                        backgroundColor: "#fff",
                                        border: "none",
                                    }
                                }
                                onClick={() => filterHandler(category.category)}
                            >
                                {category.category}
                            </button>
                            </span>
                        ))}
                        </div>

                        {/* Sub-Categories */}
                        <div className="categoryDiv mb-3">
                        <p className="mb-1 fw-semibold">Sub-Categories</p>
                        <div className="subcategories-scroll">
                            <div>
                                <label>
                                <input
                                    onChange={handleSubCategories}
                                    type="checkbox"
                                    value="All"
                                    checked={currentSubCategories.length === subCategories.length}
                                />{" "}
                                All
                                </label>
                            </div>
                            {subCategories.map((sub, index) => (
                                <div key={index}>
                                <label>
                                    <input
                                    onChange={handleSubCategories}
                                    type="checkbox"
                                    value={sub}
                                    checked={currentSubCategories.includes(sub)}
                                    />{" "}
                                    {sub}
                                </label>
                                </div>
                            ))}
                            </div>
                        </div>


                        {/* Rating */}
                        <div className="categoryDiv mb-3"> 
                            <p className="mb-1 fw-semibold">Rating</p>
                            <p className="mb-0"><input onChange={(e) => setRating(e.target.value)} type="radio" name="rating" value={4} defaultChecked={true} /> 4 Stars and Above</p>
                            <p className="mb-0"><input onChange={(e) => setRating(e.target.value)} type="radio" name="rating" value={3} /> 3 Stars and Above</p>
                            <p className="mb-0"><input onChange={(e) => setRating(e.target.value)} type="radio" name="rating" value={2} /> 2 Stars and Above</p>
                            <p className="mb-0"><input onChange={(e) => setRating(e.target.value)} type="radio" name="rating" value={1} /> 1 Stars and Above</p>
                        </div>

                        {/* Sort By */}
                        <div className="categoryDiv">
                            <p className="mb-1 fw-semibold">Sort By</p>
                            <p className="mb-0"><input onChange={(e) => setSortBy(e.target.value)} type="radio" name="sortBy" value={"LTH"}  /> Price - Low to High</p>
                            <p className="mb-0"><input onChange={(e) => setSortBy(e.target.value)} type="radio" name="sortBy" value={"HTL"} defaultChecked={true} /> Price - High to Low</p>
                        </div>

                    </div>
                    </div>


                    {/* Product Gallery */}
                    <div className="col-12 col-md-9 productGallery mb-4">
                        <h4 className="fw-medium py-3">Showing All Products (Showing {filteredData.length} products)</h4>
                        {productsLoading && <p>Loading...</p>}
                        {filteredData && 
                            <div id="productGrid">
                                {filteredData.map(product => (
                                    <div key={product._id} className="productCard">
                                        {/* Wishlist button */}
                                        <button onClick={() => handleWishlist(product._id)} type="button" className="wishlistBtn" >
                                            <img src={wishlistArray.includes(product._id)? favoriteFilledIcon : favoriteIcon} alt="" />
                                        </button>
                                        {/* Image */}
                                        <img loading="lazy"  src={product.image} alt="" />
                                        {/* Title */}
                                        <p className="productTitle pt-2"><Link to={`/productDetails/${product._id}`}>{product.name}</Link></p>
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
                                            <span className="text-success fw-medium fs-6">🡫 {product.discountPrice ? discountPercentage(product.actualPrice, product.discountPrice) : null }%</span>
                                            <sub className="subScript ms-1">
                                                M.R.P: {product.actualPrice ? parseInt(product.actualPrice).toLocaleString(): "Product Unavailable"}
                                            </sub>
                                        </p>
                                        {/* Add to Cart Button */}
                                        <button onClick={() => handleCartButton(product._id, product.discountPrice ? product.discountPrice : product.actualPrice)} className="btn btn-warning cartBtn">Add to Cart</button>
                                
                                                                                
                                    </div>
                                ))}
                            </div>
                        }
                        {filteredData.length === 0 &&
                            <p>{productsError}</p>
                        }
                    </div>
                </div>
            </main>
            <Footer />

        </>
    )
}

export default ProductListings