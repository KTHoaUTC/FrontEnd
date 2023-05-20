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
      avatar?: any;
    }
    export interface Genre {
      name?: string;
      id?: number;
      map?: any;
      key?: string;
      updatedAt?: Date;
    }
    export interface Movie {
      title?: string;
      genres_id?: any;
      description?: string;
      image_url?: string;
      countries?: string;
      poster_url?: string;
      trailer_url?: string;
      release_date?: string;
      run_time?: number | any;
      id?: number;
      map?: any;
      key?: string;
      updatedAt?: Date;
    }
    export interface Rap {
      name?: string;
      description?: string;
      image?: string;
      address?: string;
      id?: string |undefined |any;
      map?: any;
      key?: string;
      updatedAt?: Date;
    }
  }
}

export {};
