import { Link } from "react-router-dom";

const CategoriesSection = () => {
  const categories = [
    { name: "Smartphones", image: "./images/mobiles.png" },
    { name: "Laptops", image: "./images/laptops.jpg" },
    { name: "Headphones", image: "./images/headphones.jpg" },
    { name: "Smart Watches", image: "./images/smartwatches.jpg" },
    { name: "4K Smart TV", image: "./images/smarttv.jpg" },
    { name: "Tablet", image: "./images/Tablet.jpg" },
    { name: "Monitors", image: "./images/monitors.jpeg" },
    { name: "Printer", image: "./images/printers.jpg" },
    { name: "PC", image: "./images/pcAccessories.jpeg" },
  ];

  return (
    <div className="my-5">
      <div className="mb-4">
        <h4 className="mb-3 fw-bold fs-5 text-danger">Categories</h4>
        <div
          style={{ width: "8rem", height: "2px", backgroundColor: "#dc3545",  }}
        ></div>
      </div>
      <div className="d-flex gap-4 flex-wrap mt-5">
        {categories.map((cat) => (
          <Link to={`/products/${cat.name}`}>
            <div className="d-flex flex-column gap-2 align-items-start menuListItem">
              <img src={cat.image} alt={cat.name} />
              <p>{cat.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
