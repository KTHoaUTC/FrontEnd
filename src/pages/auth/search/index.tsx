import SearchMovie from "@/containers/auth/Search";
import Layout from "@/containers/auth/layout";
import type { ReactElement } from "react";
import "../../../styles/globals.scss";
import type { NextPageWithLayout } from "../../_app";
const Page: NextPageWithLayout = () => {
  return (
    <>
      <SearchMovie />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Page;
