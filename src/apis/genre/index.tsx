import axios from "axios";

const getAll = async (inputId: any) => {
  const response = await axios.get(
    `http://localhost:8888/gateway/api/v1/get-all-genres?id=${inputId}`
  );
  return response.data;
};
const creatGenre = (newData: AdminCore.User) => {
  return axios.post(
    "http://localhost:8888/gateway/api/v1/create-genre",
    newData
  );
};
const deleteGenre = (genreId: any) => {
  return axios.delete("http://localhost:8888/gateway/api/v1/delete-genre", {
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
const Genre = {
  getAll,
  creatGenre,
  deleteGenre,
  editGenre,
};
export default Genre;
