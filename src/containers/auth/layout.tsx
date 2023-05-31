import UserContext, { UserProvider } from "@/contexts/context";
import HomeFooter from "@/layouts/dashboardNonUser/Footer";
import Header from "@/layouts/dashboardNonUser/Header";
import { ReactNode, useContext, useEffect, useState } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  // const [id, setId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");

  const { setUser: setUserContext } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && id) {
      setId(id);
    }
  }, [id]);
  return (
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
        <Header></Header>
        <main>{children}</main>
        <HomeFooter></HomeFooter>
      </div>
    </UserProvider>
  );
};

export default Layout;
