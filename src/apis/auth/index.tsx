import axios from "axios";

export default class User {
  static async getAll(inputId:any) {
    const response = await axios.get(
      `http://localhost:8888/gateway/api/v1/get-all-users?id=${inputId}`
    );
    return response.data;
  }
}
