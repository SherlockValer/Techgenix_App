import { useCart } from "../hooks/useCart.js";
import { discountPercentage } from "../utils/discountPercentageCalc";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  // Fetch Cart details
  const {
    cart,
    cartLoading,
    cartError,
    cartCount,
    quantityChangeHandler,
    deleteItemHandler,
  } = useCart();

  const shoppingButtonHandler = () => {
    navigate("/");
  };

  return (
    <>
      {cartLoading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="loader"></div>
        </div>
      )}

      {!cartLoading && cart && (
        <>
          <main className="container my-3">
            <h4 className="mb-3 fw-bold fs-5 text-danger mb-3">
              My Cart ({cartCount})
            </h4>
            <div
              style={{
                width: "12rem",
                height: "2px",
                backgroundColor: "#dc3545",
              }}
              className="mb-4"
            ></div>
            {cart?.items && cart.items.length != 0 ? (
              <>
                <div className="row mb-5 gap-4">
                  <div className="col-lg-8 col-md-12">
                    <div className="d-none d-md-block">
                      <div
                        className="row p-2 column-gap-4 text-uppercase text-muted"
                        style={{ fontSize: "0.8rem" }}
                      >
                        <div className="col-md-6">product details</div>
                        <div className="col-md-3">quantity</div>
                        <div className="col-md-1">price</div>
                        <hr className="mt-3" />
                      </div>
                    </div>

                    {cart?.items?.map((item) => (
                      <div>
                        <div className="row p-2 gap-2 justify-content-center position-relative">
                          <div className="col-2 col-md-2 d-flex justify-content-center align-items-center">
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
                          {/*  */}
                          <div className="row col-8 col-md-8">
                            <div className="col-12 col-md-6">
                              <p className="">{item.productId.name}</p>
                              <h5 className="mb-2 ">
                                ₹
                                {item.productId.discountPrice
                                  ? parseInt(
                                      item.productId.discountPrice
                                    ).toLocaleString()
                                  : parseInt(
                                      item.productId.actualPrice
                                    ).toLocaleString()}
                                <span className="MRP ms-1">
                                  ₹
                                  {item.productId.actualPrice
                                    ? parseInt(
                                        item.productId.actualPrice
                                      ).toLocaleString()
                                    : "Product Unavailable"}
                                </span>
                              </h5>
                              <p className="mb-1">
                                <span className="text-success fw-medium">
                                  {item.productId.discountPrice
                                    ? discountPercentage(
                                        item.productId.actualPrice,
                                        item.productId.discountPrice
                                      )
                                    : null}
                                  % off
                                </span>
                              </p>
                              <p
                                className=" text-muted"
                                style={{
                                  textDecoration: "underline",
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  deleteItemHandler(
                                    item.productId._id,
                                    item.price,
                                    item.quantity
                                  )
                                }
                              >
                                Remove
                              </p>
                            </div>

                            {/* Item Quantity */}
                            <div className="col-12 col-md-3 d-flex justify-content-start align-items-center">
                              <p className=" m-0">
                                <span className="quantity-btn-span">
                                  <button
                                    onClick={() =>
                                      quantityChangeHandler(
                                        item.productId._id,
                                        "decrement"
                                      )
                                    }
                                    disabled={item.quantity > 1 ? false : true}
                                    className="btn btn-sm btn-danger"
                                  >
                                    -
                                  </button>

                                  <input
                                    type="number"
                                    min={1}
                                    max={100}
                                    value={item.quantity}
                                  />

                                  <button
                                    onClick={() =>
                                      quantityChangeHandler(
                                        item.productId._id,
                                        "increment"
                                      )
                                    }
                                    className="btn btn-sm btn-danger"
                                  >
                                    +
                                  </button>
                                </span>
                              </p>
                            </div>
                          </div>

                          {/*  */}
                          <div className="d-none col-md-2 d-md-flex justify-content-start align-items-center ">
                            <p className="m-0">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <hr />
                      </div>
                    ))}
                  </div>

                  <div className="col-lg-3 pb-3 d-flex flex-column gap-2 cart-total h-100 p-4">
                    <h5 className="mb-0 text-danger">Cart Total</h5>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <span>Total Price</span>
                      {cart?.items && (
                        <span>₹{cart.totalPrice.toLocaleString()}</span>
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
                      {cart?.items && (
                        <span>₹{(cart.totalPrice - 500).toLocaleString()}</span>
                      )}
                    </div>
                    <hr />
                    <p>You will save ₹1000 on this order.</p>
                    <Link to="/checkout">
                      <div className="d-grid">
                        <button className="btn btn-danger btn-sm mb-2">
                          Proceed to Checkout
                        </button>
                      </div>
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div style={{ width: "100vw", height: "50vh" }}>
                  <p>Your Cart is Empty</p>
                  <button
                    onClick={shoppingButtonHandler}
                    className="btn btn-outline-danger btn-sm mb-2"
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </main>
        </>
      )}
    </>
  );
};

export default Cart;
