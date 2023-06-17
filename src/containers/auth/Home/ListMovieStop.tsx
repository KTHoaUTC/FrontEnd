import { Button, Card, Divider, List } from "antd";
import React, { useContext, useEffect, useState } from "react";
import styles from "./style.module.scss";
import ModalDetail from "./ModalDetail";
import Link from "next/link";
import Movie from "@/apis/movie";
import UserContext from "@/contexts/context";
const { Meta } = Card;

const ListMovieStop: React.FC = () => {
  const [listMovies, setListMovies] = useState<AdminCore.Movie[] | any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id, setId } = useContext(UserContext);

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
              day_start: Date;
              status: string;
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
              day_start: account.day_start,
              status: account.status,
            })
          )
        );
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const filteredMovies = listMovies.filter(
    (item: any) => item.status === "coming_soon"
  );

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
        dataSource={filteredMovies}
        renderItem={(item: any) => (
          <List.Item key={item.id}>
            <Card
              className={styles.card_item}
              hoverable
              cover={<img alt="example" src={item.image_url} />}
            >
              <Meta
                className={styles.meta}
                title={
                  <p
                    className={styles.title_meta}
                    style={{ fontSize: "2.5rem" }}
                  >
                    {item.title}
                  </p>
                }
              />
              <div className={styles.btnMovie}>
                <ModalDetail movieId={item.id}></ModalDetail>
                {id ? (
                  <Link legacyBehavior href={`/bookticker?id=${item.id}`}>
                    <Button className={styles.book_ticket}>Đặt Vé</Button>
                  </Link>
                ) : (
                  <Button className={styles.book_ticket} disabled>
                    Đặt Vé
                  </Button>
                )}
              </div>
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

export default ListMovieStop;
