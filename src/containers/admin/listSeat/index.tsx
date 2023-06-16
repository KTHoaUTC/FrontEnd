import Genre from "@/apis/genre";
import { Button, Popconfirm, Skeleton, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

import styles from "./style.module.scss";
import TypeSeat from "./typeSeat";
import Seat from "@/apis/seat";
import Room from "@/apis/room";
import { DeleteOutlined } from "@ant-design/icons";
import ShowTimeApi from "@/apis/showtime";
import ListSeatStatus from "./seat";

export default function ListSeat({}: any, props: any) {
  const [listSeats, setListSeats] = useState<AdminCore.Seat[] | any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await Seat.getAllSeat("ALL");
      const seats =
        response.seats?.map((seat: any) => ({
          seat_type_id: seat.seat_type_id,
          showtime_id: seat.showtime_id,
          row: seat.row,
          key: seat.id,
          id: seat.id,
          status: seat.status,
          updatedAt: seat.updatedAt,
        })) || [];
      setListSeats(seats);
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
        // console.log("dsdsdfgggata", roomList);
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


  const handleDelete = async (id: number) => {
    await Seat.deleteSeat(id);
    setListSeats(listSeats.filter((item: { id: number }) => item.id !== id));
  };

  const columns: ColumnsType<AdminCore.Seat> = [
    {
      title: "Mã Ghế",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Lịch chiếu",
      dataIndex: "showtime_id",
      key: "showtime_id",
      align: "center",
    },
    {
      title: "Thứ Tự Ghế",
      dataIndex: "row",
      key: "row",
      align: "center",
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => {
        return status ? (
          <Tag style={{ padding: "0 1rem" }} color="red">
            Đã bán
          </Tag>
        ) : (
          <Tag style={{ padding: "0 1rem" }} color="#2db7f5">
            Đang chọn
          </Tag>
        );
      },
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
  return (
    <>
      <h1 className={styles.title}> Danh Sách Ghế</h1>
      {/* <TypeSeat></TypeSeat> */}
<ListSeatStatus></ListSeatStatus>
      <Table
        bordered
        className={styles.table_list}
        columns={columns}
        dataSource={listSeats}
      />
    </>
  );
}

