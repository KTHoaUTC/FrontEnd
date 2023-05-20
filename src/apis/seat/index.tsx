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

const creatGenre = (newData: AdminCore.Seat) => {
  return axios.post(
    "http://localhost:8888/gateway/api/v1/create-genre",
    newData
  );
};
const deleteSeat = (genreId: any) => {
  return axios.delete("http://localhost:8888/gateway/api/v1/delete-seat", {
    data: {
      id: genreId,
    },
  });
};
const editGenre = (updateData: any) => {
  return axios.put(
    "http://localhost:8888/gateway/api/v1/edit-genre",
    updateData
  );
};
const Seat = {
  getAllTypeseat,
  getAllSeat,
  creatGenre,
  deleteSeat,
  editGenre,
};
export default Seat;
