import { Button, Card, Divider, List } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import ModalDetail from "./ModalDetail";
import Link from "next/link";
import Movie from "@/apis/movie";
const { Meta } = Card;

const ListMovie: React.FC = () => {
  const [listMovies, setListMovies] = useState<AdminCore.Movie[] | any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await Movie.getAll("ALL");
        setListMovies(
          response.movies?.map(
            (account: {
              key: string;
              id: string;
              title: string;
              image_url: string;
              countries: string;
              poster_url: boolean;
              trailer_url: string;
              release_date: string;
              run_time: number;
              director: string;
              genres_id: number;
              description: string;
            }) => ({
              key: account.id,
              id: account.id,
              title: account.title,
              image_url: account.image_url,
              countries: account.countries,
              poster_url: account.poster_url,
              trailer_url: account.trailer_url,
              release_date: account.release_date,
              run_time: account.run_time,
              director: account.director,
              genres_id: account.genres_id,
              description: account.description,
            })
          )
        );
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
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
        dataSource={listMovies}
        renderItem={(item: any) => (
          <List.Item key={item.id}>
            <Card
              className={styles.card_item}
              hoverable
              cover={<img alt="example" src={item.image_url} />}
            >
              <Meta
                className={styles.meta}
                title={<p style={{ fontSize: "2.5rem" }}>{item.title}</p>}
              />
              <div className={styles.btnMovie}>
                <ModalDetail movieId={item.id}></ModalDetail>
                <Link legacyBehavior href={`/bookticker?id=${item.id}`}>
                  <Button className={styles.book_ticket}>Đặt Vé</Button>
                </Link>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

export default ListMovie;
