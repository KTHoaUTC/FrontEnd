import { Tabs } from "antd";
import React, { useState } from "react";
import ListMovieHot from "./ListMovieHot";
import styles from "./style.module.scss";
import ListDeXuat from "./ListDeXuat";

const ContentDeXuat: React.FC = () => {
  const [items, setItems] = useState([
    {
      key: "1",
      label: <p className={styles.title_menu}> Top Bộ Phim Bán Chạy </p>,
      children: <ListDeXuat></ListDeXuat>,
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

export default ContentDeXuat;
