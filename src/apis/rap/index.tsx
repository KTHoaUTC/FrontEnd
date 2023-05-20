import axios from "axios";

const getAll = async (inputId: any) => {
  const response = await axios.get(
    `http://localhost:8888/gateway/api/v1/get-all-theaters?id=${inputId}`
  );
  return response.data;
};
const createTheater = (newData: AdminCore.Rap) => {
  return axios.post(
    "http://localhost:8888/gateway/api/v1/create-theater",
    newData
  );
};
const deleteTheater = (movieId: any) => {
  return axios.delete("http://localhost:8888/gateway/api/v1/delete-theater", {
    data: {
      id: movieId,
    },
  });
};
const editTheater = (updateData: any) => {
  return axios.put(
    "http://localhost:8888/gateway/api/v1/edit-theater",
    updateData
  );
};
const Theater = {
  getAll,
  createTheater,
  deleteTheater,
  editTheater,
};
export default Theater;
