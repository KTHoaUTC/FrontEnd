import LayoutAdmin from "@/containers/admin/layout";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";
import Rap from "@/containers/admin/listRap";
const Page: NextPageWithLayout = () => {
  return (
    <>
      <Rap />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
export default Page;
