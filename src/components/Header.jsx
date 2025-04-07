import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"

// Custom CSS
import '../App.css'


// Material UI Icons
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CloseIcon from '@mui/icons-material/Close';

import useGlobalContext from "../context/globalContext";
import { grey } from "@mui/material/colors";

const Header = () => {
    const [searchQuery, setQuery] = useState("")
    const [searchResult, setResult] = useState([])
    const [showResult, setShow] = useState(false)
    const [error, setError] = useState('')

    // useLocation to locate homepage
    const location = useLocation()

    // useNavigate to go to a location
    const navigate = useNavigate()

    const {wishlistCount, cartCount, setCartCount, API_URL} = useGlobalContext()

    // Fetch Search Data
    const searchBtnHandler = () => {
        if(searchQuery) {
            fetch(`${API_URL}/search/${searchQuery}`)
            .then(res => res.json())
            .then(data => {
                if(!data.error) {
                    setResult(data)
                    setShow(true)
                } else {
                    throw data.error
                }
            })
            .catch(error => setError(error))

        } else {
            alert("Please enter some input")
        }

    }

    const handleCloseSearch = () => {
        setQuery("")
        setResult([])
        setShow(false)
        setError('')
    }

    const handleSearchClick = (productId) => {
        navigate(`/productDetails/${productId}`)
        window.location.reload()
    }

    return (
        <header>
            <div className="container">
                <nav className="navbar d-flex justify-content-between align-items-center">
                    <Link className="navbar-brand" to='/'>TechGenix</Link>

                    {/* SearchBar */}
                    <div className="border rounded border-dark-subtle px-2 py-1 searchBar">
                        <input onChange={(e) => setQuery(e.target.value)} style={{outline:"none", border:"none"}} type="text" value={searchQuery} placeholder="Search"/>
                        {!showResult &&
                            <SearchIcon onClick={searchBtnHandler} color="action" fontSize="small"/>
                        }
                        {showResult || error &&
                            <button className="close-btn me-0 py-0" onClick={handleCloseSearch}><CloseIcon sx={{ color: grey[500] }}/></button>
                        }
                        {showResult && searchResult.length !==0 && 
                            <ul className="searchBarList list-group">
                                {searchResult.length !==0 && searchResult.map(product => (
                                    <li style={{cursor: "pointer"}} onClick={() => handleSearchClick(product._id)} className="list-group-item d-flex">
                                        <img style={{width: "3rem", height: "3rem", objectFit: "contain", marginRight: "0.3rem"}} src={product.image} alt="" />
                                        <p style={{fontSize: "small"}}>{product.name}</p>
                                    </li>
                                ))}
                            </ul> 
                        }
                        {error && 
                            <p>{error}</p>
                        }
                    </div>
                    

                    {/* Login, Wishlist, Cart */}
                    <div className="col-auto d-flex justify-content-end align-items-center">
                        {
                            location.pathname==='/' &&
                            <div class="btn-group">
                                <button type="button" className="btn btn-primary nav-item me-0"> <LoginIcon fontSize="small"/> Login</button>
                                <button type="button" className="btn btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span className="visually-hidden">Toggle Dropdown</span>
                                </button>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to='/profile'>My Profile</Link></li>
                                    <li><Link className="dropdown-item" to='/orders'>Orders</Link></li>
                                </ul>
                            </div>
                            
                        }
                        {
                            location.pathname==='/' &&
                            <button style={{backgroundColor: 'orangered', color:'white'}} className="btn nav-item m-2"> Register</button>
                        }
                        
                        <button type="button" className="nav-item" >
                            <NavLink to='/wishlist'>
                                <FavoriteBorderIcon color="action" fontSize="small" className="me-2"/> 
                                <span className="wishlistBadge">
                                    {wishlistCount}
                                </span>
                            </NavLink>

                        </button>

                        <button type="button" className="nav-item cartBar">
                            <NavLink to='/cart'>
                                <ShoppingCartOutlinedIcon color="action" fontSize="small" className="me-3"/> 
                                <span className="cartBadge">
                                    {cartCount}
                                </span>
                                Cart
                            </NavLink>
                        </button>
                        

                    </div>
                </nav>
            </div>

        </header>

    )
}

export default Header