import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

// Import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Import pages
import App from './App.jsx'
import ProductListings from './pages/ProductListings.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import UserProfile from './pages/UserProfile.jsx'
import WishList from './pages/WishList.jsx'
import Cart from './pages/Cart.jsx'
import Addressess from './pages/Addressess.jsx'
import { GlobalContextProvider } from './context/globalContext.jsx'
import { ProductDataContextProvider } from './context/productDataContext.jsx'
import AddNewAddress from './pages/AddNewAddress.jsx'
import Checkout from './pages/Checkout.jsx'
import OrderSuccess from './pages/OrderSuccess.jsx'
import Orders from './pages/Orders.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  }, 
  {
    path: '/products/:category',
    element: <ProductListings />
  },
  {
    path: '/productDetails/:productId',
    element: <ProductDetails />
  }, 
  {
    path: '/userProfile',
    element: <UserProfile />
  }, 
  {
    path: '/wishlist',
    element: <WishList />
  },
  {
    path: '/cart',
    element: <Cart />
  },
  {
    path: '/checkout',
    element: <Checkout />
  },
  {
    path: '/checkout/success/:orderId',
    element: <OrderSuccess />
  },
  {
    path: '/profile',
    element: <UserProfile />
  },
  {
    path: '/profile/addressess',
    element: <Addressess/>
  },
  {
    path: '/profile/addressess/addNew',
    element: <AddNewAddress />
  },
  {
    path: '/orders',
    element: <Orders />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalContextProvider>
      <ProductDataContextProvider>
        <RouterProvider router={router} />
      </ProductDataContextProvider>
    </GlobalContextProvider>
  </StrictMode>,
)
