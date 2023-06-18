import { Skeleton, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import Room from "@/apis/room";
import Seat from "@/apis/seat";
import ShowTimeApi from "@/apis/showtime";
import styles from "./style.module.scss";
import Movie from "@/apis/movie";

export default function ListSeatStatus({}: any, props: any) {
  const [listSeats, setListSeats] = useState<AdminCore.Seat[] | any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await Seat.getAllSeat("ALL");
      const seats = response.seats || [];
      const mergedSeats: any = {};
      seats.forEach((seat: any) => {
        const showtimeId = seat.showtime_id;
        const row = seat.row;
        const status = seat.status;

        // Lọc danh sách ghế theo trạng thái
        if (status === 1) {
          if (!mergedSeats[showtimeId]) {
            mergedSeats[showtimeId] = {
              showtimeId,
              seatCount: 1,
              seatOrders: [row],
            };
          } else {
            mergedSeats[showtimeId].seatCount += 1;
            mergedSeats[showtimeId].seatOrders.push(row);
          }
        }
      });

      const transformedSeats = Object.values(mergedSeats).map(
        (mergedSeat: any) => ({
          showtime_id: mergedSeat.showtimeId,
          seat_count: mergedSeat.seatCount,
          seat_orders: mergedSeat.seatOrders.join(", "),
        })
      );

      setListSeats(transformedSeats);
    } catch (error) {
      console.log("Error fetching genres:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const [roomList, setRoomList] = useState<AdminCore.Room[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const result = await Room.getAllRooms("ALL");
        setRoomList(result.phongchieus);
      } catch (e) {}
    })();
  }, []);
  const [movieList, setMovieList] = useState<AdminCore.Movie[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const result = await Movie.getAll("ALL");
        setMovieList(result.movies);
      } catch (e) {}
    })();
  }, []);
  const [showTimeList, setShowTimeList] = useState<AdminCore.ShowTime[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const result = await ShowTimeApi.getAllShowTimes("ALL");
        setShowTimeList(result.showtimes);
      } catch (e) {}
    })();
  }, []);

  const getRoomIdByShowtimeId = (showtimeId: any) => {
    const showtime = showTimeList.find((show) => show.id === showtimeId);
    return showtime ? showtime.phongchieu_id : "";
  };

  const getRoomIdByShowtimeMovie = (movieId: any) => {
    const showtime = showTimeList.find((show) => show.id === movieId);
    return showtime ? showtime.movie_id : "";
  };
  const getSeatCountByMovieId = (nameId: any) => {
    const room = movieList.find((room) => room.id === nameId);
    return room ? room.title : 0;
  };
  const getSeatCountByRoomId = (seatId: any) => {
    const room = roomList.find((room) => room.id === seatId);
    return room ? room.sum_seat : 0;
  };
  const getNameByRoomId = (roomId: any) => {
    const room = roomList.find((room) => room.id === roomId);
    return room ? room.name : 0;
  };
  const columns: ColumnsType<AdminCore.Seat> = [
    {
      title: "Lịch chiếu",
      dataIndex: "showtime_id",
      key: "showtime_id",
      align: "center",
    },
    {
      title: "Phòng chiếu",
      dataIndex: "showtime_id",
      key: "room",
      align: "center",
      render: (showtimeId, record) => {
        const roomId = getRoomIdByShowtimeId(showtimeId);
        const seatCount = getSeatCountByRoomId(roomId);
        const roomName = getNameByRoomId(roomId);
        console.log("showtimeId", showtimeId);

        return (
          <span>
            {roomName} - {seatCount} ghế
          </span>
        );
      },
    },
    {
      title: "Phim",
      dataIndex: "showtime_id",
      key: "movie",
      align: "center",
      render: (showtimeId) => {
        const roomId = getRoomIdByShowtimeMovie(showtimeId);
        const seatCount = getSeatCountByMovieId(roomId);

        return <span>{seatCount}</span>;
      },
    },

    {
      title: "Tổng Ghế Đã Bán",
      dataIndex: "seat_count",
      key: "seat_count",
      align: "center",
    },
    {
      title: "Danh Sách Ghế",
      dataIndex: "seat_orders",
      key: "seat_orders",
      align: "center",
    },

    {
      title: "Trạng Thái",
      align: "center",
      render: (showtimeId,record) => {
        const seatCount = record.seat_count;
        const roomId = getRoomIdByShowtimeId(showtimeId.showtime_id);
        const seatCountSum = getSeatCountByRoomId(roomId);
        console.log("showtimeId", showtimeId.showtime_id);
        console.log("seatCount", seatCount);
        console.log("seatCountSum", seatCountSum);

        if (seatCountSum === seatCount) {
          return <Tag color="#f50">Đã bán hết</Tag>;
        } else {
          return <Tag color="#2db7f5">Còn ghế</Tag>;
        }
      },
    },
  ];

  if (isLoading) {
    return <Skeleton active />;
  }

  return (
    <>
      <Table
        bordered
        className={styles.table_list}
        columns={columns}
        dataSource={listSeats}
      />
    </>
  );
}
