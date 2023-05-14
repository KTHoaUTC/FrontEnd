import { Tabs } from "antd";
import React, { useState } from "react";
import ListMovie from "./ListMovie";
import styles from "./style.module.scss";
import ListMovieStop from "./ListMovieStop";

const ContentHome: React.FC = () => {
  const [items, setItems] = useState([
    {
      key: "1",
      label: <p className={styles.title_menu}>PHIM ĐANG CHIẾU</p>,
      children: <ListMovie></ListMovie>,
    },
    {
      key: "2",
      label: <p className={styles.title_menu}>PHIM SẮP CHIẾU</p>,
      children: <ListMovieStop></ListMovieStop>,
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

export default ContentHome;
