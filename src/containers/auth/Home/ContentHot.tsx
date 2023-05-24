import { Tabs } from "antd";
import React, { useState } from "react";
import ListMovieHot from "./ListMovieHot";
import styles from "./style.module.scss";

const ContentHot: React.FC = () => {
  const [items, setItems] = useState([
    {
      key: "1",
      label: <p className={styles.title_menu}> PHIM ĐANG HOT</p>,
      children: <ListMovieHot></ListMovieHot>,
    },
  ]);
  return (
    <>
      <Tabs
        className={styles.tabs}
        size={"large"}
        defaultActiveKey="1"
        centered
        items={items}
      />
    </>
  );
};

export default ContentHot;
