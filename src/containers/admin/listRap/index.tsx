import Theater from "@/apis/rap";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Skeleton, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import ModalAddTheater from "./createTheater";
import ModalEditTheater from "./editTheater";
import styles from "./style.module.scss";

export default function Rap({}: any, props: any) {
  const [listTheaters, setListTheaters] = useState<AdminCore.Rap[] | any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTheaters();
  }, []);

  const fetchTheaters = async () => {
    try {
      const response = await Theater.getAll("ALL");
      setListTheaters(
        response.theaters?.map(
          (theater: {
            key: string;
            id: string;
            name: string;
            image: string;
            address: string;
            description: string;
          }) => ({
            key: theater.id,
            id: theater.id,
            name: theater.name,
            image: theater.image,
            address: theater.address,
            description: theater.description,
          })
        )
      );
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    await Theater.deleteTheater(id);
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
      title: "Tên Rạp",
      dataIndex: "name",
      key: "name",
      width: "15%",
    },
    {
      title: "Ảnh",
      align: "center",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <img src={text} alt="Image" style={{ width: "100px" }} />
      ),
    },
    {
      title: "Nội Dung",
      dataIndex: "description",
      key: "description",
      width: "40%",
    },

    {
      title: "Địa Chỉ",
      dataIndex: "address",
      key: "address",
      width: "25%",
    },

    {
      title: "Action",
      key: "",
      align: "center",
      width: "10%",
      render: (_, record: any) => (
        <Space size="middle">
          <a>
            <ModalEditTheater
              onSuccess={fetchTheaters}
              currentTheater={null}
            ></ModalEditTheater>
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
      <h1 className={styles.title}> Danh Sách Rạp Chiếu Phim</h1>

      <ModalAddTheater onSuccess={fetchTheaters}></ModalAddTheater>
      <Table
        bordered
        className={styles.table_list}
        columns={columns}
        dataSource={listTheaters}
      />
    </>
  );
}
