import "../../styles/globals.scss";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";
import Layout from "@/containers/auth/layout";
import HomeAuth from "@/containers/auth";
const Page: NextPageWithLayout = () => {
  return (
    <>
      <HomeAuth />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Page;
