// import { apis } from "@/apis/ApiNhanVien";
// import CreateUser from "@/components/admin/CreateUser";
// import EditUser from "@/components/admin/EditUser";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Skeleton, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import styles from "./style.module.scss";
import ModalAdd from "./addList";
import User from "@/apis/auth";

interface DataType {
  id: number;
  email: string;
  username: string;
  password: string;
  phone: number;
}
export default function NhanVien({}: any, props: any) {
  const [listUsers, setListUsers] = useState<DataType[]>([]);
  const [id, setId] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const response = await User.getAll("ALL");
        setListUsers(response.users);
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  // const handleDelete = async (id: number) => {
  //   //  await apis.DeleteDataNhanVien(id);
  //   setNhanViens(nhanviens.filter((item) => item.id !== id));
  // };
  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Họ",
      dataIndex: "last_name",
      key: "last_name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên",
      dataIndex: "first_name",
      key: "first_name",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Giới Tính",
      dataIndex: "gender",
      key: "gender",
      render: (value) => (value ? "Nam" : "Nữ"),
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Action",
      key: "action",
      render: (infoUers, item: { id: number }) => (
        <Space size="middle">
          <a>
            {/* <EditUser
              infoUers={infoUers}
              resetData={(id: Number, userUpdate: DataType) => {
                setNhanViens((state) => {
                  const newData = [...state].map((infoUers) => {
                    if (id == infoUers.id) {
                      return userUpdate;
                    }
                    return infoUers;
                  });
                  return newData;
                });
              }}
            /> */}
            <EditOutlined />
          </a>
          <Popconfirm
            title="Bạn chắc chắn muốn xóa?"
            // onConfirm={() => handleDelete(item.id)}
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
      <h1 className={styles.title}> Danh Sách Nhân Viên</h1>
      {/* <CreateUser
        resetData={(newUser: DataType) => {
          setNhanViens((state) => {
            const newData = [...state];
            newData.push(newUser);
            return newData;
          });
        }}
      /> */}
      <ModalAdd></ModalAdd>
      <Table
        className={styles.table_list}
        columns={columns}
        dataSource={listUsers}
      />
    </>
  );
}
