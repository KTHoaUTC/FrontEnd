import React, { useState } from "react";
import { Button, Col, Modal, Row } from "antd";
import ReactPlayer from "react-player";
import styles from "./style.module.scss";
import Link from "next/link";

const ModalDetail: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  const handleToggleTrailer = () => {
    setShowTrailer(!showTrailer);
  };
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
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
          <Row>
            <Col span="12">
              <ReactPlayer
                className={styles.movie_trailer}
                url="https://www.youtube.com/watch?v=pg4L29p98Kw"
              />
            </Col>
            <Col className={styles.col_content} span="10" offset={2}>
              <p className={styles.movie_title_name}>
                {" "}
                RENFIELD TAY SAI CỦA QUỶ
              </p>
              <p className={styles.movie_title}>
                Đạo diễn: <span>Chris McKay</span>
              </p>
              <p className={styles.movie_title}>
                Diễn viên: <span>Nicolas Cage, Nicholas Hoult, Awkwafina</span>
              </p>
              <p className={styles.movie_title}>
                Thể loại: <span>Hài, Kinh Dị</span>
              </p>
              <p className={styles.movie_title}>
                Khởi chiếu: <span>14/04/2023</span>
              </p>
              <p className={styles.movie_title}>
                Thời lượng: <span> 91 phút 84 giây</span>
              </p>
              <p className={styles.movie_title}>
                Ngôn ngữ: <span> Tiếng Anh - Phụ đề Tiếng Việt</span>
              </p>
              <p className={styles.movie_title}>
                Rate:<span>Chris McKay</span>
              </p>
              <div className={styles.btn}>
                <Link legacyBehavior href={"/bookticker"}>
                  <Button className={styles.book_ticket}>Đặt Vé</Button>
                </Link>
              </div>
            </Col>
          </Row>
          <Row>
            <p className={styles.content}>
              Trong câu chuyện quái vật hiện đại về người hầu trung thành của
              Dracula, Renfield (do Nicholas Hoult thủ vai), kẻ bề tôi đáng
              thương của ông chủ tự ái nhất lịch sử, Dracula (do Nicolas Cage
              thủ vai). Renfield bị buộc phải bắt con mồi về cho chủ nhân và
              thực hiện mọi mệnh lệnh, kể cả việc đó nhục nhã như thế nào. Nhưng
              giờ đây, sau nhiều thế kỷ làm nô lệ, Renfield đã sẵn sàng để khám
              phá cuộc sống bên ngoài cái bóng của Hoàng Tử Bóng Đêm. Liệu anh
              ấy có thể tìm được cách để thoát khỏi mỗi quan hệ độc hại này?
            </p>
          </Row>
        </div>
      </Modal>
    </>
  );
};
export default ModalDetail;
