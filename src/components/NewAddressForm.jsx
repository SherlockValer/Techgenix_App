import { useEffect, useState } from "react";
import IndianStatesSelect from "./common/IndianStatesSelect";
import useGlobalContext from "../context/globalContext";
import { FaPencilAlt } from "react-icons/fa";

const NewAddressForm = ({ whichAddress, orderDetails, setOrderDetails, setNewAddress }) => {
  const { user } = useGlobalContext();

  const [label, setLabel] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const [isSubmitted, setSubmitted] = useState(false);

  const [saveAddress, setSaveAddress] = useState(false);


  function handleSubmit(e) {
    e.preventDefault();

    const newAddress =
      label + ", " + street + ", " + city + ", " + state + ", " + pincode;

    setOrderDetails((prevData) => ({
      ...prevData,
      shippingAddress: newAddress,
    }));

    setSubmitted(true);

    if(saveAddress) {
        setNewAddress({label, street, city, state, pincode})
    }
  }

  function handleSaveAddress(e) {
    const { checked } = e.target;
    if (checked) {
      setSaveAddress(true);
    }
  }

  useEffect(() => {
    setLabel("");
    setStreet("");
    setCity("");
    setState("");
    setPincode("");
    setSubmitted(false);
    setSaveAddress(false);
    setNewAddress(null)
    setOrderDetails((prevData) => ({
      ...prevData,
      shippingAddress: "",
    }));
  }, [whichAddress]);

  return (
    <>
      {!isSubmitted && (
        <form
          onSubmit={handleSubmit}
          className="py-3 pe-4 d-flex flex-column gap-4 "
        >
          <div className="d-flex gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="form-control "
              defaultValue={user.name}
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
              defaultValue={user.email}
              disabled
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Label"
              className="form-control "
              onChange={(e) => setLabel(e.target.value)}
              value={label}
              required
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Street"
              className="form-control "
              onChange={(e) => setStreet(e.target.value)}
              value={street}
              required
            />
          </div>

          <div className="d-flex gap-4">
            <input
              type="text"
              placeholder="City"
              className="form-control "
              onChange={(e) => setCity(e.target.value)}
              value={city}
              required
            />
            <IndianStatesSelect state={state} setState={setState} />
          </div>

          <div className="d-flex gap-4">
            <input
              type="number"
              placeholder="Pincode"
              className="form-control "
              maxLength={6}
              onChange={(e) => setPincode(e.target.value)}
              value={pincode}
              required
            />
            <input
              type="text"
              placeholder="Phone"
              className="form-control "
              defaultValue={user.phoneNumber}
              disabled
            />
          </div>

          <div className="d-flex gap-2 align-items-center">
            <input
              onChange={handleSaveAddress}
              type="checkbox"
              name="future"
              id=""
              checked={saveAddress}
            />
            <p className=" m-0">
              Save this address for future reference
            </p>
          </div>

          <input
            type="submit"
            value="Add"
            className="col-2 col-md-2  btn btn-danger btn-sm"
          />
        </form>
      )}

      {isSubmitted && (
        <div
          className="my-4 p-3 d-flex justify-content-between align-items-center"
          style={{ border: "1px solid black" }}
        >
          <div>
            <p className="mb-0 fw-bold">{user.name}</p>
            <p className="mb-0 ">{orderDetails.shippingAddress}</p>
            <p className="mb-0 ">{user.phoneNumber}</p>
          </div>
          <FaPencilAlt
            className="text-danger"
            style={{ cursor: "pointer" }}
            onClick={() => setSubmitted(false)}
          />
        </div>
      )}
    </>
  );
};

export default NewAddressForm;
