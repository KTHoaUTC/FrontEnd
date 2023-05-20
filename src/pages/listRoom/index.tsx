import LayoutAdmin from "@/containers/admin/layout";
// import PhongChieu from "@/containers/admin/listPhongChieu";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";
import PhongChieu from "@/containers/admin/listPhongChieu";
// import React from "react";
const Page: NextPageWithLayout = () => {
  return (
    <>
      <PhongChieu />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
export default Page;
