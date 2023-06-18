import Movie from "@/apis/movie";
import { Button, Card, Input, List, Tag } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ModalDetail from "./ModalDetail";
import styles from "./style.module.scss";
const { Search } = Input;

const { Meta } = Card;

const ListMovieStop: React.FC = () => {
  const [listMovies, setListMovies] = useState<AdminCore.Movie[] | any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [originalListMovies, setOriginalListMovies] = useState<
    AdminCore.Movie[] | any
  >([]);
  const [searchTerm, setSearchTerm] = useState("");

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
        setOriginalListMovies(response.movies);
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleSearch = async () => {
    try {
      const movies = await Movie.searchAll(searchTerm);
      setListMovies(movies);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.list_movie}>
        <Search
          size="large"
          className={styles.search}
          placeholder="Nhập tên bộ phim, diễn viên"
          allowClear
          onSearch={handleSearch}
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />

        {listMovies.length > 0 ? (
          <>
            <p className={styles.list_movie_}>Danh Sách Các Bộ Phim</p>
            <div className={styles.list_search}>
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
                  pageSize: 9,
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
                        title={
                          <p
                            className={styles.title_movie}
                            // style={{ fontSize: "2.5rem" }}
                          >
                            {item.title}
                          </p>
                        }
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
            </div>
          </>
        ) : (
          <>
            <p className={styles.none_movie}>
              Từ khóa " {searchTerm}" Không Tồn Tại
            </p>
            <p className={styles.list_movie_}>Danh Sách Các Bộ Phim</p>
            <div className={styles.list_search}>
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
                dataSource={originalListMovies}
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
                            className={styles.title_movie}
                            // style={{ fontSize: "2.5rem" }}
                          >
                            {item.title}
                          </p>
                        }
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
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ListMovieStop;
