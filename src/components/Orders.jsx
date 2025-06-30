import { useState, useEffect } from "react";
import useGlobalContext from "../context/globalContext";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const { API_URL } = useGlobalContext();

  useEffect(() => {
    setLoading(true);

    fetch(`${API_URL}/67dce53d2b5635c333cd19df/orders`)
      .then((res) => res.json())
      .then((data) => {
        const reversed = data.reverse();
        setOrders(reversed);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mb-5">
      {loading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <div className="loader"></div>
        </div>
      )}

      {!loading && orders?.length !==0 && (
        <>
          <p className="pb-3 fw-bold text-danger fs-5">
            Orders ({orders?.length})
          </p>
          {orders ? (
            <div className="d-flex flex-column gap-4">
              {orders.map((order) => (
                <div className="border border-danger" key={order._id}>
                  <div className="d-flex flex-wrap justify-content-between bg-danger text-white p-4">
                    <div className=" d-flex flex-column align-items-start">
                      <p>
                        <strong>Order Id</strong>
                      </p>
                      <p>{order._id}</p>
                    </div>
                    <div className="d-flex flex-column align-items-start">
                      <p>
                        <strong>Status</strong>
                      </p>
                      <p>{order.status}</p>
                    </div>
                    <div className="d-flex flex-column align-items-start">
                      <p>
                        <strong>Payment Method</strong>
                      </p>
                      <p>{order.paymentMethod}</p>
                    </div>
                    <div className="d-flex flex-column align-items-start">
                      <p>
                        <strong>Total Payment</strong>
                      </p>
                      <p>{order.totalAmount.toLocaleString()}</p>
                    </div>
                  </div>

                  {order.orderItems.map((item) => (
                    <div className="px-4 pt-4" key={item.productId._id}>
                      <div className="row gap-2 p-2">
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
                        <div className="col-md-8">
                          <p className="fw-semibold">{item.productId.name}</p>
                          <div className="mb-2 fs-6 text-muted">
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
                          </div>
                        </div>
                      </div>
                      <hr />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <>
              <p>No Orders found.</p>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;
