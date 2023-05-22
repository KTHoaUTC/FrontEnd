import axios from "axios";

const getAll = async (inputId: any) => {
  const response = await axios.get(
    `http://localhost:8888/gateway/api/v1/get-all-users?id=${inputId}`
  );
  return response.data;
};

const getAllAuth = async (inputId: any) => {
  const response = await axios.get(
    `http://localhost:8888/gateway/api/v1/get-all-auths?id=${inputId}`
  );
  return response.data;
};


const creatUser = (newData: AdminCore.User) => {
  return axios.post(
    "http://localhost:8888/gateway/api/v1/create-user",
    newData
  );
};
const deleteUser = (userId: any) => {
  return axios.delete("http://localhost:8888/gateway/api/v1/delete-user", {
    data: {
      id: userId,
    },
  });
};
const editUser = (updateData: any) => {
  return axios.put(
    "http://localhost:8888/gateway/api/v1/edit-user",
    updateData
  );
};
const User = {
  getAllAuth,
  getAll,
  creatUser,
  deleteUser,
  editUser,
};
export default User;
