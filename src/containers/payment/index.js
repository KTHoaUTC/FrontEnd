// // import React from "react";
// // import axios from "axios";

// import { PayPalButtons } from "@paypal/react-paypal-js";

// // const PaymentConfirmation = () => {
// //   const handlePayment = async () => {
// //     try {
// //       const response = await axios.post(
// //         "http://localhost:8888/gateway/api/v1/create-payment"
// //       );
// //       const approvalUrl = response.data.approvalUrl;
// //       window.location.replace(approvalUrl);
// //       console.log('paypal', approvalUrl)
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //  return (
// //     <div>
// //       <h1>Thanh toán PayPal</h1>
// //       <button onClick={handlePayment}>Thanh toán</button>
// //     </div>
// //   );};

// // export default PaymentConfirmation;
// // import { useState, useEffect } from "react";
// // import {
// //   PayPalScriptProvider,
// //   PayPalButtons,
// //   usePayPalScriptReducer,
// // } from "@paypal/react-paypal-js";
// // // import { CLIENT_ID } from "../Config/Config";

// // const PaymentConfirmation = () => {
// //   const [show, setShow] = useState(false);
// //   const [success, setSuccess] = useState(false);
// //   const [ErrorMessage, setErrorMessage] = useState("");
// //   const [orderID, setOrderID] = useState(false);
// //   const CLIENT_ID =
// //     "AQ6VkaZwcTK8iaDgLcU3TeBWoxheOd-xGZ-wxKZE2KOiBLGeLGnhxE2UIf3m0lUjwkKbvTcd6_f8FDz_"; // Thay thế bằng Client ID của PayPal của bạn
// //   // creates a paypal order
// //   const createOrder = (data: any, actions: any) => {
// //     return actions.order
// //       .create({
// //         purchase_units: [
// //           {
// //             description: "Sunflower",
// //             amount: {
// //               currency_code: "USD",
// //               value: 20,
// //             },
// //           },
// //         ],
// //       })
// //       .then((orderID: any) => {
// //         setOrderID(orderID);
// //         return orderID;
// //       });
// //   };

// //   // check Approval
// //   const onApprove = (data: any, actions: any) => {
// //     return actions.order.capture().then(function (details: any) {
// //       const { payer } = details;
// //       setSuccess(true);
// //     });
// //   };

// //   //capture likely error
// //   const onError = (data: any, actions: any) => {
// //     setErrorMessage("An Error occured with your payment ");
// //   };

// //   useEffect(() => {
// //     if (success) {
// //       alert("Payment successful!!");
// //       console.log("Order successful. Your order id is--", orderID);
// //     }
// //   }, [success]);

// //   return (
// //     <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
// //       <div>
// //         <div className="wrapper">
// //           <div className="product-img">
// //             <img
// //               src="https://cdn.pixabay.com/photo/2021/08/15/06/54/sunflower-6546993_1280.jpg"
// //               alt="SunFlower"
// //               height="320"
// //               width="300"
// //             />
// //           </div>
// //           <div className="product-info">
// //             <div className="product-text">
// //               <h1>Sunflower</h1>
// //             </div>
// //             <div className="product-price-btn">
// //               <p>$20</p>
// //               <br />
// //               <button
// //                 className="buy-btn"
// //                 type="submit"
// //                 onClick={() => setShow(true)}
// //               >
// //                 Buy now
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //         <br />
// //         {show ? (
// //           <PayPalButtons
// //             style={{ layout: "vertical" }}
// //             createOrder={createOrder}
// //             onApprove={onApprove}
// //           />
// //         ) : null}
// //       </div>
// //     </PayPalScriptProvider>
// //   );
// // };

// // export default PaymentConfirmation;
// import { useState, useEffect } from "react";
// import {
//   PayPalScriptProvider,
//   PayPalButtons,
//   ReactPayPalScriptOptions,
// } from "@paypal/react-paypal-js";
// // import React from "react";
// // import ReactDOM from "react-dom";
// // const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });
// const PaymentConfirmation = () => {
//   const createOrder = (data: any, actions:any) => {
//     // Order is created on the server and the order id is returned
//     return fetch("/my-server/create-paypal-order", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       // use the "body" param to optionally pass additional order information
//       // like product skus and quantities
//       body: JSON.stringify({
//         product: [
//           {
//             description: "hello",
//             cost:"20.00"
//           },
//         ],
//       }),
//     })
//       .then((response) => response.json())
//       .then((order) => order.id);
//   };
//   const onApprove = (data: any, actions: any) => {
//     // Order is captured on the server and the response is returned to the browser
//     return fetch("/my-server/capture-paypal-order", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         orderID: data.orderID,
//       }),
//     }).then((response) => response.json());
//   };
//   return (
//     <PayPalButtons
//       createOrder={(data: any, actions: any) => createOrder(data, actions)}
//       onApprove={(data: any, actions: any) => onApprove(data, actions)}
//     />
//   );
// };

// export default PaymentConfirmation;
import { CLIENT_ID } from "../../config/config";
import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Checkout = () => {
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);

  // creates a paypal order
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Sunflower",
            amount: {
              currency_code: "USD",
              value: 20,
            },
          },
        ],
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setSuccess(true);
    });
  };

  //capture likely error
  const onError = (data, actions) => {
    setErrorMessage("An Error occured with your payment ");
  };

  useEffect(() => {
    if (success) {
      alert("Payment successful!!");
      console.log("Order successful . Your order id is--", orderID);
    }
  }, [success]);

  return (
    <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
      <div>
        <div className="wrapper">
          <div className="product-img">
            <img
              src="https://cdn.pixabay.com/photo/2021/08/15/06/54/sunflower-6546993_1280.jpg"
              alt="SunFlower"
              height="320"
              width="300"
            />
          </div>
          <div className="product-info">
            <div className="product-text">
              <h1>Sunflower</h1>
            </div>
            <div className="product-price-btn">
              <p>$20</p>
              <br></br>
              <button
                className="buy-btn"
                type="submit"
                onClick={() => setShow(true)}
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
        <br></br>
        {show ? (
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={createOrder}
            onApprove={onApprove}
          />
        ) : null}
      </div>
    </PayPalScriptProvider>
  );
};

export default Checkout;