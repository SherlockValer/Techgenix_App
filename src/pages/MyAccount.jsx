import { NavLink, Outlet } from "react-router-dom";

const MyAccount = () => {
  return (
    <main className="container my-3">
      <div className="row gap-4 my-3">
        <div className="col-md-3 h-100">
          <h4 className="mb-3 fw-bold fs-5 text-danger mb-3">My Account</h4>
          <div
            style={{
              width: "10rem",
              height: "2px",
              backgroundColor: "#dc3545",
            }}
            className="mb-4"
          ></div>


          <p className="fs-5">
            <NavLink to="/account" end>
              Personal Information
            </NavLink>
          </p>
          <p className="fs-5">
            <NavLink to="orders">My Orders</NavLink>
          </p>
          <p className="mb-0 fs-5">
            <NavLink to="address">Manage Address</NavLink>
          </p>
        </div>

        <div className="col-md-8">
          <Outlet />
        </div>
      </div>
    </main>
  );
};
export default MyAccount;
