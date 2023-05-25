import axios from "axios";

const getAll = async (inputId: any) => {
  const response = await axios.get(
    `http://localhost:8888/gateway/api/v1/get-all-movies?id=${inputId}`
  );
  return response.data;
};
const createMovie = (newData: AdminCore.Movie) => {
  return axios.post(
    "http://localhost:8888/gateway/api/v1/create-movie",
    newData
  );
};
const deleteMoive = (movieId: any) => {
  return axios.delete("http://localhost:8888/gateway/api/v1/delete-movie", {
    data: {
      id: movieId,
    },
  });
};
const editMovie = (updateData: any) => {
  return axios.put(
    "http://localhost:8888/gateway/api/v1/edit-movie",
    updateData
  );
};
const searchAll = async (keyTitle: any) => {
  const response = await axios.get(
    `http://localhost:8888/gateway/api/v1/searcher?key=${keyTitle}`
  );
  return response.data;
};
const Movie = {
  getAll,
  createMovie,
  deleteMoive,
  editMovie,
  searchAll,
};
export default Movie;
