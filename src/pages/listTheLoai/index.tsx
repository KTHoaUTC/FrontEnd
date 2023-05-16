import LayoutAdmin from "@/containers/admin/layout";
import TheLoai from "@/containers/admin/listTheLoai";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";
const Page: NextPageWithLayout = () => {
  return (
    <>
      <TheLoai />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
export default Page;
