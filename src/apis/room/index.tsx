import axios from "axios";

const getAllRooms = async (inputId: any) => {
  const response = await axios.get(
    `http://localhost:8888/gateway/api/v1/get-all-phongchieus?id=${inputId}`
  );
  return response.data;
};

const creatRoom = (newData: AdminCore.Room) => {
  return axios.post(
    "http://localhost:8888/gateway/api/v1/create-phongchieu",
    newData
  );
};
const deleteRoom = (genreId: any) => {
  return axios.delete(
    "http://localhost:8888/gateway/api/v1/delete-phongchieu",
    {
      data: {
        id: genreId,
      },
    }
  );
};
const editRoom = (updateData: any) => {
  return axios.put(
    "http://localhost:8888/gateway/api/v1/edit-phongchieu",
    updateData
  );
};
const Room = {
  getAllRooms,
  creatRoom,
  deleteRoom,
  editRoom,
};
export default Room;
