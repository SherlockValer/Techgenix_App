import { useState, useEffect } from "react"

export const useCart = (apiUrl) => {
    const [cart, setCart] = useState(null || [])
    const [cartError, setError] = useState(null)

    useEffect(() => {
        fetch(apiUrl)
        .then(res => res.json())
        .then(cartData => setCart(cartData))
        .catch(error => setError(error.error))
    }, [apiUrl])


    return {cart, cartError}
}


