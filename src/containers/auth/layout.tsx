import HomeFooter from "@/layouts/dashboardNonUser/Footer";
import Header from "@/layouts/dashboardNonUser/Header";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

type IProps = {
  children: ReactNode;
  session: any;
};

const Layout = ({ children, session }: IProps) => {
  return (
    <div>
      <SessionProvider session={session}>
        <Header></Header>
        <main>{children}</main>
        <HomeFooter></HomeFooter>
      </SessionProvider>
    </div>
  );
};

export default Layout;
