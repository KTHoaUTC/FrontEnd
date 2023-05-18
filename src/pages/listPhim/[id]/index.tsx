import LayoutAdmin from "@/containers/admin/layout";
import EditPhim from "@/containers/admin/listMovie/editList";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../../_app";
const Page: NextPageWithLayout = () => {
  return (
    <>
      <EditPhim />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
export default Page;
