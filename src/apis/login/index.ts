import axios from "axios";

export default class AuthApi {
  static async signIn({
    input,
  }: {
    input: { email: string; pass_word: string };
  }) {
    const response = await axios.post(
      "http://localhost:8888/gateway/api/v1/login",
      {
        email: input.email,
        pass_word: input.pass_word,
      }
    );
    return response.data;
  }
}
export const saveRoleId = (roleId: any) => ({
  type: "SAVE_ROLE_ID",
  payload: roleId,
});
