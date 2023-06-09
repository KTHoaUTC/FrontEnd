import BookTicker from "@/containers/auth/Home/BookTicker";
// import "../../styles/globals.scss";

// export default function Home() {
//   return <BookTicker />;
// }
import Layout from "@/containers/auth/layout";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";
const Page: NextPageWithLayout = () => {
  return (
    <>
      <BookTicker />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Page;
