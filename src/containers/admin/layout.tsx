import UserContext, { UserProvider } from "@/contexts/context";
import HeaderLoginAuth from "@/layouts/dashboard/header";
import { Layout, theme } from "antd";
import { ReactNode, useContext, useEffect, useState } from "react";
import SiderAdmin from "./sider";
import ProFileAdmin from "./info";
type LayoutProps = {
  children: ReactNode;
};

const { Content, Footer } = Layout;

const LayoutAdmin = ({ children }: LayoutProps) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [email, setEmail] = useState("");
  const [id, setId] = useState("");

  const { setUser: setUserContext } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && email) {
      setEmail(email);
    }
  }, [email]);

  return (
    <>
      <UserProvider
        value={{
          id,
          email,
          setId,

          setEmail,
          setUser: setUserContext,
        }}
      >
        <div>
          <Layout style={{ minHeight: "100vh" }}>
            {/* <ProFileAdmin></ProFileAdmin> */}
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
      </UserProvider>
    </>
  );
};

export default LayoutAdmin;
