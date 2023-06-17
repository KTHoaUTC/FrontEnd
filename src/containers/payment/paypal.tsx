import React from "react";
import axios from "axios";

const PaymentPage = () => {
  const handlePayment = async () => {
    try {
      const response = await axios.post("/api/paypal/create-payment");
      const { approvalUrl } = response.data;
      window.location.replace(approvalUrl);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* Hiển thị thông tin đơn hàng */}
      <button onClick={handlePayment}>Thanh toán PayPal</button>
    </div>
  );
};

export default PaymentPage;
