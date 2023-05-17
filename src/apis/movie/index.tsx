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
const Movie = {
  getAll,
  createMovie,
  deleteGenre,
  editGenre,
};
export default Movie;
