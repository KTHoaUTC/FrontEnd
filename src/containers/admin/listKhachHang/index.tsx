import User from "@/apis/auth";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Input,
  Popconfirm,
  Row,
  Skeleton,
  Space,
  Table,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./style.module.scss";
const { Search } = Input;

export default function KhachHang({}: any, props: any) {
  const [listUsers, setListUsers] = useState<AdminCore.User[] | any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await User.getAllAuth("ALL");
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
            })
          )
        );
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

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
    },
  ];
  if (isLoading) {
    return <Skeleton active> </Skeleton>;
  }
  return (
    <>
      <Row>
        <Col className={styles.col_left} span={7}>
          <Search
            size="large"
            placeholder="Nhập tìm kiếm"
            // onSearch={onSearch}
            enterButton
          />
        </Col>
        <Col offset={3}>
          <h1 className={styles.title}> Danh Sách Khách Hàng</h1>
        </Col>
      </Row>

      <Table
        bordered
        className={styles.table_list}
        columns={columns}
        dataSource={listUsers}
      />
    </>
  );
}
