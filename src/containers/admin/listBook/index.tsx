import User from "@/apis/auth";
import Booking from "@/apis/booking";
import Movie from "@/apis/movie";
import Theater from "@/apis/rap";
import { Skeleton, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import moment from "moment";
import { useEffect, useState } from "react";
import styles from "./style.module.scss";

export default function ListBooking({}: any, props: any) {
  const [listBooking, setBooking] = useState<AdminCore.Booking[] | any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await Booking.getAllBookings("ALL");
        setBooking(
          response.bookings?.map(
            (booking: {
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
              createdAt?: Date;
            }) => ({
              key: booking.id,
              id: booking.id,
              user_id: booking.user_id,
              movie_id: booking.movie_id,
              total_price: booking.total_price,
              booking_status: booking.booking_status,
              theater: booking.theater,
              theater_id: booking.theater_id,
              phongchieu_id: booking.phongchieu_id,
              createdAt:booking.createdAt,
            })
          )
        );
        console.log("testlsit", listUsers);
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  const [listTheaters, setListTheaters] = useState<AdminCore.Rap[] | any>([]);

  useEffect(() => {
    fetchTheaters();
  }, []);

  const fetchTheaters = async () => {
    try {
      const response = await Theater.getAll("ALL");
      setListTheaters(response.theaters);
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };


  const [listUsers, setListUser] = useState<AdminCore.User[] | any>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await User.getAllAuth("ALL");
        setListUser(response.users);
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
    const [listMovies, setListMovies] = useState<AdminCore.Movie[] | any>([]);

    useEffect(() => {
      (async () => {
        try {
          const response = await Movie.getAll("ALL");
          setListMovies(response.movies);
        } catch (e) {
        } finally {
          setIsLoading(false);
        }
      })();
    }, []);


  const formattedDate = (date: Date) => {
    return moment(date).format("DD/MM/YYYY");
  };
  const columns: ColumnsType<AdminCore.Booking> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "user_id",
      key: "user_id",
      align: "center",
      render: (usersId) => {
        const emailUser = listUsers.find((user: any) => user.id === usersId);
        return emailUser ? emailUser.email : null;
      },
    },
    {
      title: "Phim",
      dataIndex: "movie_id",
      key: "movie_id",
      align: "center",
      render: (moviesId) => {
        const nameMovie = listMovies.find((user: any) => user.id === moviesId);
        return nameMovie ? nameMovie.title : null;
      },
    },
    {
      title: "Rạp",
      dataIndex: "theater_id",
      key: "theater_id",
      render: (theaterId) => {
        const theater = listTheaters.find(
          (theater: any) => theater.id === theaterId
        );
        return theater ? theater.name : null;
      },
    },

    {
      title: "Tổng Tiền",
      dataIndex: "total_price",
      key: "total_price",
      align: "center",
    },
    {
      title: "Ngày lập hóa đơn",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (date: Date) => formattedDate(date),
    },
  ];
  if (isLoading) {
    return <Skeleton active> </Skeleton>;
  }
  return (
    <>
      <h1 className={styles.title}> Hóa Đơn Đặt Vé</h1>

      <Table
        bordered
        className={styles.table_list}
        columns={columns}
        dataSource={listBooking}
      />
    </>
  );
}
