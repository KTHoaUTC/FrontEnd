import axios from "axios";

const getAllShowTimes = async (inputId: any) => {
  const response = await axios.get(
    `http://localhost:8888/gateway/api/v1/get-all-showtimes?id=${inputId}`
  );
  return response.data;
};

const creatShowTime = (newData: AdminCore.ShowTime) => {
  return axios.post(
    "http://localhost:8888/gateway/api/v1/create-showtime",
    newData
  );
};
const deleteShowTime = (genreId: any) => {
  return axios.delete("http://localhost:8888/gateway/api/v1/delete-showtime", {
    data: {
      id: genreId,
    },
  });
};
const editShowTime = (updateData: any) => {
  return axios.put(
    "http://localhost:8888/gateway/api/v1/edit-showtime",
    updateData
  );
};
const ShowTimeApi = {
  getAllShowTimes,
  creatShowTime,
  deleteShowTime,
  editShowTime,
};
export default ShowTimeApi;
