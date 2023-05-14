// import HomeFooter from "@/layouts/dashboardNonUser/Footer";
// import Header from "@/layouts/dashboardNonUser/Header";
// import { ReactNode } from "react";

// type LayoutProps = {
//   children: ReactNode;
// };

// const LayoutAdmin = ({ children }: LayoutProps) => {
//   return (
//     <div>
//       {/* <Header></Header> */}
//       <main>{children}</main>
//       {/* <HomeFooter></HomeFooter> */}
//     </div>
//   );
// };

// export default LayoutAdmin;

import React, { ReactNode, useState } from "react";
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
import SiderAdmin from "./sider";
type LayoutProps = {
  children: ReactNode;
};

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

const LayoutAdmin = ({ children }: LayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SiderAdmin></SiderAdmin>
      <Layout className="site-layout">
        <HeaderLoginAuth></HeaderLoginAuth>
        <Content style={{ margin: "0 0px" }}>
          {/* <Breadcrumb style={{ margin: "26px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Khuat Thi Hoa 191240436 CNTT6K60
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
