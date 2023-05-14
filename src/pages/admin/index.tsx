// import AdminIndex from "@/containers/admin";
// import "../../styles/globals.scss";

// export default function Home() {
//   return <AdminIndex />;
// }


import AdminIndex from "@/containers/admin";
import LayoutAdmin from "@/containers/admin/layout";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";
const Page: NextPageWithLayout = () => {
  return (
    <>
      <AdminIndex />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
export default Page;