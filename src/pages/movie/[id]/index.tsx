import LayoutAdmin from "@/containers/admin/layout";
import MovieDetail from "@/containers/auth/Movie";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../../_app";
const Page: NextPageWithLayout = () => {
  return (
    <>
      <MovieDetail />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
export default Page;
