import Theater from "@/apis/rap";
import { Collapse, List } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
const { Panel } = Collapse;
const CumRap: React.FC = () => {
  const [listTheaters, setListTheaters] = useState<AdminCore.Rap[] | any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTheaters();
  }, []);

  const fetchTheaters = async () => {
    try {
      const response = await Theater.getAll("ALL");
      setListTheaters(
        response.theaters?.map(
          (theater: {
            key: string;
            id: string;
            name: string;
            image: string;
            address: string;
            description: string;
          }) => ({
            key: theater.id,
            id: theater.id,
            name: theater.name,
            image: theater.image,
            address: theater.address,
            description: theater.description,
          })
        )
      );
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };
  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  return (
    <>
      <h1 className={styles.title}>Hệ Thống Rạp</h1>
      <List
        className={styles.list_theater}
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={listTheaters}
        renderItem={(item: any) => (
          <List.Item
            key={item.id}
            extra={
              <img
                className={styles.img}
                width={272}
                alt="logo"
                src={item.image}
              />
            }
          >
            <List.Item.Meta
              title={
                <a className={styles.title_movie} href={item.href}>
                  {item.name}
                </a>
              }
              description={<p>Địa Chỉ: {item.address}</p>}
            />
            <Collapse defaultActiveKey={["1"]} onChange={onChange}>
              <Panel header="Giới Thiệu" key="item.id">
                <div className={styles.content}>{item.description} </div>
              </Panel>
            </Collapse>
          </List.Item>
        )}
      />
    </>
  );
};

export default CumRap;
