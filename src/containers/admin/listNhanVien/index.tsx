import User from "@/apis/auth";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Button, Popconfirm, Skeleton, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./style.module.scss";

export default function NhanVien({}: any, props: any) {
  const [listUsers, setListUsers] = useState<AdminCore.User[] | any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await User.getAll("ALL");
        setListUsers(
          response.users?.map(
            (account: {
              key: string;
              id: string;
              first_name: string;
              last_name: string;
              email: string;
              gender: boolean;
              address: string;
              phone_number: string;
              RoleId: string;
              avatar: Blob;
            }) => ({
              key: account.id,
              id: account.id,
              first_name: account.first_name,
              last_name: account.last_name,
              email: account.email,
              gender: account.gender,
              address: account.address,
              phone_number: account.phone_number,
              RoleId: account.RoleId,
              avatar: account.avatar,
            })
          )
        );
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  const [imageUrl, setImageUrl] = useState("");

  const renderImage = (text: any, record: any) => {
    const file = new File([record.image], "filename.jpg", {
      type: "image/jpeg",
    });
    const imageUrl = URL.createObjectURL(file);
    return <Avatar src={imageUrl} />;
  };
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);
  const handleDelete = async (id: number) => {
    await User.deleteUser(id);
    setListUsers(listUsers.filter((item: { id: number }) => item.id !== id));
  };
  const columns: ColumnsType<AdminCore.User> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
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
      dataIndex: "avatar",
      key: "avatar",
      // render: renderImage,
    },
    {
      title: "Phân Quyền",
      dataIndex: "RoleId",
      key: "RoleId",
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
      <h1 className={styles.title}> Danh Sách Nhân Viên</h1>
      <Link href={"/listNhanVien/create"}>
        <Button className={styles.btn_add} type="primary">
          + Thêm Nhân Viên
        </Button>
      </Link>

      <Table
        bordered
        className={styles.table_list}
        columns={columns}
        dataSource={listUsers}
      />
    </>
  );
}
