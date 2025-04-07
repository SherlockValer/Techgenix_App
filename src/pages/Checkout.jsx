import Header from "../components/Header"
import Footer from "../components/Footer"
import { useEffect, useState } from "react"
import { useCart } from "../services/useCart"
import { discountPercentage } from "../utils/discountPercentageCalc"
import useGlobalContext from "../context/globalContext"
import { useNavigate } from "react-router-dom"

const Checkout = () => {
    const [cartData, setCartData] = useState({})
    const {user, cartCount, setCartCount, API_URL} = useGlobalContext()
    const navigate = useNavigate()
    
    const [orderDetails, setOrderDetails] = useState({
        userId: user._id,
        orderItems: [],
        totalAmount: 0,
        status: "pending",
        paymentMethod: "",
        shippingAddress: ""
    })

    // Fetch Cart details
    const {cart, cartError} = useCart(`${API_URL}/user/67dce53d2b5635c333cd19df/cart/populate`)

    useEffect(() => {
        setCartData(cart)
        setOrderDetails(prevData => ({...prevData, orderItems: cart.items, totalAmount: cart.totalPrice-500}))
    }, [cart])

    const addressHandler = (e) => {
        const {value} = e.target
        setOrderDetails(prevData => ({...prevData, shippingAddress: value}))
    }

    const paymentMethodHandler = (e) => {
        const {value} = e.target
        setOrderDetails(prevData => ({...prevData, paymentMethod: value}))
    }

    const emptyCart = () => {
        setCartData(prevData => ({...prevData, items: [], totalPrice: 0}))
        setCartCount(0)

        fetch(`${API_URL}/user/67dce53d2b5635c333cd19df/cart`, {
            method: "POST",
            body: JSON.stringify({
                items: [],
                totalPrice: 0
            }),
            headers: {
                "content-type": "application/json"
            }
        })
        .then(res => res.json())
        .then(msg => console.log(msg))
        .catch(error => console.log(error))
    }

    const proceedBtnHandler = () => {
        const order = {...orderDetails}

        fetch(`${API_URL}/orders/newOrder`, {
            method: "POST",
            body: JSON.stringify(order),
            headers: {
                'content-type' : 'application/json'
            }
        })
        .then(res => res.json())
        .then(msg => {
            if(msg.message) {
                emptyCart()
                navigate(`/checkout/success/${msg.orderId}`)
            }
        })
        .catch(error => {
            alert(error)
        })
        
    }



    return (
        <>
            <Header />
            <main className="container bg-body-secondary p-4">
                <h3 className="pb-2">Checkout</h3>

                <div className="row">
                    <hr />
                    <div className="col-md-8">
                    <div>
                        <p>Deliver to:</p>
                        <select className="form-select" onChange={addressHandler}>
                            <option value="">Select Address</option>
                            {user && user.addresses && 
                                user.addresses.map(address => (
                                    <option value={address.label + ', ' + address.street + ', ' + address.city + ', ' + address.state + '-' + address.pincode}>
                                        {address.label + ', ' + address.street + ', ' + address.city + ', ' + address.state + '-' + address.pincode}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <hr />
                    <div>
                        <p>Payment Method</p>
                        <select className="form-select" onChange={paymentMethodHandler}>
                            <option value="">Select Payment Method</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="Debit Card">Debit Card</option>
                            <option value="UPI/QR Code">UPI/QR Code</option>
                            <option value="Internet Banking">Internet Banking</option>
                            <option value="Cash On Delivery">Cash On Delivery</option>
                        </select>
                    </div>
                    <hr />
                    <p>Review Order Details</p>
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
                                        </h5>
                                        <p className="cartQuantity">Quantity: 
                                            <span className="ms-2">
                                                {item.quantity}
                                            </span>
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

                    <div className="col-md-3 d-flex flex-column card totalPriceSheet">
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
                        <button className="btn btn-success btn-sm" onClick={proceedBtnHandler}>Proceed</button>
                    </div>
                </div>
            </main>
            <Footer />

        </>
    )
}

export default Checkout