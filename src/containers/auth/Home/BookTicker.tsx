import { Button, Col, Collapse, Image, message, Row, Steps, theme } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi"; // Nếu muốn hiển thị ngôn ngữ Tiếng Việt
import React, { useState } from "react";
import SeatButtons from "./Seat";
import styles from "./style.module.scss";
const { Panel } = Collapse;

dayjs.locale("vi"); // Nếu muốn hiển thị ngôn ngữ Tiếng Việt

const BookTicker: React.FC = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(dayjs());
  const startOfMonth = selectedDate?.startOf("month");
  const endOfMonth = selectedDate?.endOf("month");
  const datesOfMonth = [];
  let currentDate = startOfMonth;

  if (endOfMonth) {
    while (currentDate && currentDate <= endOfMonth) {
      datesOfMonth.push(currentDate);
      currentDate = currentDate.add(1, "day");
    }
  }

  const steps = [
    {
      title: "Chọn thông tin vé",
      content: (
        <div className={styles.step_1}>
          <Row>
            <h1> Chọn thông tin vé</h1>
          </Row>
          <Row className={styles.step_}>
            <Col className={styles.step_img} span={10} offset={2}>
              <Image width={450} height={500} src="/doremon.jpg" />
            </Col>
            <Col className={styles.step_content} span={11} offset={2}>
              <h2>Chọn ngày xem phim:</h2>
              <div className={styles.list_scroll}>
                <div style={{ display: "flex" }}>
                  {datesOfMonth.map((date) => (
                    <div
                      className={styles.list_date}
                      key={date.format("DD-MM-YYYY")}
                      onClick={() => setSelectedDate(date)}
                      style={{
                        backgroundColor: date.isSame(selectedDate, "day")
                          ? "#1890ff"
                          : "#fff",
                        color: date.isSame(selectedDate, "day")
                          ? "#fff"
                          : "#000",
                      }}
                    >
                      <div>{date.format("ddd")}</div>
                      <div>{date.format("DD-MM")}</div>
                    </div>
                  ))}
                </div>
              </div>
              <h2 style={{ paddingTop: "2rem" }}>
                Danh sách các rạp chiếu phim:
              </h2>
              <Collapse accordion>
                <Panel
                  className={styles.panel}
                  header="BHH Star 3.2 Quận 10, TPHCM"
                  key="1"
                >
                  <Button className={styles.btn_time}>09:00 AM</Button>
                  <Button className={styles.btn_time}>11:00 AM</Button>
                </Panel>
                <Panel
                  className={styles.panel}
                  header="BHH Star 3.2 Cầu Giấy, Hà Nội"
                  key="2"
                >
                  <Button className={styles.btn_time}>09:00 AM</Button>
                  <Button className={styles.btn_time}>11:00 AM</Button>
                </Panel>
                <Panel
                  className={styles.panel}
                  header="BHH Star 3.4 Hồ Tây, Hà Nội"
                  key="3"
                >
                  <Button className={styles.btn_time}>09:00 AM</Button>
                  <Button className={styles.btn_time}>11:00 AM</Button>
                </Panel>
              </Collapse>
            </Col>
          </Row>
        </div>
      ),
    },

    {
      title: "Chọn ghế ngồi",
      content: (
        <div className={styles.step_1}>
          <Row>
            <h1> Chọn ghế ngồi</h1>
          </Row>
          <SeatButtons></SeatButtons>
        </div>
      ),
    },
    {
      title: "Xác nhận",
      content: "Last-content",
    },
    {
      title: "Đặt vé thành công",
      content: "Last-content",
    },
  ];
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    marginTop: 46,
  };

  return (
    <>
      <h2 className={styles.title_book} style={{ marginTop: "8rem" }}>
        ĐẶT VÉ
      </h2>
      <Steps className={styles.step} current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div style={{ textAlign: "center", marginTop: 24, marginBottom: 24 }}>
        {current > 0 && (
          <Button
            className={styles.btn_next}
            style={{ margin: "0 8px" }}
            onClick={() => prev()}
          >
            Quay Lại
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button
            className={styles.btn_next}
            type="primary"
            onClick={() => next()}
          >
            Tiếp Theo
          </Button>
        )}{" "}
        {current === steps.length - 1 && (
          <Button
            className={styles.btn_next}
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Hoàn Thành
          </Button>
        )}
      </div>
    </>
  );
};

export default BookTicker;
