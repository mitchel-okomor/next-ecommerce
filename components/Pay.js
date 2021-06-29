import React, { useContext } from "react";
import { PaystackConsumer, usePaystackPayment } from "react-paystack";
import { postData } from "../utils/fetchData";

function Pay({ total, address, mobile, state, dispatch, cart, auth }) {
  const config = {
    reference: new Date().getTime(),
    email: "uslhr@example.com",
    amount: 20000,
    publicKey: "pk_test_6218646e813546a27bc96b74c7ed71166de79471",
  };

  // you can call this function anything
  const handleSuccess = async (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    postData(
      "order",
      {
        address,
        mobile,
        cart,
        total,
      },
      auth.token
    ).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });

      dispatch({ type: "ADD_CART", payload: [] });
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  // you can call this function anything
  const handleClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  // const payment_success = (reference) => {
  //   console.log(reference);
  //   const url = SERVER_URL + "/api/verify-payment";
  //   const data = {
  //     ref: reference,
  //     orderId: location.state.orderId,
  //   };
  //   axios
  //     .post(url, data)
  //     .then((res) => {
  //       console.log(res);
  //       history.push("/profile");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   console.log(reference);
  // };

  const initializePayment = usePaystackPayment(config);

  return (
    <div className="pay">
      <div className="card text-center">
        {/* <div className="card-header ">
          <i class="fa fa-credit-card mr-2" aria-hidden="true"></i>
          Card Payment
        </div> */}
        <div className="card-body">
          <button
            className="btn btn-success"
            onClick={() => initializePayment(handleSuccess, handleClose)}
          >
            Pay with Paystack
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pay;
