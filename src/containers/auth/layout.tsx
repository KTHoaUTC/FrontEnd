import UserContext, { UserProvider } from "@/contexts/context";
import HomeFooter from "@/layouts/dashboardNonUser/Footer";
import Header from "@/layouts/dashboardNonUser/Header";
import { ReactNode, useContext, useEffect, useState } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [email, setEmail] = useState("");
  const { setUser: setUserContext } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && email) {
      setEmail(email);
    }
  }, [email]);
  console.log("emaillayout", email);
  return (
    <UserProvider
      value={{
        email,
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
