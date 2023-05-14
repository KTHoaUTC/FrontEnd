import { Button, Card, List } from "antd";
import React from "react";
import styles from "./style.module.scss";
const { Meta } = Card;
const data = Array.from({ length: 23 }).map((_, i) => ({
  href: "https://ant.design",
  title: `ant design part ${i}`,
  avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
  description:
    "Ant Design, a design language for background applications, is refined by Ant UED Team.",
  content:
    "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
}));
const ListMovieStop: React.FC = () => {
  return (
    <>
      <p> </p>
      <List
        className={styles.list}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 6,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card
              className={styles.card_item}
              hoverable
              cover={
                <img
                  className={styles.img}
                  alt="example"
                  src="/movie2movie2.jpg"
                />
              }
            >
              <Meta title="Batman" />
              <Button className={styles.book_ticket}>Xem Chi Tiết</Button>
              <Button className={styles.book_ticket}>Đặt Vé</Button>
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

export default ListMovieStop;
