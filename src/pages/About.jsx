const About = () => {
  return (
    <main className="container my-3">
      <h4 className="mb-3 fw-bold fs-5 text-danger">About Us</h4>
      <div
        style={{
          width: "8rem",
          height: "2px",
          backgroundColor: "#dc3545",
        }}
        className="mb-4"
      ></div>

      <section className="row my-5 align-items-start">
        <div className="col-md-6">
            <img src="images/about_us_1.jpg" className="img-fluid" alt=""  />
        </div>
        <div className="col-md-6">
          <h6 className="mb-3">
            ✅ <strong>Your Trusted Destination for Smart Electronics</strong>
          </h6>
          <hr />
          <p className="fs-6 text-muted lh-lg">
            Welcome to TechGenix — your go-to hub for the latest and most
            reliable electronics at unbeatable prices. We're not just another
            tech store. We're a passionate team driven by innovation, trust, and
            customer-first values.
          </p>
        </div>
      </section>

      <section className="my-5">
        <h6 className="mb-3">
          🔌 <strong>Who We Are</strong>
        </h6>
        <hr />
        <p className="fs-6 text-muted lh-lg">
          TechGenix is built for modern India. We believe that quality gadgets
          should be accessible to everyone — whether you're a student, a working
          professional, or a tech enthusiast. From headphones to smartwatches,
          power banks to speakers — we handpick every product for performance,
          durability, and design.
        </p>
      </section>

      <section className="my-5">
        <h6 className="mb-3">
          🚀 <strong>What We Offer</strong>
        </h6>
        <hr />
        <ul className="fs-6 text-muted lh-lg">
          <li>
            <strong>Genuine Products Only</strong> - No counterfeits. No clones.
            Only 100% brand-authorized electronics.
          </li>
          <li>
            <strong>Curated Tech Gear</strong> - Top-rated gadgets selected
            based on reviews, trends, and utility.
          </li>
          <li>
            <strong>Lightning-Fast Delivery</strong> - We ship quickly and
            securely across India.
          </li>
          <li>
            <strong>7-Day Hassle-Free Returns</strong> - If it's not right, we
            make it right.
          </li>
          <li>
            <strong>24x7 Customer Support</strong> - Real people. Real help.
            Anytime you need.
          </li>
        </ul>
      </section>

      <div className="row">
        <section className="col-md-6">
          <h6 className="mb-3">
            🛠️ <strong>Our Mission</strong>
          </h6>
          <hr />
          <p className="fs-6 text-muted lh-lg">
            To empower everyday users with smart, reliable, and affordable
            technology — without the confusion, clutter, or compromise.
          </p>
        </section>

        <section className="col-md-6">
          <h6 className="mb-3">
            📍 <strong>Based in India. Shipping Nationwide.</strong>
          </h6>
          <hr />
          <p className="fs-6 text-muted lh-lg">
            We're proudly Indian, and we aim to serve every corner of the
            country with equal dedication.
          </p>
        </section>
      </div>

      <section className="my-5">
        <h6 className="mb-3">
          🙌 <strong>Join the TechGenix Community.</strong>
        </h6>
        <hr />
        <p className="fs-6 text-muted lh-lg">
          Whether you're here for your first gadget or your fiftieth, you’re
          part of a growing family of smart buyers who believe in better tech
          for a better life.
        </p>
        <div className="row g-2">
          <div className="col-auto">
            <input type="email" className="form-control " />
          </div>
          <div className="col-auto">
            <button className="btn btn-danger ">Subscribe Now</button>
          </div>
        </div>
      </section>
    </main>
  );
};
export default About;
