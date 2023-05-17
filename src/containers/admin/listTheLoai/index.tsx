import Genre from "@/apis/genre";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Skeleton, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useEffect, useState } from "react";
import ModalAdd from "./addTheLoai";
import styles from "./style.module.scss";
import moment from "moment";

export default function TheLoai({}: any, props: any) {
  const [listGenres, setListGenres] = useState<AdminCore.Genre[] | any>([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await Genre.getAll("ALL");
  //       setListGenres(
  //         response.genres?.map(
  //           (account: {
  //             key: string;
  //             id: string;
  //             name: string;
  //             updatedAt: Date;
  //           }) => ({
  //             key: account.id,
  //             id: account.id,
  //             name: account.name,
  //             updatedAt: account.updatedAt,
  //           })
  //         )
  //       );
  //     } catch (e) {
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   })();
  // }, []);
  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await Genre.getAll("ALL");
      const genres =
        response.genres?.map((account: any) => ({
          key: account.id,
          id: account.id,
          name: account.name,
          updatedAt: account.updatedAt,
        })) || [];
      setListGenres(genres);
    } catch (error) {
      console.log("Error fetching genres:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async (id: number) => {
    await Genre.deleteGenre(id);
    setListGenres(listGenres.filter((item: { id: number }) => item.id !== id));
  };

  const formattedDate = (date: Date) => {
    return moment(date).format("DD/MM/YYYY");
  };
  const columns: ColumnsType<AdminCore.Genre> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Tên Thể Loại",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Ngày Cập Nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "center",

      render: (date: Date) => formattedDate(date),
    },
    {
      title: "Action",
      key: "",
      align: "center",
      
      render: (_, record: any) => (
        <Space size="middle">
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
      <ModalAdd onSuccess={fetchGenres} />
      <Table
        bordered
        className={styles.table_list}
        columns={columns}
        dataSource={listGenres}
      />
    </>
  );
}
