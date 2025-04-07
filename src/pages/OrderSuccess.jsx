import Header from "../components/Header"
import Footer from "../components/Footer"
import { useEffect, useState } from "react"

import useGlobalContext from "../context/globalContext"
import { useParams } from "react-router-dom"
import checkmark from '../assets/checkmart.svg'

const OrderSuccess = () => {
    const [orderDetails, setOrderDetails] = useState({})
    const orderIdObj = useParams()

    const {API_URL} = useGlobalContext()

    useEffect(() => {
        fetch(`${API_URL}/orders/${orderIdObj.orderId}`)
        .then(res => res.json())
        .then(data => {
            setOrderDetails(data)
        })
        .catch(error => alert(error)) 
    }, [])


    return (
        <>
            <Header />
            <main className="container bg-body-secondary p-4">
                {orderDetails &&
                <>
                    <h3 className="pb-2"><img style={{width: "1em"}} src={checkmark} alt="" /> Order Placed Successfully!</h3>

                    <div className="row">
                        <hr />
                        <div className="col-md-8">
                        <div>
                            <p>Shipping Address</p>
                            <p>{orderDetails.shippingAddress}</p>
                        </div>
                        <hr />
                        <div>
                            <p>Payment Method</p>
                            <p>{orderDetails.paymentMethod}</p>
                        </div>
                        <hr />
                        <p>Placed Items</p>
                        {orderDetails.orderItems && 
                            orderDetails.orderItems.map(item => (
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
                        <div className="card">
                            <div className="row p-2 justify-content-end">
                                <div className="col-md-3">
                                    Subtotal
                                </div>
                                <div className="col-md-7">

                                </div>
                                <div className="col-md-2">{orderDetails.totalAmount > 0 ? orderDetails.totalAmount.toLocaleString() : orderDetails.totalAmount}</div>                            
                            </div>
                        </div>
                        </div>

                    </div>
                </>
                }

            </main>
            <Footer />

        </>
    )
}

export default OrderSuccess