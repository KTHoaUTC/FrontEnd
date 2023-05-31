
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";
import AdminIndex from "@/containers/admin";
import LayoutAdmin from "@/containers/admin/layout";
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
  
