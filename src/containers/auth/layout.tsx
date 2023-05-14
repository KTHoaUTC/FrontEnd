import HomeFooter from "@/layouts/dashboardNonUser/Footer";
import Header from "@/layouts/dashboardNonUser/Header";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header></Header>
      <main>{children}</main>
      <HomeFooter></HomeFooter>
    </div>
  );
};

export default Layout;
