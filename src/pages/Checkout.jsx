import { useEffect, useState } from "react";
import useGlobalContext from "../context/globalContext";
import { useNavigate } from "react-router-dom";
import NewAddressForm from "../components/NewAddressForm";
import { FaPencilAlt } from "react-icons/fa";
import useAddress from "../hooks/useAddress.js";
import { toast } from "react-toastify";
import { useCartContext } from "../context/CartContext.jsx";

const Checkout = () => {
  const [cartData, setCartData] = useState({});
  const { user, API_URL } = useGlobalContext();
  const { setCartCount, cart, cartError } = useCartContext();
  const [whichAddress, setWhichAddress] = useState("new");
  const [newAddress, setNewAddress] = useState(null);
  const { addNewAddress } = useAddress();
  const navigate = useNavigate();

  const [orderDetails, setOrderDetails] = useState({
    userId: user._id,
    orderItems: [],
    totalAmount: 0,
    status: "pending",
    paymentMethod: "",
    shippingAddress: "",
  });

  // Fetch Cart details


  useEffect(() => {
    setCartData(cart);
    setOrderDetails((prevData) => ({
      ...prevData,
      orderItems: cart.items,
      totalAmount: cart.totalPrice - 500,
    }));
  }, [cart]);

  const addressHandler = (e) => {
    const { value } = e.target;
    setOrderDetails((prevData) => ({ ...prevData, shippingAddress: value }));
  };

  const paymentMethodHandler = (e) => {
    const { value } = e.target;
    setOrderDetails((prevData) => ({ ...prevData, paymentMethod: value }));
  };

  const emptyCart = () => {
    setCartData((prevData) => ({ ...prevData, items: [], totalPrice: 0 }));
    setCartCount(0);

    fetch(`${API_URL}/user/67dce53d2b5635c333cd19df/cart`, {
      method: "POST",
      body: JSON.stringify({
        items: [],
        totalPrice: 0,
      }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((msg) => console.log(msg))
      .catch((error) => console.log(error));
  };

  const proceedBtnHandler = () => {
    const order = { ...orderDetails };

    fetch(`${API_URL}/orders/newOrder`, {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((msg) => {
        if (msg.message) {
          emptyCart();
          if (newAddress) {
            addNewAddress(newAddress);
          }
          navigate(`/checkout/success/${msg.orderId}`);
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <>
      <main className="container my-3">
        <h4 className="mb-3 fw-bold fs-5 text-danger">Checkout</h4>

        <div
          style={{
            width: "12rem",
            height: "2px",
            backgroundColor: "#dc3545",
          }}
          className="mb-4"
        ></div>

        <div className="row mb-5 gap-4">
          <div className="col-lg-8 col-md-12">
            <div>
              <p className="fw-bold">Deliver to </p>

              <div className="d-flex gap-4 mb-3">
                <label
                  htmlFor="saved"
                  className="d-flex gap-2 align-items-center"
                >
                  <input
                    type="radio"
                    onChange={() => setWhichAddress("saved")}
                    name="address"
                    id="saved"
                    checked={whichAddress === "saved"}
                  />
                  <span>Use saved address</span>
                </label>

                <label
                  htmlFor="new"
                  className="d-flex gap-2 align-items-center"
                >
                  <input
                    type="radio"
                    onChange={() => setWhichAddress("new")}
                    name="address"
                    id="new"
                    checked={whichAddress === "new"}
                  />
                  <span>Enter a new address</span>
                </label>
              </div>

              <div hidden={whichAddress === "saved" ? false : true}>
                <select
                  className="form-select"
                  onChange={addressHandler}
                  value={orderDetails.shippingAddress}
                >
                  <option value="">Select Address</option>
                  {user &&
                    user.addresses &&
                    user.addresses.map((address, index) => (
                      <option
                        key={index}
                        value={
                          address.label +
                          ", " +
                          address.street +
                          ", " +
                          address.city +
                          ", " +
                          address.state +
                          "-" +
                          address.pincode
                        }
                      >
                        {address.label +
                          ", " +
                          address.street +
                          ", " +
                          address.city +
                          ", " +
                          address.state +
                          "-" +
                          address.pincode}
                      </option>
                    ))}
                </select>

                {orderDetails.shippingAddress !== "" && (
                  <div
                    className="my-4 p-3 d-flex justify-content-between align-items-center"
                    style={{ border: "1px solid black" }}
                  >
                    <div>
                      <p className="mb-0 fw-bold">{user.name}</p>
                      <p className="mb-0 ">{orderDetails.shippingAddress}</p>
                      <p className="mb-0 ">{user.phoneNumber}</p>
                    </div>
                  </div>
                )}
              </div>

              <div hidden={whichAddress === "new" ? false : true}>
                <NewAddressForm
                  orderDetails={orderDetails}
                  setOrderDetails={setOrderDetails}
                  whichAddress={whichAddress}
                  setNewAddress={setNewAddress}
                />
              </div>
            </div>

            <div>
              <p className="fw-bold mt-5 mb-3">Payment Method</p>
              <select className="form-select" onChange={paymentMethodHandler}>
                <option value="">Select Payment Method</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="UPI/QR Code">UPI/QR Code</option>
                <option value="Internet Banking">Internet Banking</option>
                <option value="Cash On Delivery">Cash On Delivery</option>
              </select>
            </div>

            <p className="fw-bold mt-5 mb-3">Review Order Details</p>
            {cartData &&
              cartData.items &&
              cartData.items.map((item) => (
                <div key={item.productId._id}>
                  <div className="row p-2">
                    <div className="col-md-3">
                      <img
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "contain",
                        }}
                        src={item.productId.image}
                        alt=""
                      />
                    </div>
                    <div className="col-md-9">
                      <p className="cartItemName">{item.productId.name}</p>
                      <h5 className="mb-2 fs-6">
                        <span className="me-2">
                          ₹
                          {item.productId.discountPrice
                            ? parseInt(
                                item.productId.discountPrice
                              ).toLocaleString()
                            : parseInt(
                                item.productId.actualPrice
                              ).toLocaleString()}
                        </span>

                        <span className="me-2">&times;</span>
                        <span className="me-2">{item.quantity}</span>
                        <span className="me-2">=</span>
                        <span className="me-2">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </h5>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
          </div>

          <div className="col-lg-3 pb-3 d-flex flex-column gap-2 cart-total  h-100 p-4">
            <h5 className="mb-0 text-danger">Cart Total</h5>
            <hr />
            <div className="d-flex justify-content-between">
              <span>Total Price</span>
              {cartData && cartData.items && (
                <span>₹{cartData.totalPrice.toLocaleString()}</span>
              )}
            </div>
            <div className="d-flex justify-content-between">
              <span>Discount</span>
              <span>- ₹{"1000".toLocaleString()}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Delivery Charges</span>
              <span>₹{"500".toLocaleString()}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold">
              <span>Total Amount</span>
              {cartData && cartData.items && (
                <span>₹{(cartData.totalPrice - 500).toLocaleString()}</span>
              )}
            </div>
            <hr />
            <p>You will save ₹1000 on this order.</p>

            <div className="d-grid">
              <button
                className="btn btn-danger btn-sm mb-2"
                onClick={proceedBtnHandler}
                disabled={
                  orderDetails.shippingAddress === "" ||
                  orderDetails.paymentMethod === ""
                }
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Checkout;
