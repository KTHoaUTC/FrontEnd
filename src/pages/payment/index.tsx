import Checkout from "@/containers/payment";
import PaymentConfirmation from "@/containers/payment";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from "react";
const Home: React.FC = () => {


  const initialOptions = {
    clientId:
      "Aakar9C3M9Ymh5sAgODruyI1N65w5JGZuzoLFeLMkSkeTQkjJkSi_QjtVvsEFpq45tFQLUOJiLxpFLLR",
    currency: "USD",
    intent: "capture",
  };


  return (
    <>
      <PayPalScriptProvider options={initialOptions}>
        <Checkout></Checkout>
      </PayPalScriptProvider>
    </>
  );
};

export default Home;
