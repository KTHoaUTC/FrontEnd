
import HeaderLoginAuth from "@/layouts/dashboard/header";
import { Layout, theme } from "antd";
import { ReactNode } from "react";
import SiderAdmin from "./sider";
type LayoutProps = {
  children: ReactNode;
};

const { Header, Content, Footer, Sider } = Layout;


const LayoutAdmin = ({ children }: LayoutProps) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SiderAdmin></SiderAdmin>
      <Layout className="site-layout">
        <HeaderLoginAuth></HeaderLoginAuth>
        <Content style={{ margin: "0 0px", background:'white' }}>
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
        <Footer
          style={{
            textAlign: "center",
            background: "white",
            fontSize: "1.5rem",
          }}
        >
          Khuất Thị Hoa 191240436 CNTT6K60
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
