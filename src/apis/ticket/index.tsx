import axios from "axios";

const getAllTickets = async (inputId: any) => {
  const response = await axios.get(
    `http://localhost:8888/gateway/api/v1/get-all-tickets?id=${inputId}`
  );
  return response.data;
};



const createTicket = (newData: AdminCore.Ticket) => {
  return axios.post("http://localhost:8888/gateway/api/v1/add-ticket", newData);
};

const editBooking = (updateData: any) => {
  return axios.put(
    "http://localhost:8888/gateway/api/v1/edit-booking",
    updateData
  );
};
const Ticket = {
  getAllTickets,
  createTicket,
  editBooking,
  // editRoom,
};
export default Ticket;
