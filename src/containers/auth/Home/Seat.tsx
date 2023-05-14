import { BorderOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import { CSSProperties, useState } from "react";
import styles from "./style.module.scss";

const SeatButtons = () => {
  const [selectedSeat, setSelectedSeat] = useState(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const bookedSeats = [5, 10, 15];
  // const selectedSeat = 20;

  const [ticketQuantity, setTicketQuantity] = useState(1);
  const defaultTicketPrice = 60000;

  const handleIncreaseQuantity = () => {
    setTicketQuantity(ticketQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (ticketQuantity > 1) {
      setTicketQuantity(ticketQuantity - 1);
    }
  };

  const ticketPrice = defaultTicketPrice * ticketQuantity;
  const seatButtons = [];
  for (let i = 1; i <= 50; i++) {
    let seatClass = "empty-seat";
    let seatStyle: CSSProperties = {};
    if (bookedSeats.includes(i)) {
      seatStyle.width = "3rem";
      seatStyle.backgroundColor = "red";
    } else if (i === selectedSeat) {
      seatClass = "selected-seat";
      seatStyle.width = "3rem";
      seatStyle.backgroundColor = "yellow";
    } else {
      seatStyle.width = "3rem";
      seatStyle.backgroundColor = "green";
    }
    seatButtons.push(
      <Button
        style={{
          textAlign: "center",
          marginLeft: "1rem",
          marginTop: "1rem",
          ...seatStyle,
        }}
        key={i}
        className={seatClass}
        onClick={() => handleClick(i)}
      >
        {i}
      </Button>
    );
  }
  const handleClick = (seatNumber: number) => {
    // Kiểm tra xem ghế đã bán chưa
    if (bookedSeats.includes(seatNumber)) {
      console.log(`Ghế số ${seatNumber} đã được đặt trước`);
      return;
    }

    // Nếu ghế đã được chọn rồi, bỏ chọn ghế này
    if (selectedSeats.includes(seatNumber)) {
      const updatedSeats = selectedSeats.filter((seat) => seat !== seatNumber);
      setSelectedSeats(updatedSeats);
      setSelectedSeat(0);
      setTotalPrice(
        updatedSeats.reduce((total, seat) => total + defaultTicketPrice, 0)
      );
      return;
    }

    // Cập nhật số ghế và giá tiền
    setSelectedSeat(seatNumber);
    const updatedSeats = [...selectedSeats, seatNumber];
    setSelectedSeats(updatedSeats);
    setTotalPrice(
      updatedSeats.reduce((total, seat) => total + defaultTicketPrice, 0)
    );
  };
  return (
    <>
      <Row>
        <Col span={16}>
          {" "}
          <div style={{ textAlign: "center" }}>
            <img style={{ width: "50%", height: "5rem" }} src="/gggg.jpg"></img>
            <div
              style={{
                textAlign: "center",
                alignItems: "center",
                margin: "0 auto",
                maxWidth: "50%",
              }}
            >
              {seatButtons}
            </div>
            <div className={styles.note_seat}>
              <div className={styles.icon_seat}>
                <BorderOutlined className={styles.icon_seat_empty} />
                ghế trống
              </div>
              <div className={styles.icon_seat}>
                <BorderOutlined className={styles.icon_seat_select} />
                ghế đã bán
              </div>
              <div className={styles.icon_seat}>
                <BorderOutlined className={styles.icon_seat_booked} />
                ghế đang chọn
              </div>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div className={styles.col_list}>
            <h2>Danh sách ghế đã chọn:</h2>

            <p>Giá vé: 60000</p>

            {selectedSeats.length > 0 && (
              <div>
                <ul>
                  {selectedSeats.map((seat) => (
                    <div className={styles.list_seat}>
                      <li key={seat}>Ghế số {seat}</li>
                    </div>
                  ))}
                </ul>
                <hr></hr>
                <p className={styles.sum_price}>
                  Thành Tiền: {totalPrice} VND
                </p>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default SeatButtons;
