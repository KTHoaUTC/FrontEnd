import LayoutAdmin from "@/containers/admin/layout";
import EditNhanVien from "@/containers/admin/listNhanVien/editList";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../../_app";
import BookTicker from "@/containers/auth/Home/BookTicker";
const Page: NextPageWithLayout = () => {
  return (
    <>
      <BookTicker />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
export default Page;
