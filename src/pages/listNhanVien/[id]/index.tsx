import LayoutAdmin from "@/containers/admin/layout";
import EditNhanVien from "@/containers/admin/listNhanVien/editList";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../../_app";
const Page: NextPageWithLayout = () => {
  return (
    <>
      <EditNhanVien />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
export default Page;
