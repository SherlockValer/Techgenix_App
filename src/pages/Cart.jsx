import Header from "../components/Header"
import Footer from "../components/Footer"
import { useEffect, useState } from "react"
import { useCart } from "../services/useCart"
import { discountPercentage } from "../utils/discountPercentageCalc"
import useGlobalContext from "../context/globalContext"
import { Link, useNavigate } from "react-router-dom"

const Cart = () => {
    const [cartData, setCartData] = useState({})
    const {cartCount, setCartCount, API_URL} = useGlobalContext()
    const navigate = useNavigate()

    // Fetch Cart details
    const {cart, cartError} = useCart(`${API_URL}/user/67dce53d2b5635c333cd19df/cart/populate`)

    useEffect(() => {
        setCartData(cart)
    }, [cart])

    const deleteItemHandler = (productId, price, quantity) => {
        const filteredItems = cartData.items.filter(item => item.productId._id !== productId)
        const newTotal = cartData.totalPrice - price*quantity

        setCartData(prevData => ({...prevData, items: filteredItems, totalPrice: newTotal}))

        let total = 0
        for(let i=0; i<filteredItems.length; i++) {
            total += filteredItems[i].quantity
        }
        setCartCount(total)

        fetch(`${API_URL}/user/67dce53d2b5635c333cd19df/cart`, {
            method: "POST",
            body: JSON.stringify({
                items: filteredItems,
                totalPrice: newTotal
            }),
            headers: {
                "content-type": "application/json"
            }
        })
        .then(res => res.json())
        .then(msg => alert(msg.message))
        .catch(error => console.log(error))

    }

    const quantityChangeHandler = (productId, change) => {
        const selectedProduct = cartData.items.find(item => item.productId._id === productId)
        if(change === "increment") {
            selectedProduct.quantity = selectedProduct.quantity + 1
        } else if (change === "decrement") {
            selectedProduct.quantity = selectedProduct.quantity - 1
        }


        const updatedCartItems = [...cartData.items.filter(item => item.productId._id !== productId), selectedProduct]

        let newTotalPrice = 0
        for(let i=0; i<updatedCartItems.length; i++){
            newTotalPrice += updatedCartItems[i].quantity * updatedCartItems[i].price
        }

        let total = 0
        for(let i=0; i<updatedCartItems.length; i++) {
            total += updatedCartItems[i].quantity
        }
        setCartCount(total)


        setCartData(prevData => ({...prevData, items: updatedCartItems, totalPrice: newTotalPrice}))

        setTimeout = (() => {
            fetch(`${API_URL}/user/67dce53d2b5635c333cd19df/cart`, {
                method: "POST",
                body: JSON.stringify({
                    items: updatedCartItems,
                    totalPrice: newTotalPrice
                }),
                headers: {
                    "content-type": "application/json"
                }
            })
            .then(res => res.json())
            .then(msg => alert(msg.message))
            .catch(error => console.log(error))

        }, 2000)

    }

    const shoppingButtonHandler = () => {
        navigate('/')
    }


    return (
        <>
            <Header />
            <main className="container bg-body-secondary p-4">
                <h3 className="pb-2">My Cart</h3>
                {cartData && cartData.items && cartData.items.length !=0 ? 
                <>
                <div className="row mb-5">
                    <hr />
                    <div className="col-md-8">
                    {cartData && cartData.items && 
                        cartData.items.map(item => (
                            <div className="card">
                                <div className="row p-2">
                                    <div className="col-md-3">
                                        <img style={{width:"100px", height:"100px", objectFit:"contain"}} src={item.productId.image} alt="" />
                                    </div>
                                    <div className="col-md-7">
                                        <p className="cartItemName">{item.productId.name}</p>
                                        <h5 className="mb-2 cartItemPrice">
                                            ₹{item.productId.discountPrice ? parseInt(item.productId.discountPrice).toLocaleString() : parseInt(item.productId.actualPrice).toLocaleString()}
                                            <span className="MRP ms-1">
                                                ₹{item.productId.actualPrice ? parseInt(item.productId.actualPrice).toLocaleString(): "Product Unavailable"}
                                            </span>
                                        </h5>
                                        <p className="mb-1">
                                            <span className="text-success fw-medium fs-6">{item.productId.discountPrice ? discountPercentage(item.productId.actualPrice, item.productId.discountPrice) : null }% off</span>
                                        </p>
                                        <p className="cartQuantity">Quantity: 
                                            <span className="ms-2 quantityBtnSpan">
                                                <button onClick={() => quantityChangeHandler(item.productId._id, "increment")}>+</button>
                                                <input type="number" min={1} max={100} value={item.quantity}/>
                                                {item.quantity > 1 &&
                                                    <button onClick={() => quantityChangeHandler(item.productId._id, "decrement")}>-</button>
                                                }  
                                            </span>
                                            <button onClick={() => deleteItemHandler(item.productId._id, item.price, item.quantity)} className="ms-2 cartItemDeleteBtn">Delete</button>
                                        </p>
                                        
                                    </div>
                                    <div className="col-md-2">
                                        <p>₹{(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        ))


                    }
                    </div>

                    <div className="col-md-3 pb-3 d-flex flex-column card totalPriceSheet">
                        <h5 className="pt-2 mb-0">Price Details</h5>
                        <hr />
                        <div className="d-flex justify-content-between">
                            <span>Total Price</span>
                            {cartData && cartData.items &&
                            <span>₹{cartData.totalPrice.toLocaleString()}</span>}
                        </div>
                        <div className="d-flex justify-content-between">
                            <span>Discount</span>
                            <span>- ₹{"1000".toLocaleString()}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span>Delivery Charges</span>
                            <span>₹{"500".toLocaleString()}</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between fw-bold">
                            <span>Total Amount</span>
                            {cartData && cartData.items &&
                            <span>₹{(cartData.totalPrice- 500).toLocaleString()}</span>}
                        </div>
                        <hr />
                        <p>You will save ₹1000 on this order.</p>
                        <Link to='/checkout'><button className="btn btn-primary btn-sm">Proceed to Checkout</button></Link>
                    </div>
                </div>
                </> : 
                <>
                    <div className="">
                        <p>Your Cart is Empty</p>
                        <button onClick={shoppingButtonHandler} className="btn btn-primary">Continue Shopping</button>      
                    </div>
                </>

                }
            </main>
            <Footer />

        </>
    )
}

export default Cart