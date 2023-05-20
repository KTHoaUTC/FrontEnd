// import ShowTime from "@/apis/showtime";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Skeleton, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

import styles from "./style.module.scss";
import Room from "@/apis/room";
import ShowTimeApi from "@/apis/showtime";
import Theater from "@/apis/rap";
import ModalAddShowTime from "./createTheater";
import Movie from "@/apis/movie";
import moment from "moment";
// import ModalAddRoom from "./createTheater";

export default function ShowTime({}: any, props: any) {
  const [listTheaters, setListTheaters] = useState<AdminCore.ShowTime[] | any>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTheaters();
  }, []);

  const fetchTheaters = async () => {
    try {
      const response = await ShowTimeApi.getAllShowTimes("ALL");
      setListTheaters(
        response.showtimes?.map(
          (theater: {
            key: string;
            id: string;
            movie_id: number | any;
            theater_id: number | any;
            phongchieu_id: number | any;
            ngay_chieu: Date;
            gio_chieu: string | any;
            money: string;
          }) => ({
            key: theater.id,
            id: theater.id,
            movie_id: theater.movie_id,
            theater_id: theater.theater_id,
            phongchieu_id: theater.phongchieu_id,
            ngay_chieu: theater.ngay_chieu,
            gio_chieu: theater.gio_chieu,
            money: theater.money,
          })
        )
      );
      console.log(listTheaters);
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  //movie
  const [movieList, setMovieList] = useState<AdminCore.Movie[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await Movie.getAll("ALL");
        setMovieList(response.movies);
      } catch (e) {}
    })();
  }, []);

  //rap
  const [theaterList, setTheaterList] = useState<AdminCore.Rap[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await Theater.getAll("ALL");
        setTheaterList(response.theaters);
        console.log("dsdsdata", theaterList);
      } catch (e) {}
    })();
  }, []);

  //phong chieu
  const [roomList, setRoomList] = useState<AdminCore.Room[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await Room.getAllRooms("ALL");
        setRoomList(response.phongchieus);
      } catch (e) {}
    })();
  }, []);

  const handleDelete = async (id: number) => {
    await Room.deleteRoom(id);
    setListTheaters(
      listTheaters.filter((item: { id: number }) => item.id !== id)
    );
  };
  const formattedDate = (date: Date) => {
    return moment(date).format("DD/MM/YYYY");
  };
  const columns: ColumnsType<AdminCore.Rap> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: "5%",
    },
    {
      title: "Tên Phim",
      dataIndex: "movie_id",
      key: "movie_id",
      width: "15%",
      render: (movieId) => {
        const movie = movieList.find((movie) => movie.id === movieId);
        return movie ? movie.title : null;
      },
    },
    {
      title: "Rạp Chiếu",
      align: "center",
      dataIndex: "theater_id",
      key: "theater_id",
      render: (theaterId) => {
        const theater = theaterList.find((theater) => theater.id === theaterId);
        return theater ? theater.name : null;
      },
    },
    {
      title: "Phòng Chiếu",
      dataIndex: "phongchieu_id",
      key: "phongchieu_id",
      // width: "40%",
      render: (roomId) => {
        const room = roomList.find((room) => room.id === roomId);
        return room ? room.name : null;
      },
    },

    {
      title: "Ngày Chiếu",
      dataIndex: "ngay_chieu",
      key: "ngay_chieu",
      // width: "25%",
      align: "center",
      render: (date: Date) => formattedDate(date),
    },
    {
      title: "Giờ Chiếu",
      dataIndex: "gio_chieu",
      align: "center",
      key: "gio_chieu",
      render: (time) => moment(time).format("HH:mm"),
    },
    {
      title: "Giá Vé",
      dataIndex: "money",
      key: "money",
      // width: "25%",
    },

    {
      title: "Thao Tác",
      key: "",
      align: "center",
      width: "10%",
      render: (_, record: any) => (
        <Space size="middle">
          <a>
            {/* <ModalEditTheater
              onSuccess={fetchTheaters}
              currentTheater={null}
            ></ModalEditTheater> */}
          </a>
          <Popconfirm
            title="Bạn chắc chắn muốn xóa?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button
              className={styles.btn_delete}
              style={{ float: "right", margin: "0px" }}
              type="primary"
            >
              <DeleteOutlined className={styles.icon} />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  if (isLoading) {
    return <Skeleton active> </Skeleton>;
  }
  return (
    <>
      <h1 className={styles.title}>Danh Sách Lịch Chiếu Phim</h1>

      <ModalAddShowTime onSuccess={fetchTheaters}></ModalAddShowTime>
      <Table
        bordered
        className={styles.table_list}
        columns={columns}
        dataSource={listTheaters}
      />
    </>
  );
}
