import ListComment from "@/containers/admin/comment";
import LayoutAdmin from "@/containers/admin/layout";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";
const Page: NextPageWithLayout = () => {
  return (
    <>
      <ListComment />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
export default Page;
