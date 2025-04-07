import { Link } from "react-router-dom"

const HeroSection = () => {
  return (
    <section className="hero-section d-flex align-items-center text-white">
      <div className="container text-center">
        <h2 className="fw-bold">Powering the Future, One Gadget at a Time.</h2>
        <p className="lead mb-4">
          Explore the latest in smart tech and futuristic gadgets at unbeatable prices.
        </p>
        <div>
          <Link to={'/products/Smartphones'} className="btn btn-primary me-3">
            Shop Now
          </Link>
          <a href="#menuList" className="btn btn-outline-light">
            Explore Categories
          </a>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
