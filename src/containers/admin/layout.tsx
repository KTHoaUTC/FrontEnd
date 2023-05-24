import AdminContext from "@/contexts/authContex";
import HeaderLoginAuth from "@/layouts/dashboard/header";
import { Layout, theme } from "antd";
import { ReactNode, useEffect, useState } from "react";
import SiderAdmin from "./sider";
type LayoutProps = {
  children: ReactNode;
};

const { Content, Footer } = Layout;

const LayoutAdmin = ({ children }: LayoutProps) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && email) {
      setEmail(email);
    }
  }, [email]);


  console.log("adminlayout", email);
  return (
    <AdminContext.Provider value={{ email, setEmail }}>
      <div>
        <Layout style={{ minHeight: "100vh" }}>
          <SiderAdmin></SiderAdmin>
          <Layout className="site-layout">
            <HeaderLoginAuth></HeaderLoginAuth>
            <Content style={{ margin: "0 0px", background: "white" }}>
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
      </div>
    </AdminContext.Provider>
  );
};

export default LayoutAdmin;
