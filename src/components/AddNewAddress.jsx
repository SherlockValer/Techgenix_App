import { useEffect, useState } from "react";
import useAddress from "../hooks/useAddress";
import useGlobalContext from "../context/globalContext.jsx";
import IndianStatesSelect from "./common/IndianStatesSelect.jsx";

const AddNewAddress = () => {
  const { user } = useGlobalContext();
  const { addNewAddress } = useAddress();

  const [formData, setFormData] = useState({
    label: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  const [state, setState] = useState("");

  const inputHandler = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const formHandler = (e) => {
    e.preventDefault();
    addNewAddress(formData);
  };

  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, state }));
  }, [state]);

  return (
    <>
      <p className="p-2 my-3 fw-bold text-danger fs-5">
        Add New Address
      </p>

      <form
        onSubmit={formHandler}
        className="mb-5 p-2 d-flex flex-column gap-4 "
      >
        <div className="d-flex gap-4">
          <input
            type="text"
            placeholder="First Name"
            className="form-control "
            value={user.name}
            disabled
          />
          <input
            type="text"
            placeholder="Last Name"
            className="form-control "
            disabled
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="Email Address"
            className="form-control "
            value={user.email}
            disabled
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Label"
            className="form-control "
            onChange={inputHandler}
            value={formData.label}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Street"
            className="form-control "
            onChange={inputHandler}
            value={formData.street}
          />
        </div>

        <div className="d-flex gap-4">
          <input
            type="text"
            placeholder="City"
            className="form-control "
            onChange={inputHandler}
            value={formData.city}
          />
          <IndianStatesSelect state={state} setState={setState} />
        </div>

        <div className="d-flex gap-4">
          <input
            type="number"
            placeholder="Pincode"
            className="form-control "
            maxLength={6}
            onChange={inputHandler}
            value={formData.pincode}
            required
          />
          <input
            type="text"
            placeholder="Phone"
            className="form-control "
            value={user.phoneNumber}
            disabled
          />
        </div>

        <input
          type="submit"
          value="Add"
          className="col-2 col-md-2  btn btn-danger"
        />
      </form>
    </>
  );
};

export default AddNewAddress;
