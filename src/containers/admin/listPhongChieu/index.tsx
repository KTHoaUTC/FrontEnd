import Theater from "@/apis/rap";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Skeleton, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

import styles from "./style.module.scss";
import Room from "@/apis/room";
import ModalAddRoom from "./createTheater";

export default function PhongChieu({}: any, props: any) {
  const [listTheaters, setListTheaters] = useState<AdminCore.Room[] | any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTheaters();
  }, []);

  const fetchTheaters = async () => {
    try {
      const response = await Room.getAllRooms("ALL");
      setListTheaters(
        response.phongchieus?.map(
          (theater: {
            key: string;
            id: string;
            theater_id: number | any;
            seat_id: number | any;
            sum_seat: number | any;
            name: string;
          }) => ({
            key: theater.id,
            id: theater.id,
            theater_id: theater.theater_id,
            seat_id: theater.seat_id,
            sum_seat: theater.sum_seat,
            name: theater.name,
          })
        )
      );
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };
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
  const handleDelete = async (id: number) => {
    await Room.deleteRoom(id);
    setListTheaters(
      listTheaters.filter((item: { id: number }) => item.id !== id)
    );
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
      title: "Phòng Chiếu",
      align: "center",

      dataIndex: "name",
      key: "name",
      width: "15%",
    },
    {
      title: "Tên Rạp",
      align: "center",
      dataIndex: "theater_id",
      key: "theater_id",
      render: (theaterId) => {
        const theater = theaterList.find((theater) => theater.id === theaterId);
        return theater ? theater.name : null;
      },
    },
    // {
    //   title: "Mã Ghế",
    //   dataIndex: "seat_id",
    //   key: "seat_id",
    //   // width: "40%",
    // },

    {
      title: "Tổng số ghế",
      align: "center",

      dataIndex: "sum_seat",
      key: "sum_seat",
      
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
      <h1 className={styles.title}>Danh Sách Phòng Chiếu Phim</h1>

      <ModalAddRoom onSuccess={fetchTheaters}></ModalAddRoom>
      <Table
        bordered
        className={styles.table_list}
        columns={columns}
        dataSource={listTheaters}
      />
    </>
  );
}
