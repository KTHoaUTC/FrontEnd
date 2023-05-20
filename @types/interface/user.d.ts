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
      id?: string | undefined | any;
      map?: any;
      key?: string;
      updatedAt?: Date;
    }

    export interface TypeSeat {
      name?: string;
      id?: number;
      map?: any;
      key?: string;
      updatedAt?: Date;
    }
    export interface Seat {
      name?: string;
      phongchieu_id?: any | number;
      seat_type_id?: any | number;
      row?: number;
      status: ?boolean;
      id?: number;
      map?: any;
      key?: string;
      updatedAt?: Date;
    }
    export interface Room {
      name?: string;
      theater_id?: any | number;
      seat_id?: any | number;
      sum_seat?: any | number;
      id?: number;
      map?: any;
      key?: string;
      updatedAt?: Date;
    }
    export interface ShowTime {
      movie_id?: any | number;
      theater_id?: any | number;
      phongchieu_id?: any | number;
      ngay_chieu?: Date;
      gio_chieu?: string | any;
      money?: string;
      id?: number;
      map?: any;
      key?: string;
      updatedAt?: Date;
    }
  }
}

export {};
