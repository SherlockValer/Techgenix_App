import useGlobalContext from "../context/globalContext";
import AddNewAddress from "./AddNewAddress.jsx";

const Addressess = () => {
  const { user} = useGlobalContext();
  return (
    <>
      <p className="p-2 fw-bold text-danger fs-5">Addresses ({user?.addresses?.length})</p>
      <ul className="list-group p-2 ms-0">
        {user &&
          user.addresses &&
          user.addresses.map((address, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <p className="mb-2 fw-bold">{user.name}</p>
                <p className="mb-2">
                  {address.label +
                    ", " +
                    address.street +
                    ", " +
                    address.city +
                    ", " +
                    address.state +
                    "-" +
                    address.pincode}
                </p>
                <p className="mb-2">{user.phoneNumber}</p>
              </div>

              <div>
                <button className="btn btn-danger btn-sm">delete</button>
              </div>
            </li>
          ))}
      </ul>

      <AddNewAddress />
    </>
  );
};

export default Addressess;
