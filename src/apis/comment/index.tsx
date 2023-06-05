import axios from "axios";

const getAllComments = async (inputId: any) => {
  const response = await axios.get(
    `http://localhost:8888/gateway/api/v1/get-all-comments?id=${inputId}`
  );
  return response.data;
};

const getCommentIdMovie = async (inputId: any) => {
  try {
    const response = await axios.get(
      `http://localhost:8888/gateway/api/v1/comment/${inputId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch user comment");
  }
};
const creatComment = (newData: AdminCore.Comment) => {
  return axios.post(
    "http://localhost:8888/gateway/api/v1/add-comment",
    newData
  );
};
const deleteComment = (genreId: any) => {
  return axios.delete(
    "http://localhost:8888/gateway/api/v1/delete-comment",
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
const Comment = {
  getAllComments,
  creatComment,
  deleteComment,
  editRoom,
  getCommentIdMovie,
};
export default Comment;
