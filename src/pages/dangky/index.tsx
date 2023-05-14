import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";
import Layout from "@/containers/auth/layout";
import HomeAuth from "@/containers/auth";
import DangKy from "@/containers/auth/DangKy";
const Page: NextPageWithLayout = () => {
  return (
    <>
      <DangKy />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Page;
