import axios from "axios";

const getAllTypeseat = async (inputId: any) => {
  const response = await axios.get(
    `http://localhost:8888/gateway/api/v1/get-all-typeseats?id=${inputId}`
  );
  return response.data;
};

const getAllSeat = async (seatId: any) => {
  const response = await axios.get(
    `http://localhost:8888/gateway/api/v1/get-all-seats?id=${seatId}`
  );
  return response.data;
};

const creatSeat = (newData: AdminCore.Seat) => {
  return axios.post(
    "http://localhost:8888/gateway/api/v1/create-genre",
    newData
  );
};
const deleteSeat = (seatId: any) => {
  return axios.delete("http://localhost:8888/gateway/api/v1/delete-seat", {
    data: {
      id: seatId,
    },
  });
};
const editSeat = (seatId: string, newStatus: number) => {
  const updateData = {
    id: seatId,
    status: newStatus,
  };

  return axios.put(
    "http://localhost:8888/gateway/api/v1/edit-seat",
    updateData
  );
};
const Seat = {
  getAllTypeseat,
  getAllSeat,
  creatSeat,
  deleteSeat,
  editSeat,
};
export default Seat;
