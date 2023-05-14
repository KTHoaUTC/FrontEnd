// import { apis } from "@/apis/ApiNhanVien";
// import CreateUser from "@/components/admin/CreateUser";
// import EditUser from "@/components/admin/EditUser";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Skeleton, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import styles from "./style.module.scss";
import ModalAdd from "./addList";

interface DataType {
  id: number;
  email: string;
  username: string;
  password: string;
  phone: number;
}
export default function NhanVien({}: any, props: any) {
  const [nhanviens, setNhanViens] = useState<DataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        // const nhanviens = await apis.getDataNhanVien();
        setNhanViens(nhanviens);
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  const handleDelete = async (id: number) => {
    //  await apis.DeleteDataNhanVien(id);
    setNhanViens(nhanviens.filter((item) => item.id !== id));
  };
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
      title: "Tên",
      dataIndex: "username",
      key: "username",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "PassWord",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "PhoneNumber",
      dataIndex: "phone",
      key: "phone",
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
            Edit
          </a>
          <Popconfirm
            title="Bạn chắc chắn muốn xóa?"
            onConfirm={() => handleDelete(item.id)}
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
      <h1> Danh Sách Nhân Viên</h1>
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
        dataSource={nhanviens}
      />
    </>
  );
}
