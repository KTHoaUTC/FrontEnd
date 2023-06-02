import LayoutAdmin from "@/containers/admin/layout";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";
import ProFileAdmin from "@/containers/admin/info";
const Page: NextPageWithLayout = () => {
  return (
    <>
      <ProFileAdmin />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
export default Page;
