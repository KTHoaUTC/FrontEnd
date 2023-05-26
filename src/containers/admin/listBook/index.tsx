import User from "@/apis/auth";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Button, Popconfirm, Skeleton, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./style.module.scss";
import Booking from "@/apis/booking";
import Theater from "@/apis/rap";

export default function ListBooking({}: any, props: any) {
  const [listUsers, setListUsers] = useState<AdminCore.User[] | any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await Booking.getAllBookings("ALL");
        setListUsers(
          response.bookings?.map(
            (account: {
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
            }) => ({
              key: account.id,
              id: account.id,
              total_price: account.total_price,
              booking_status: account.booking_status,
              theater: account.theater,
              theater_id: account.theater_id,
              phongchieu_id: account.phongchieu_id,
            })
          )
        );
        // console.log("testlsit", listUsers);
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

  const columns: ColumnsType<AdminCore.Booking> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
      align: "center",
    },
    {
      title: "Rạp",
      dataIndex: "theater_id",
      key: "theater_id",
      render: (theaterId) => {
        const theater = listTheaters.find(
          (theater:any) => theater.id === theaterId
        );
        return theater ? theater.name : null;
      },
    },

    {
      title: "Tổng Tiền",
      dataIndex: "total_price",
      key: "total_price",
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
        dataSource={listUsers}
      />
    </>
  );
}
