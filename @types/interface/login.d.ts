declare global {
  export namespace LoginCore {
    export interface User {
      email: string;
      RoleId: string;
    }
    export interface UserData {
      errCode: number;
      errMessage: string;
      user: User;
    }
    export interface LoginResponse {
      errCode: number;
      message: string;
      userData: UserData;
    }
  }
}
export {};
