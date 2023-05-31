import "../../styles/globals.scss";


import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";
import Layout from "@/containers/auth/layout";
import AuthLogin from "@/containers/login";
const Page: NextPageWithLayout = () => {
  return (
    <>
      <AuthLogin />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Page;