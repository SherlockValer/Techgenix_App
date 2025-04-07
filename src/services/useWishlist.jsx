import { useState, useEffect } from "react"

export const useWishlist = (apiUrl) => {
    const [data, setData] = useState(null || [])
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(apiUrl)
        .then(res => res.json())
        .then(wishlist => setData(wishlist))
        .catch(error => setError(error.error))
    }, [apiUrl])


    return {data, error}
}


