import LayoutAdmin from "@/containers/admin/layout";
import ListBooking from "@/containers/admin/listBook";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";
import ImageQRScanner from "@/containers/admin/checkQr";
const Page: NextPageWithLayout = () => {
  return (
    <>
      <ImageQRScanner />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
export default Page;
