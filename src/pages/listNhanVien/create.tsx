import AdminIndex from "@/containers/admin";
import LayoutAdmin from "@/containers/admin/layout";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";
import AddNhanVien from "@/containers/admin/listNhanVien/addList";
const Page: NextPageWithLayout = () => {
  return (
    <>
      <AddNhanVien />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
export default Page;
