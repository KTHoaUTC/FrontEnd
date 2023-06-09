// import ShowTime from "@/apis/showtime";
import Movie from "@/apis/movie";
import Theater from "@/apis/rap";
import Room from "@/apis/room";
import ShowTimeApi from "@/apis/showtime";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Input,
  Popconfirm,
  Row,
  Skeleton,
  Space,
  Table,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import type { Dayjs } from "dayjs";
import moment from "moment";
import { useEffect, useState } from "react";
import ModalAddShowTime from "./createTheater";
import styles from "./style.module.scss";
import { CheckboxChangeEvent } from "antd/es/checkbox";
// import ModalAddRoom from "./createTheater";

const { RangePicker } = DatePicker;

type RangeValue = [Dayjs | null, Dayjs | null] | null;

export default function ShowTime({}: any, props: any) {
  const [listShowTimes, setListShowTimes] = useState<
    AdminCore.ShowTime[] | any
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dates, setDates] = useState<RangeValue>(null);
  const [showAll, setShowAll] = useState(false);
  const [filteredShowTimes, setFilteredShowTimes] = useState<
    AdminCore.ShowTime[] | any
  >([]);
  useEffect(() => {
    fetchTheaters();
  }, []);

  const fetchTheaters = async () => {
    try {
      const response = await ShowTimeApi.getAllShowTimes("ALL");
      setListShowTimes(
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
 
  useEffect(() => {
    if (showAll) {
      setFilteredShowTimes(listShowTimes);
    } else {
      setFilteredShowTimes(listShowTimes.slice(0, 10));
    }
  }, [showAll, listShowTimes]);
  const handleDelete = async (id: number) => {
    await Room.deleteRoom(id);
    setListShowTimes(
      listShowTimes.filter((item: { id: number }) => item.id !== id)
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
      render: (roomId) => {
        const room = roomList.find((room) => room.id === roomId);
        return room ? room.name : null;
      },
    },

    {
      title: "Ngày Chiếu",
      dataIndex: "ngay_chieu",
      key: "ngay_chieu",
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
    },

    {
      title: "Thao Tác",
      key: "",
      align: "center",
      width: "10%",
      render: (_, record: any) => (
        <Space size="middle">
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

  const disabledDate = (current: Dayjs) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], "days") >= 30;
    const tooEarly = dates[1] && dates[1].diff(current, "days") >= 30;
    return !!tooEarly || !!tooLate;
  };

  const onSearch = async () => {
    if (dates) {
      const startDate = dates[0]?.format("YYYY-MM-DD") || "";
      const endDate = dates[1]?.format("YYYY-MM-DD") || "";
      try {
        if (showAll) {
          const showtimes = await ShowTimeApi.getAllShowTimes("ALL");
          setFilteredShowTimes(showtimes);
        } else {
          const showtimes = await ShowTimeApi.searchAll(startDate, endDate);
          setFilteredShowTimes(showtimes);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };


  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    setShowAll(e.target.checked);
  };

  return (
    <>
      <Row>
        <Col className={styles.col_left} span={7}>
          <p>Tìm kiếm theo ngày khởi chiếu: </p>
          <div className={styles.search_date}>
            <RangePicker
              size="large"
              value={dates}
              disabledDate={disabledDate}
              onChange={setDates}
              onCalendarChange={setDates}
              onOpenChange={(open) => {
                if (!open) {
                  onSearch();
                }
              }}
              placeholder={["Từ Ngày", "Đến Ngày"]} // Set the placeholder values
              changeOnBlur
            />
            {/* <Button size="large" onClick={onSearch}>
              <SearchOutlined />
            </Button> */}
          </div>
        </Col>

        <Col offset={3}>
          <h1 className={styles.title}>Danh Sách Lịch Chiếu Phim</h1>
        </Col>
      </Row>

      <ModalAddShowTime onSuccess={fetchTheaters}></ModalAddShowTime>
      <div className={styles.checkbox}>
        <div>
          <Checkbox checked={showAll} onChange={handleCheckboxChange}>
            Hiển thị toàn bộ danh sách
          </Checkbox>
        </div>
      </div>
      {isLoading ? (
        <Skeleton active />
      ) : (
        <Table
          bordered
          className={styles.table_list}
          columns={columns}
          dataSource={filteredShowTimes}
          rowKey="id"
          pagination={{
            pageSize: 10,
          }}
          scroll={{
            x: 1000,
          }}
        />
      )}
    </>
  );
}
