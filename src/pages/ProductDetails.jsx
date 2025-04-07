import Header from "../components/Header"
import Footer from "../components/Footer"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { starRatingsGenerator } from "../utils/starRatingsGenerator"
import { discountPercentage } from "../utils/discountPercentageCalc"

import useGlobalContext from "../context/globalContext"

//* Images
import replace from '../assets/Product Details Page/replace.svg'
import FreeDelivery from '../assets/Product Details Page/FreeDelivery.svg'
import Warranty from '../assets/Product Details Page/Warranty.svg'
import COD from '../assets/Product Details Page/COD.svg'

//* Buttons
import AddToCart from "../components/AddToCart"
import WishlistButton from "../components/WishlistButton"
import BuyNow from "../components/BuyNow"


const ProductDetails = () => {
    const [details, setDetails] = useState(null)
    const [error, setError] = useState(null)
    const productIdObj = useParams()

    const [quantity, setQuantity] = useState(1)

    const {API_URL} = useGlobalContext()


    useEffect(() => {
        const fetchProductDetails = async() => {
            try {
                const response = await fetch(`${API_URL}/products/${productIdObj.productId}`)

                const json = await response.json()
                console.log(json)
                setDetails(json)
            } catch (error) {
                setError(error)
            }
        }

        fetchProductDetails()
    }, [])


    const decrementHandler = () => {
        if(quantity > 1) {
            setQuantity(quantity => quantity - 1)
        } else {
            alert("Minimum one item is needed")
        }
    }

    const incrementHandler = () => {
        setQuantity(quantity => quantity + 1)
    }



    return (
        <>
            <Header />
            <main className="container py-5">
                {details && 
                    <div className="row d-flex justify-content-between">
                        <div className="col-md-3 d-flex flex-column mb-3">
                            <WishlistButton product={details} />
                            <img style={{height: "280px", objectFit:"contain"}} className="img-fluid" src={details.image} alt="" />
                            <BuyNow product={details} quantity={quantity} />
                            <AddToCart  product={details} quantity={quantity} />
                        </div>
                        <div className="col-md-8">
                            <h5>{details.name}</h5>
                            <p className="mb-2">{details.ratings} <span className="starRating">{starRatingsGenerator(details.ratings)} ({details.noOfRatings})</span>  </p>
                            <h5 className="mb-2">
                                ₹{details.discountPrice ? parseInt(details.discountPrice).toLocaleString() : parseInt(details.actualPrice).toLocaleString()}
                                <span className="MRP ms-1">
                                    ₹{details.actualPrice ? parseInt(details.actualPrice).toLocaleString(): "Product Unavailable"}
                                </span>
                            </h5>
                            <p className="mb-1">
                                <span className="text-success fw-medium fs-6">{details.discountPrice ? discountPercentage(details.actualPrice, details.discountPrice) : null }% off</span>
                            </p>
                            <p>Quantity: 
                                <span className="ms-2 quantityBtnSpan">
                                    <button onClick={decrementHandler}>-</button>
                                    <input type="number" min={1} max={100} value={quantity}/>  
                                    <button onClick={incrementHandler}>+</button>
                                </span>

                            </p>
                            <hr />
                            <div className="row d-flex trustBar">
                                <div className="col-md-2 mb-0">
                                    <img src={replace} alt="" />
                                    <p>7 days Replacement</p>
                                </div>
                                <div className="col-md-2">
                                    <img src={FreeDelivery} alt="" />
                                    <p>Free Delivery</p>
                                </div>
                                <div className="col-md-2">
                                    <img src={Warranty} alt="" />
                                    <p>1 Year Warranty</p>
                                </div>
                                <div className="col-md-2">
                                    <img src={COD} alt="" />
                                    <p>Cash/Pay on Delivery</p>
                                </div>
                            </div>
                            <hr />
                            <p>Description:</p>
                            <div>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus quam totam voluptatem ipsum. Asperiores reprehenderit dignissimos alias eligendi ex autem, ratione fugit ut vel nisi!</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius repellat ad provident laudantium rem! Ipsam, earum maxime. Suscipit tempora sed voluptatum nobis veritatis molestiae voluptatibus.</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam odit ea laudantium expedita fugit non, quod assumenda sit veniam fugiat illum atque eos aliquid tempore.</p>
                            </div>
                        </div>
                    </div>
                }

            </main>
            <Footer />

        </>
    )
}

export default ProductDetails