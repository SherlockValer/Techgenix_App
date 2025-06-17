import { useEffect, useState } from "react";

import useGlobalContext from "../context/globalContext";
import { useParams } from "react-router-dom";
import checkmark from "../assets/checkmart.svg";
import { toast } from "react-toastify";

const OrderSuccess = () => {
  const [orderDetails, setOrderDetails] = useState({});
  const orderIdObj = useParams();

  const { API_URL } = useGlobalContext();

  useEffect(() => {
    fetch(`${API_URL}/orders/${orderIdObj.orderId}`)
      .then((res) => res.json())
      .then((data) => {
        setOrderDetails(data);
      })
      .catch((error) => toast.error(error));
  }, []);

  return (
    <>
      <main className="container my-3">
        {orderDetails && (
          <>
            <h4 className="mb-3 fw-bold fs-5 text-danger">
              <img style={{ width: "1em" }} src={checkmark} alt="" />
              <span className="ms-3">Order Placed Successfully!</span>
            </h4>

            <div
              style={{
                width: "20rem",
                height: "2px",
                backgroundColor: "#dc3545",
              }}
              className="mb-4"
            ></div>

            <div className="row mb-5 gap-4">
              <div className="col-lg-8 col-md-12">
                <div className="d-flex gap-4 flex-wrap justify-content-between align-items-center">
                  <div>
                    <p className="fw-bold mt-2 mb-3">Shipping Address</p>
                    <p>{orderDetails.shippingAddress}</p>
                  </div>

                  <div>
                    <p className="fw-bold mt-2 mb-3">Payment Method</p>
                    <p>{orderDetails.paymentMethod}</p>
                  </div>
                </div>

                <p className="fw-bold mt-4 mb-3">Placed Items</p>
                {orderDetails.orderItems &&
                  orderDetails.orderItems.map((item) => (
                    <div>
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
                <div >
                  <div className="row p-2 justify-content-end fw-bold ">
                    <div className="col-md-3">Subtotal</div>

                    <div className="col-md-9 ">
                      ₹{orderDetails.totalAmount > 0
                        ? orderDetails.totalAmount.toLocaleString()
                        : orderDetails.totalAmount}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default OrderSuccess;
