import Layout from "@/containers/auth/layout";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../../_app";
import ProFileAuth from "@/containers/auth/info";
// import "../../styles/globals.scss";
const Page: NextPageWithLayout = () => {
  return (
    <>
      <ProFileAuth />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Page;
