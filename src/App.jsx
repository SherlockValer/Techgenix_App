import { useRef } from 'react'
import useGlobalContext from './context/globalContext'
import { Link } from 'react-router-dom'

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import mobiles from './assets/mobiles.png'
import headphones from './assets/headphones.jpg'
import laptops from './assets/laptops.jpg'
import monitors from './assets/monitors.jpeg'
import smartwatches from './assets/smartwatches.jpg'
import tablet from './assets/Tablet.jpg'
import smarttv from './assets/smarttv.jpg'
import printers from './assets/printers.jpg'
import pcAccessories from './assets/pcAccessories.jpeg'


import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import HeroSection from './components/HeroSection'
import BestSellers from './components/Bestsellers'
import TrustSection from './components/TrustSection'

function App() {
  const {user, setUser} = useGlobalContext()

  const scroller = useRef(null)

  const handleRightClick = () => {
    scroller.current.scrollLeft += 100
  }

  const handleLeftClick = () => {
    scroller.current.scrollLeft -= 100
  }

  return (
    <>
      <Header />
      <main className="container py-3">
        <h4>Welcome, {user.name}</h4>

        {/* Hero Section */}
        <HeroSection />

        {/* Menu */}
        <div className='d-flex'>

          {/* Left Button */}
          <button className='menuBtns' onClick={handleLeftClick}><ChevronLeftIcon/></button>
          
          {/* Menu Items */}
          <ul className='menuList' id="menuList" ref={scroller}>
            <li className='menuListItem'>
              <Link to='/products/Smartphones'>
                <img src={mobiles} alt="mobiles.jpg" />
                Mobiles
              </Link>
            </li>
            <li className='menuListItem'>
              <Link to='/products/Laptops'>
                <img src={laptops} alt="laptops.jpg" />
                Laptops
              </Link>
            </li>
            <li className='menuListItem'>
              <Link to='/products/Headphones'>
                <img src={headphones} alt="headphones.jpg" />
                Headphones
              </Link>
            </li>
            <li className='menuListItem'>
              <Link to='/products/Smart Watches'>
                <img src={smartwatches} alt="smartwatches.jpg" />
                Smart Watches
              </Link>
            </li>
            <li className='menuListItem'>
              <Link to='/products/4K Smart TV'>
                <img src={smarttv} alt="Smart Tv.jpg" />
                TV
              </Link>
            </li>
            <li className='menuListItem'>
              <Link to='/products/Tablet'>
                <img src={tablet} alt="Tablet.jpg" />
                Tablet
              </Link>
            </li>
            <li className='menuListItem'>
              <Link to='/products/Monitors'>
                <img src={monitors} alt="Monitors.jpg" />
                Monitors
              </Link>
            </li>
            <li className='menuListItem'>
              <Link to='/products/Printer'>
                <img src={printers} alt="Printer.jpg" />
                Printers
              </Link>
            </li>
            <li className='menuListItem'>
              <Link to='/products/PC'>
                <img src={pcAccessories} alt="PC Acessories.jpg" />
                PC Accessories
              </Link>
            </li>
          </ul>
          {/* Right Button */}
          <button className='menuBtns' onClick={handleRightClick}><ChevronRightIcon /></button>
        </div>

        {/* Bestsellers */}
        <BestSellers />

        {/* Trust Section */}
        <TrustSection />

      </main>
      <Footer />
    </>
  )
}

export default App
