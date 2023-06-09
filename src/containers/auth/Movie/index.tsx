import User from "@/apis/auth";
import Comment from "@/apis/comment";
import Genre from "@/apis/genre";
import Movie from "@/apis/movie";
import UserContext from "@/contexts/context";
import { Avatar, Button, Col, Input, List, Row, Skeleton } from "antd";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import styles from "./style.module.scss";

const MovieDetail: React.FC = () => {
  const [genreList, setGenreList] = useState<AdminCore.Genre[]>([]);
  const router = useRouter();
  const { id, setId } = useContext(UserContext);

  const [detailMovie, setDetailMovie] = useState<AdminCore.Movie[] | any>([]);
  const idMovie = router.query.id as string;
  const [accountId, setAccountId] = useState<string>("");
  useEffect(() => {
    if (router.query) {
      setAccountId(idMovie);
    }
  }, [router, idMovie]);

  useEffect(() => {
    (async () => {
      try {
        const response = await Movie.getAll(idMovie);
        setDetailMovie(response?.movies || null);
      } catch (e) {
      } finally {
      }
    })();
  }, [idMovie]);

  const [listComment, setCommentList] = useState<AdminCore.Comment[] | any>([]);

  useEffect(() => {
    (async () => {
      try {
        const comments = await Comment.getCommentIdMovie(idMovie);
        const sortedComments = comments.sort((a: any, b: any) => {
          const dateA = new Date(a.createdAt || "");
          const dateB = new Date(b.createdAt || "");
          return +dateB - +dateA;
        });
        setCommentList(sortedComments);
      } catch (e) {
        console.error(e);
      } finally {
      }
    })();
  }, [idMovie]);

  console.log("idmovie", idMovie);
  useEffect(() => {
    (async () => {
      try {
        const response = await Genre.getAll("ALL");
        setGenreList(response.genres);
      } catch (e) {
        // Xử lý lỗi
      }
    })();
  }, []);
  const getGenreName = (genreId: number) => {
    const genre = genreList.find((genre) => genre.id === genreId);
    return genre ? genre.name : "";
  };

  const [listUsers, setListUser] = useState<AdminCore.User[] | any>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await User.getAllAuth("ALL");
        setListUser(response.users);
      } catch (e) {
      } finally {
      }
    })();
  }, []);

  //detail User

  const [detailUser, setDetailUser] = useState<AdminCore.User[] | any>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await User.getAllAuth(id);
        setDetailUser(response.users);
      } catch (e) {
      } finally {
      }
    })();
  }, [id]);
  console.log("idusermovie", id);
  console.log("user", idMovie);

  const [commentText, setCommentText] = useState("");
  const [addComment, setAddComment] = useState<AdminCore.Comment[] | any>([]);

  const handleCreate = async (newData: AdminCore.Comment) => {
    const newComment = {
      comment_text: commentText,
      user_id: id,
      movie_id: idMovie,
    };
    const result = await Comment.creatComment(newComment);
    const updatedCommentList = [newComment, ...listComment];
    setCommentList(updatedCommentList);
    // setAddComment(updatedCommentList);
    setCommentText("");
  };

  const getUserEmail = (userId: number) => {
    const user = listUsers.find((user: any) => user.id === userId);
    return user ? user.last_name + " " + user.first_name : "";
  };

  const getUserImage = (userId: number) => {
    const user = listUsers.find((user: any) => user.id === userId);
    return user ? user.image : "";
  };
  console.log("commentId", listComment);
  return (
    <>
      {detailMovie && (
        <div className={styles.movie_detail}>
          <Row>
            <Col span={24}>
              <p className={styles.movie_title_name}>
                Phim: {detailMovie.title}
              </p>
            </Col>
          </Row>
          <Row>
            <Col offset={2} span="10">
              {detailMovie.trailer_url && (
                <Player>
                  <source src={detailMovie.trailer_url} />
                </Player>
              )}
            </Col>
            <Col className={styles.col_content} span="10" offset={2}>
              <p className={styles.movie_title}>
                Diễn viên: <span>{detailMovie.director}</span>
              </p>
              <p className={styles.movie_title}>
                Thể loại: <span>{getGenreName(detailMovie.genres_id)}</span>
              </p>

              <p className={styles.movie_title}>
                Thời lượng: <span> {detailMovie.run_time} phút </span>
              </p>
              <p className={styles.movie_title}>
                Quốc Gia: <span> {detailMovie.countries}</span>
              </p>
              <p className={styles.movie_title}>
                Đạo Diễn: <span> {detailMovie.release_date}</span>
              </p>
              <p className={styles.movie_title}>
                Ngày Phát Hành:{" "}
                <span>
                  {moment(detailMovie.day_start).format("DD/MM/YYYY")}
                </span>
              </p>
              <div className={styles.btn}>
                {/* <Link legacyBehavior href={`/bookticker?id=${detailMovie.id}`}>
                  <Button className={styles.book_ticket}>Đặt Vé</Button>
                </Link> */}
                {id ? (
                  <Link
                    legacyBehavior
                    href={`/bookticker?id=${detailMovie.id}`}
                  >
                    <Button className={styles.book_ticket}>Đặt Vé</Button>
                  </Link>
                ) : (
                  <Button className={styles.book_ticket} disabled>
                    Đặt Vé
                  </Button>
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <p
                style={{ marginTop: "3rem" }}
                className={styles.movie_title_name}
              >
                Tóm Tắt
              </p>
              <p className={styles.content}>{detailMovie.description}</p>
            </Col>
          </Row>
        </div>
      )}
      <div className={styles.comment_movie}>
        <Row>
          <Col span={24}>
            <p className={styles.movie_title_name}> Bình Luận</p>
          </Col>
        </Row>
        {detailUser && (
          <Row className={styles.row_cmt}>
            <Col span={1} offset={2}>
              <Avatar src={detailUser.image}> </Avatar>
            </Col>
            <Col span={15}>
              {id ? (
                <Input
                  size="large"
                  placeholder="Nhập bình luận"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                ></Input>
              ) : (
                <Input
                  disabled
                  size="large"
                  placeholder="Bạn cần đăng nhập để có thể bình luận phim"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                ></Input>
              )}
            </Col>
            <Col>
              {id ? (
                <Button
                  className={styles.btn_add}
                  type="primary"
                  htmlType="submit"
                  onClick={() =>
                    handleCreate({
                      comment_text: commentText,
                      user_id: id,
                      movie_id: idMovie,
                    })
                  }
                >
                  Gửi
                </Button>
              ) : (
                <></>
              )}
            </Col>
          </Row>
        )}
        {listComment.length > 0 ? (
          <>
            <Row className={styles.comment_content}>
              <Col span={20}>
                <List
                  className={styles.list_comment}
                  itemLayout="vertical"
                  size="large"
                  pagination={{
                    onChange: (page) => {
                      console.log(page);
                    },
                    pageSize: 6,
                  }}
                  dataSource={[...addComment, ...listComment]}
                  renderItem={(item: any) => (
                    <List.Item>
                      <Skeleton
                        avatar
                        title={false}
                        loading={item.loading}
                        active
                      >
                        <List.Item.Meta
                          avatar={<Avatar src={getUserImage(item.user_id)} />}
                          title={getUserEmail(item.user_id)}
                          description={moment(item.createdAt).format(
                            "DD/MM/YYYY"
                          )}
                        />
                        <div>{item.comment_text}</div>
                      </Skeleton>
                    </List.Item>
                  )}
                />
              </Col>
            </Row>
          </>
        ) : (
          <>
            <p
              style={{
                textAlign: "center",
                marginBottom: "2rem",
                fontSize: "1.3rem",
              }}
            >
              Chưa có bình luận nào
            </p>
          </>
        )}
      </div>
    </>
  );
};
export default MovieDetail;
