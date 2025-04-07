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
                    throw("Error fetching data")
                }
                return res.json()
            })
            .then((data) => {
                setData(data)
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