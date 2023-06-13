import Genre from "@/apis/genre";
import Movie from "@/apis/movie";
import { Button, Col, Modal, Row } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import styles from "./style.module.scss";
import moment from "moment";
interface ModalDetailProps {
  movieId?: any;
}

const ModalDetail: React.FC<ModalDetailProps> = ({ movieId }) => {
  const [open, setOpen] = useState(false);
  const [genreList, setGenreList] = useState<AdminCore.Genre[]>([]);
  const [detail, setDetail] = useState<AdminCore.Movie[] | any>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await Movie.getAll(movieId);
        setDetail(response.movies);
      } catch (e) {
      } finally {
      }
    })();
  }, [movieId]);
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
  return (
    <>
      <Button
        className={styles.book_ticket}
        type="primary"
        onClick={() => setOpen(true)}
      >
        Xem Chi Tiết
      </Button>
      <Modal
        className={styles.modal_detail}
        title={<p className={styles.modal_title}> Nội Dung Phim</p>}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer
        width={1300}
      >
        <div>
          <Row className={styles.row_model}>
            <Col span="12" className={styles.col_trailer}>
              <Player>
                <source src={detail.trailer_url} />
              </Player>
            </Col>
            <Col className={styles.col_content} span="10" offset={2}>
              <p className={styles.movie_title_name}>{detail.title}</p>
              <p className={styles.movie_title}>
                Diễn viên: <span>{detail.director}</span>
              </p>
              <p className={styles.movie_title}>
                Thể loại: <span>{getGenreName(detail.genres_id)}</span>
              </p>

              <p className={styles.movie_title}>
                Thời lượng: <span> {detail.run_time} phút </span>
              </p>
              <p className={styles.movie_title}>
                Quốc Gia: <span> {detail.countries}</span>
              </p>
              <p className={styles.movie_title}>
                Đạo Diễn: <span> {detail.release_date}</span>
              </p>
              <p className={styles.movie_title}>
                Ngày Phát Hành:{" "}
                <span>{moment(detail.day_start).format("DD/MM/YYYY")}</span>
              </p>
              <div className={styles.btn}>
                <Link legacyBehavior href={`/bookticker?id=${detail.id}`}>
                  <Button className={styles.book_ticket}>Đặt Vé</Button>
                </Link>
              </div>
            </Col>
          </Row>
          <Row>
            <p className={styles.content}>{detail.description}</p>
          </Row>
          <Row>
            <Link legacyBehavior href={`/movie?id=${detail.id}`}>
              <p className={styles.content1}>Xem Thêm</p>
            </Link>
          </Row>
        </div>
      </Modal>
    </>
  );
};
export default ModalDetail;
