import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";
import Layout from "@/containers/auth/layout";
import HomeAuth from "@/containers/auth";
import DangKy from "@/containers/auth/DangKy";
import CumRap from "@/containers/auth/Theater";
const Page: NextPageWithLayout = () => {
  return (
    <>
      <CumRap />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Page;
