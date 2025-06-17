import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const ContactUs = () => {
  return (
    <main className="container my-3">
      <h4 className="mb-3 fw-bold fs-5 text-danger" id="contact-heading">Contact Us</h4>
      <div
        style={{
          width: "8rem",
          height: "2px",
          backgroundColor: "#dc3545",
        }}
        className="mb-4"
      ></div>
      <p>
        We're here to help — whether it's a product question, an order issue, or
        just to say hello!
      </p>

      <section className="row my-5 align-items-start">
        <div className="col-md-4">
          <h6 className="mb-3">
            <strong>📨 Customer Support</strong>
          </h6>
          <hr />
          <p className="fw-bold">Email :</p>
          <p>
            📧{" "}
            <a href="/contact" className="text-danger">
              support@techgenix.in
            </a>
          </p>
          <p className="font-sm text-muted">
            (We usually respond within 24 hours.)
          </p>
          <p className="fw-bold">Phone / WhatsApp Support :</p>
          <p>📱 +91 98765 43210</p>
          <p className="font-sm text-muted">
            Available: Mon-Sat, 10 AM to 6 PM IST
          </p>
        </div>

        <div className="col-md-4">
          <h6 className="mb-3">
            <strong>📦 Order & Shipping Queries</strong>
          </h6>
          <hr />
          <p className="fs-6 text-muted lh-lg">
            For order status, delivery issues, or return requests, please
            include your Order ID in the message for quicker assistance.
          </p>
        </div>

        <div className="col-md-4">
          <h6 className="mb-3">
            <strong>🛠️ Business & Bulk Inquiries</strong>
          </h6>
          <hr />
          <p className="fs-6 text-muted lh-lg mb-2">
            Want to collaborate or buy in bulk? Reach out at:
          </p>
          <a href="/contact" className="text-danger">
            business@techgenix.in
          </a>
        </div>
      </section>

      <section className="my-5">
        <h6 className="mb-3" id="address">
          <strong>🗺️ Our Address</strong>
        </h6>
        <hr />
        <p className="lh-lg fw-bold mb-1">TechGenix HQ</p>
        <p className="mb-1">123, Sector 21,</p>
        <p className="mb-1">Bengaluru, Karnataka - 560001</p>
        <p className="mb-1">India</p>
      </section>

      <section className="my-5">
        <h6 className="mb-3">
          <strong>📣 Let's Connect</strong>
        </h6>
        <hr />
        <p>Follow us on social media for updates, offers, and tech tips:</p>

        <div className="row my-4 ">
          <div className="col-md-4 d-flex flex-column gap-2 align-items-start p-4 connect">
            <FaInstagramSquare className="fs-2 text-danger" />
            <span>@techgenix.in</span>
          </div>
          <div className="col-md-4 d-flex flex-column gap-2 align-items-start p-4 connect">
            <FaSquareXTwitter className="fs-2 text-danger" />
            <span>@techgenix_in</span>
          </div>
          <div className="col-md-4 d-flex flex-column gap-2 align-items-start p-4 connect">
            <FaFacebookSquare className="fs-2 text-danger" />
            <span>TechGenix</span>
          </div>
        </div>
      </section>
    </main>
  );
};
export default ContactUs;
