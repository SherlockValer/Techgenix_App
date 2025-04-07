import { useState, useEffect } from "react"
import useGlobalContext from "../context/globalContext"
import { useCart } from "../services/useCart"
import { useNavigate } from "react-router-dom"


const BuyNow = ({product, quantity}) => {
        const [cartData, setCartData] = useState({})
        const {cartCount, setCartCount, API_URL} = useGlobalContext()

        const navigate = useNavigate()

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
            .then(msg => console.log(msg))
            .catch(error => console.log(error))

            navigate('/cart')
    
        }
    


    return (
        <>
            <button onClick={() => handleCartButton(product._id, product.discountPrice ? product.discountPrice : product.actualPrice)} className="my-2 btn btn-primary btn-sm">Buy Now</button>
        </>
    )
}

export default BuyNow