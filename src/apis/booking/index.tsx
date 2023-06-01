import axios from "axios";

const getAllBookings = async (inputId: any) => {
  const response = await axios.get(
    `http://localhost:8888/gateway/api/v1/get-all-bookings?id=${inputId}`
  );
  return response.data;
};

const getUserBookings = async (inputId: any) => {
  try {
    const response = await axios.get(
      `http://localhost:8888/gateway/api/v1/bookings/${inputId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch user bookings");
  }
};

const creatBooking = (newData: AdminCore.Booking) => {
  return axios.post(
    "http://localhost:8888/gateway/api/v1/booking",
    newData
  );
};

const editBooking = (updateData: any) => {
  return axios.put(
    "http://localhost:8888/gateway/api/v1/edit-booking",
    updateData
  );
};
const Booking = {
  getAllBookings,
  creatBooking,
  editBooking,
  getUserBookings,
  // editRoom,
};
export default Booking;
