const API_URL = import.meta.env.VITE_API_URL


export const addToWishList = async(productid) => {
    try {
        const response = await fetch(`${API_URL}/user/67dce53d2b5635c333cd19df/wishlist`,
            {
                method : "POST",
                body: JSON.stringify({id: productid}),
                headers : {
                    "content-type" : "application/json"
                }
            }
        )

        const json = await response.json()
        console.log(json)

        if(json.message) {
            alert(json.message)
        } else {
            alert(json.error)
        }
        
    } catch (error) {
        console.log("Error posting data", error)
    }
}