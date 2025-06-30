import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white p-5">
      <div className="container d-flex flex-wrap gap-5">
        <div>
          <p>
            <Link className="electrolize-regular fs-4 fw-bold" to="/">
              Tech
              <span className="electrolize-regular text-primary fs-4 fw-bold">
                Genix
              </span>
            </Link>
          </p>
        </div>

        <div className="d-flex flex-wrap gap-5">
          <div>
            <p className="fs-5">Support</p>
            <p className="mb-0">123, Sector 21, </p>
            <p className="mb-0">Bengaluru, Karnataka - 560001</p>
            <p>India</p>
            <p>tech.genix@gmail.com</p>
            <p>+91 9876543210</p>
          </div>

          <div>
            <p className="fs-5">Account</p>
            <p>
              <a href="/account">My Account</a>
            </p>
            <p>
              <a href="/cart">Cart</a>
            </p>
            <p>
              <a href="/wishlist">Wishlist</a>
            </p>
            <p>
              <a href="/">Shop</a>
            </p>
          </div>

          <div>
            <p className="fs-5">Quick Link</p>
            <p>Privacy Policy</p>
            <p>Terms of Use</p>
            <p>FAQ</p>
            <p>
              <a href="/contact">Contact</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
