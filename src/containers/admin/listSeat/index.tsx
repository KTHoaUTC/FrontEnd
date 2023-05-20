import Genre from "@/apis/genre";
import { Button, Popconfirm, Skeleton, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

import styles from "./style.module.scss";
import TypeSeat from "./typeSeat";
import Seat from "@/apis/seat";
import Room from "@/apis/room";
import { DeleteOutlined } from "@ant-design/icons";

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
          phongchieu_id: seat.phongchieu_id,
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
        // console.log("dsdsdfata", roomList);
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
      title: "Phòng Chiếu",
      dataIndex: "phongchieu_id",
      key: "phongchieu_id",
      align: "center",
      render: (theaterId) => {
        const theater = roomList.find((theater) => theater.id === theaterId);
        return theater ? theater.name : null;
      },
    },
    {
      title: "Loại Ghế",
      dataIndex: "seat_type_id",
      key: "seat_type_id",
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
      <h1 className={styles.title}> Danh Sách Ghế</h1>
      <TypeSeat></TypeSeat>

      <Table
        bordered
        className={styles.table_list}
        columns={columns}
        dataSource={listSeats}
      />
    </>
  );
}
