import axios from "axios";

const getAllBookings = async (inputId: any) => {
  const response = await axios.get(
    `http://localhost:8888/gateway/api/v1/get-all-bookings?id=${inputId}`
  );
  return response.data;
};

const creatBooking = (newData: AdminCore.Booking) => {
  return axios.post(
    "http://localhost:8888/gateway/api/v1/booking",
    newData
  );
};
// const deleteRoom = (genreId: any) => {
//   return axios.delete(
//     "http://localhost:8888/gateway/api/v1/delete-phongchieu",
//     {
//       data: {
//         id: genreId,
//       },
//     }
//   );
// };
// const editRoom = (updateData: any) => {
//   return axios.put(
//     "http://localhost:8888/gateway/api/v1/edit-phongchieu",
//     updateData
//   );
// };
const Booking = {
  getAllBookings,
  creatBooking,
  // deleteRoom,
  // editRoom,
};
export default Booking;
