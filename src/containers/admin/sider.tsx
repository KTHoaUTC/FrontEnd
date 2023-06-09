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
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-free/css/all.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      <i className="fas fa-home"></i>
    </Link>
  ),
  getItem("QL Tài Khoản", "sub1", <UserOutlined />, [
    getItem(
      "QL Nhân Viên",
      "2",
      <Link href={"/listNhanVien"}>
        <i className="fas fa-person"></i>
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
  getItem("QL Phim", "sub2", <i className="fas fa-film"></i>, [
    getItem(
      "QL Phim",
      "4",
      <Link href={"/listPhim"}>
        <i className="fas fa-video"></i>
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
        <i className="fas fa-calendar"></i>
      </Link>
    ),
    getItem(
      "QL Phòng Chiếu",
      "7",
      <Link href={"/listRoom"}>
        <i className="fas fa-trailer"></i>
      </Link>
    ),
    getItem(
      "QL Rạp",
      "8",
      <Link href={"/listRap"}>
        <i className="fas fa-shop"></i>
      </Link>
    ),
    getItem(
      "QL Ghế",
      "9",
      <Link href={"/listSeat"}>
        <i className="fas fa-chair"></i>
      </Link>
    ),
  ]),
  getItem(
    "Hóa Đơn Đặt Vé",
    "10",
    <Link href={"/listBook"}>
      <i className="fas fa-wallet"></i>
    </Link>
  ),
  getItem(
    "Bình Luận",
    "11",
    <Link href={"/listComment"}>
      <i className="fas fa-regular fa-comment"></i>
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
