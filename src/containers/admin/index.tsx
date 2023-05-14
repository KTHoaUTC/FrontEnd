import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import HeaderLoginAuth from "@/layouts/dashboard/header";

const { Header, Content, Footer, Sider } = Layout;

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
  getItem("Trang Chủ", "1", <PieChartOutlined />),
  getItem("QL Nhân Viên", "2", <DesktopOutlined />),
  getItem("QL Khách Hàng", "3", <UserOutlined />),
  getItem("QL Phim", "4", <TeamOutlined />),
  getItem("QL Lịch Chiếu Phim", "5", <FileOutlined />),
  getItem("QL Phòng Chiếu", "6", <FileOutlined />),
];

const AdminIndex: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout >
     hhh
    </Layout>
  );
};

export default AdminIndex;
