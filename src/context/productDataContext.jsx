import { createContext, useContext } from "react";
import useFetch from "../services/useFetch";
const API_URL = import.meta.env.VITE_API_URL

const ProductDataContext = createContext()

// Custom Hook
const useProductDataContext = () => useContext(ProductDataContext)
export default useProductDataContext

// Context Provider
export const ProductDataContextProvider = ({children}) => {
    const {data:allProducts, loading:productsLoading, error:productsError} = useFetch(`${API_URL}/products`)


    return (
        <ProductDataContext.Provider value={{allProducts, productsLoading, productsError}}>
            {children}        
        </ProductDataContext.Provider>
    )
}