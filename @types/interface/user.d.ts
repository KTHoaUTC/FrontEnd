declare global {
  export namespace AdminCore {
    export interface User {
      email?: string;
      first_name?: string;
      last_name?: string;
      pass_word?: string;
      gender?: boolean;
      address?: string;
      phone_number?: number;
      RoleId?: string;
      rePassword?: string;
      image?: any;
      columns?: any;
      id?: number;
      map?: any;
      key?: string;
      avatar?:any
    }
    export interface Genre {
      name?: string;
      id?: number;
      map?: any;
      key?: string;
      updatedAt?:Date
    }
  }
}

export {};
