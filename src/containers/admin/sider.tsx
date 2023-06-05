import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, MenuProps, theme } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { useRouter } from "next/router";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    "Trang Chủ",
    "1",
    <Link href={"/trangchu"}>
      <PieChartOutlined />
    </Link>
  ),
  getItem("User", "sub1", <UserOutlined />, [
    getItem(
      "QL Nhân Viên",
      "2",
      <Link href={"/listNhanVien"}>
        <UserOutlined />
      </Link>
    ),
    getItem(
      "QL Khách Hàng",
      "3",
      <Link href={"/listKhachHang"}>
        <UserOutlined />
      </Link>
    ),
  ]),
  getItem("QL Phim", "sub2", <DesktopOutlined />, [
    getItem(
      "QL Phim",
      "4",
      <Link href={"/listPhim"}>
        <DesktopOutlined />
      </Link>
    ),
    getItem(
      "QL Thể Loại",
      "5",
      <Link href={"/listTheLoai"}>
        <DesktopOutlined />
      </Link>
    ),
  ]),

  getItem("Rạp", "sub3", <FileOutlined />, [
    getItem(
      "QL Lịch Chiếu Phim",
      "6",
      <Link href={"/listShowTime"}>
        <FileOutlined />
      </Link>
    ),
    getItem(
      "QL Phòng Chiếu",
      "7",
      <Link href={"/listRoom"}>
        <FileOutlined />
      </Link>
    ),
    getItem(
      "QL Rạp",
      "8",
      <Link href={"/listRap"}>
        <FileOutlined />
      </Link>
    ),
    getItem(
      "QL Ghế",
      "9",
      <Link href={"/listSeat"}>
        <FileOutlined />
      </Link>
    ),
  ]),
  getItem(
    "Hóa Đơn Đặt Vé",
    "10",
    <Link href={"/listBook"}>
      <FileOutlined />
    </Link>
  ),
  getItem(
    "Bình Luận",
    "11",
    <Link href={"/listComment"}>
      <FileOutlined />
    </Link>
  ),
];
const SiderAdmin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const router = useRouter();
  const { email } = router.query;

  return (
    <Sider
      className={styles.sider}
      style={{ backgroundColor: "white " }}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      {/* <Link legacyBehavior href={"/trangchu/infor"}>
        <div
          style={{
            height: 22,
            margin: 26,
            textAlign: "center",
          }}
        >
          <Button>Thông tin </Button>
        </div>
      </Link> */}

      <Menu
        theme="light"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

export default SiderAdmin;
