import CumRap from "@/containers/auth/Theater";
import Layout from "@/containers/auth/layout";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";
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
