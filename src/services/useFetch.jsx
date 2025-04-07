import { useState, useEffect } from "react"


const useFetch = (apiUrl) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        fetch(apiUrl)
            .then((res) => {
                if(!res.ok) {
                    throw ("Failed to fetch data. Try again later!")
                }
                return res.json()
            })
            .then((data) => {
                setData(data.productData)
                setError(null)
            })
            .catch((error) => {
                setError(error.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [apiUrl])

    return {data, loading, error}
}

export default useFetch