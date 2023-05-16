import User from "@/apis/auth";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Button, Popconfirm, Skeleton, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./style.module.scss";
import Genre from "@/apis/genre";
import ModalAdd from "./addTheLoai";

export default function TheLoai({}: any, props: any) {
  const [listUsers, setListUsers] = useState<AdminCore.User[] | any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await Genre.getAll("ALL");
        setListUsers(
          response.genres?.map(
            (account: {
              key: string;
              id: string;
              name: string;
              updatedAt: Date;
            }) => ({
              key: account.id,
              id: account.id,
              name: account.name,
              updatedAt: account.updatedAt,
            })
          )
        );
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleDelete = async (id: number) => {
    await User.deleteUser(id);
    setListUsers(listUsers.filter((item: { id: number }) => item.id !== id));
  };
  const columns: ColumnsType<AdminCore.Genre> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên Thể Loại",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ngày Cập Nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
    {
      title: "Action",
      key: "",
      render: (_, record: any) => (
        <Space size="middle">
          <a>
            <Link href={`/listNhanVien/${record.id}`}>
              <Button style={{ float: "right", margin: "0px" }} type="primary">
                <EditOutlined />
              </Button>
            </Link>
          </a>
          <Popconfirm
            title="Bạn chắc chắn muốn xóa?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button style={{ float: "right", margin: "0px" }} type="primary">
              <DeleteOutlined />
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
      <h1 className={styles.title}> Danh Sách Thể Loại Phim</h1>
      <ModalAdd></ModalAdd>
      {/* <Link href={"/listNhanVien/create"}>
        <Button className={styles.btn_add} type="primary">
          + Thêm Thể Loại
        </Button>
      </Link> */}
      <Table
        className={styles.table_list}
        columns={columns}
        dataSource={listUsers}
      />
    </>
  );
}
