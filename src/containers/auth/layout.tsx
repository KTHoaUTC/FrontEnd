import UserContext from "@/contexts/context";
import HomeFooter from "@/layouts/dashboardNonUser/Footer";
import Header from "@/layouts/dashboardNonUser/Header";
import { ReactNode, useEffect, useState } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && email) {
      setEmail(email);
    }
  }, [email]);
  console.log("emaillayout", email);
  return (
    <UserContext.Provider value={{ email, setEmail }}>
      <div>
        <Header></Header>
        <main>{children}</main>
        <HomeFooter></HomeFooter>
      </div>
    </UserContext.Provider>
  );
};

export default Layout;
