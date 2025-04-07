import { useState, useEffect } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Link } from "react-router-dom"
import useGlobalContext from "../context/globalContext"

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [error, setError] = useState({})
    const {API_URL} = useGlobalContext()

    useEffect(() => {
        fetch(`${API_URL}/67dce53d2b5635c333cd19df/orders`)
        .then(res => res.json())
        .then(data => setOrders(data))
        .catch(error => setError(error))
    }, [])


    return (
        <>
            <Header />
            <div className="container">
                <div className="row py-5">
                    <div className="col-md-2">
                        <ul className="list-group list-group-flush sidebar">
                            <li className="list-group-item"><Link to='/profile'>Profile</Link> </li>
                            <li className="list-group-item"><Link to='/orders' >Orders</Link> </li>
                            <li className="list-group-item"><Link to='/profile/addressess' >Addressess</Link> </li>
                        </ul>
                        
                    </div>
                    <div className="col-md-8">
                    <h4 className="pb-3">Previous Orders</h4>
                    {orders ? 
                        <ul className="list-group">
                            {orders.map(order => (
                                <li className="list-group-item " key={order._id}>
                                    <p><strong>Order Id:</strong> {order._id}</p>
                                    <p><strong>Status:</strong> {order.status}</p>
                                    <p><strong>Payment Method:</strong> {order.paymentMethod}</p>


                                    {order.orderItems.map(item => (
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
                                        </div>))}
                                </li>
                            ))
                            }
                        </ul> 
                    : 
                    <>
                        <p>No Orders found.</p>
                    </>
                    }
                    </div>
                </div>
            </div>
            <Footer />        
        </>
    )
}

export default Orders