import { toast } from "react-toastify";
import useGlobalContext from "../context/globalContext";

const useAddress = () => {
  const { user, API_URL } = useGlobalContext();

  function addNewAddress(newAddress) {
    const updatedAddresses = [...user.addresses, newAddress];

    fetch(`${API_URL}/update/67dce53d2b5635c333cd19df`, {
      method: "POST",
      body: JSON.stringify({ addresses: updatedAddresses }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Address Saved Successfully!");
        }
        res.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }

  return { addNewAddress };
};

export default useAddress;
