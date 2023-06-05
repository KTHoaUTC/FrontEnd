import MovieDetail from "@/containers/auth/Movie";
import Layout from "@/containers/auth/layout";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";
const Page: NextPageWithLayout = () => {
  return (
    <>
      <MovieDetail />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Page;
