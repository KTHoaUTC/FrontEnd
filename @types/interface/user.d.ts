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
      image?: string;
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
      status?: string;
      director?: string;
      day_start?: Date;
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
      seat_orders?: any;
      seat_count?: any;
      seat_number?: any;
      name?: string;
      showtime_id?: any | number | undefined;
      seat_type_id?: any | number;
      row?: number;
      status?: boolean | any;
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
      selectedRoom?: any;
    }
    export interface ShowTime {
      [key: string]: any;

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
    export interface Booking {
      movie_id?: any | number;
      theater_id?: any | number;
      show_time_id?: any | number;
      user_id?: any | number;
      seat_id?: any;
      booking_time?: Date;
      booking_status?: string | any;
      total_price?: string;
      payment_status?: boolean;
      id?: number;
      map?: any;
      key?: string;
      updatedAt?: Date;
      time?: string;
      date?: string;
      theater?: string;
      gia_ve?: number;
      phongchieu_id?: number;
      QRCode?: any;
      createdAt?: Date;
    }
    export interface Comment {
      last_name?: any;
      user_id?: any | string;
      movie_id?: any | string;
      comment_text?: string;
      id?: number;
      map?: any;
      key?: string;
      updatedAt?: Date;
      createdAt?: Date;
      commentText?: string | any;
    }
    export interface Ticket {
      booking_id?: any;
      qrCode?: any | string;
      id?: number;
      map?: any;
      key?: string;
      updatedAt?: Date;
      createdAt?: Date;
    }
  }
}

export {};
