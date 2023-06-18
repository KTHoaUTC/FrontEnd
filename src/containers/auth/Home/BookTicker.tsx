import Movie from "@/apis/movie";
import Theater from "@/apis/rap";
import Room from "@/apis/room";
import Seat from "@/apis/seat";
import ShowTimeApi from "@/apis/showtime";
import UserContext from "@/contexts/context";
import { LeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import {
  Button,
  Col,
  Collapse,
  Image,
  Row,
  Steps,
  Typography,
  message,
  theme,
} from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi"; // Nếu muốn hiển thị ngôn ngữ Tiếng Việt
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import styles from "./style.module.scss";
import Booking from "@/apis/booking";
import QRCode from "qrcode.react";
import axios from "axios";
import User from "@/apis/auth";
import Ticket from "@/apis/ticket";
import { CLIENT_ID } from "../../../config/config";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const { Panel } = Collapse;

dayjs.locale("vi"); // Nếu muốn hiển thị ngôn ngữ Tiếng Việt

const BookTicker: React.FC = () => {
  const { token } = theme.useToken();
  const [qrCodeData, setQRCodeData] = useState("");

  const router = useRouter();
  const { id, setId } = useContext(UserContext);

  const [detailUser, setListUsers] = useState<AdminCore.User[] | any>([]);
  const [isLoading, setIsLoading] = useState(true);
  // console.log("iduser", id);

  useEffect(() => {
    (async () => {
      try {
        const response = await User.getAllAuth(id);
        setListUsers(response.users);
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);
  // console.log("detail", detailUser);

  const idMovie = router.query.id as string;
  const [accountId, setAccountId] = useState<string>("");
  const [detail, setDetail] = useState<AdminCore.Movie>();

  useEffect(() => {
    if (router.query) {
      setAccountId(idMovie);
    }
  }, [router, idMovie]);

  //movie detail

  //lich chieu
  const [showtimeList, setShowTimeList] = useState<AdminCore.ShowTime[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await ShowTimeApi.getAllShowTimes("ALL");
        setShowTimeList(response.showtimes);
      } catch (e) {}
    })();
  }, []);
  //

  //rap chieu
  const [listTheaters, setListTheaters] = useState<AdminCore.Rap[] | any>([]);

  useEffect(() => {
    fetchTheaters();
  }, []);

  const fetchTheaters = async () => {
    try {
      const response = await Theater.getAll("ALL");
      setListTheaters(response.theaters);
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  //phong chieu
  const [roomList, setRoomList] = useState<AdminCore.Room[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await Room.getAllRooms("ALL");
        setRoomList(response.phongchieus);
      } catch (e) {}
    })();
  }, []);
  // console.log("room", roomList);

  //ghe
  const [seatList, setSeatList] = useState<AdminCore.Seat[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await Seat.getAllSeat("ALL");
        setSeatList(response.seats);
      } catch (e) {}
    })();
  }, []);
  // console.log("seat", seatList);

  useEffect(() => {
    (async () => {
      try {
        const response = await Movie.getAll(accountId);
        setDetail(response.movies);
        console.log("id", accountId);
        console.log("detail", detail);
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, [accountId]);

  const [current, setCurrent] = useState(0);

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

  //xu ly seat
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [total_price, setTotalPrice] = useState<number>(0);
  const [selectedShowtime, setSelectedShowtime] = useState<{
    time?: string;
    date?: string;
    theater?: string;
    gia_ve?: number;
    phongchieu_id?: number;
    user_id?: string | any;
    theater_id?: string | any;
    movie_id?: string | any;
    id?: number;
    seat_type_id?: number;
  }>({
    time: "",
    date: "",
    theater: "",
    gia_ve: 0,
    seat_type_id: 1,
  });

  const hanledBookStep1 = async (newData: AdminCore.Booking) => {
    setSelectedShowtime({
      ...selectedShowtime,
    });
    const selectedShowtimeObj = showtimeList.find(
      (showtime) =>
        dayjs(showtime.ngay_chieu).format("DD/MM/YY") ===
          selectedShowtime.date &&
        dayjs(showtime.gio_chieu).format("HH:mm") === selectedShowtime.time
    );

    if (selectedShowtimeObj && typeof selectedShowtimeObj.money === "string") {
      const gia_ve = parseInt(selectedShowtimeObj.money, 10);
      const phongchieu = selectedShowtimeObj.phongchieu_id;
      setSelectedShowtime((prevShowtime) => ({
        ...prevShowtime,
        gia_ve: gia_ve,
        phongchieu_id: phongchieu,
      }));
    }
    setCurrent(1);
  };
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);

  const handleSeatSelection = (seatNumber: number) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats((prevSeats) =>
        prevSeats.filter((seat) => seat !== seatNumber)
      );
      setTotalPrice((prevPrice) => {
        const updatedPrice = selectedShowtime?.gia_ve ?? 0;
        return prevPrice - updatedPrice;
      });
    } else {
      setSelectedSeats((prevSeats) => [...prevSeats, seatNumber]);
      setTotalPrice((prevPrice) => {
        const updatedPrice = selectedShowtime?.gia_ve ?? 0;
        return prevPrice + updatedPrice;
      });

      const newSeatData = {
        showtime_id: selectedShowtime?.id,
        row: seatNumber,
        seat_number: seatNumber,
        status: 0,
      };
      creatSeat(newSeatData)
        .then((response) => {
          const result = response.data.seat;
          setSelectedSeatIds((prevIds) => [...prevIds, result]);
          console.log("idseat", result);
        })
        .catch((error) => {});
    }
  };
  const creatSeat = (newData: AdminCore.Seat) => {
    return axios.post(
      "http://localhost:8888/gateway/api/v1/create-seat",
      newData
    );
  };

  const editSeat = (seatId: string, newStatus: number) => {
    const updateData = {
      id: seatId,
      status: newStatus,
    };

    return axios.put(
      "http://localhost:8888/gateway/api/v1/edit-seat",
      updateData
    );
  };

  const selectedRoom = roomList.find(
    (room) => room.id === selectedShowtime.phongchieu_id
  );
  const tenPhongChieu = selectedRoom ? selectedRoom.name : "";
  const sum_seat = selectedRoom ? selectedRoom.sum_seat : "";

  const seatString = selectedSeats.join(", ");

  const hanledBookStep2 = async (newData: AdminCore.Booking) => {
    setSelectedShowtime((prevShowtime) => ({
      ...prevShowtime,
      total_price: total_price,
      selectedSeats: selectedSeats,
      user_id: detailUser?.id,
      movie_id: detail?.id,
      date: selectedShowtime.date,
      time: selectedShowtime.time,
    }));
    setCurrent(2);
  };

  const [bookingId, setBookingId] = useState("");

  const hanledBookStep3 = async (newData: AdminCore.Booking) => {
    setSelectedShowtime((prevShowtime) => ({
      ...prevShowtime,
      total_price: total_price,
      selectedSeats: selectedSeats,
      phongchieu_id: selectedRoom?.id,
      user_id: detailUser?.id,
      movie_id: detail?.id,
      date: selectedShowtime.date,
      time: selectedShowtime.time,
    }));
    const qrCodeData = JSON.stringify({
      title: detail?.title,
      theater: selectedShowtime.theater,
      date: selectedShowtime.date,
      time: selectedShowtime.time,
      room: tenPhongChieu,
      seats: seatString,
      totalPrice: total_price,
      user_id: detailUser?.id,
    });
    setQRCodeData(qrCodeData);

    try {
      const result = await Booking.creatBooking(selectedShowtime);
      const createdBookingId = result.data.bookings.id;
      setBookingId(createdBookingId);
      console.log("idbookig", result.data.bookings.id);

      const ticketData = {
        booking_id: createdBookingId,
        qrCode: qrCodeData,
      };

      const ticketResult = await Ticket.createTicket(ticketData);
      console.log("ticket", ticketResult);
      setCurrent(3);
    } catch (error) {
      console.error("Error booking:", error);
    }
    console.log("step2", selectedShowtime);
    const editSeatPromises = selectedSeatIds.map((seatId) =>
      editSeat(seatId, 1)
    );

    try {
      await Promise.all(editSeatPromises);
      console.log("Seats updated successfully");
    } catch (error) {
      console.error("Error updating seats:", error);
    }

    console.log("step2", selectedShowtime);
  };

  //step 4
  // const [showQRCode, setShowQRCode] = useState(false);
  //payment

  const [show, setShow] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const exchangeRate = 0.000043; // Đây là một giá trị giả định, hãy thay thế bằng tỷ giá hối đoái thực tế của bạn

  const amountUSD = total_price * exchangeRate;

  // creates a paypal order
  const createOrder = (data: any, actions: any) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: detail?.title,
            amount: {
              currency_code: "USD",
              value: amountUSD,
            },
          },
        ],
      })
      .then((orderID: any) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  // check Approval
  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then(function (details: any) {
      const { payer, id } = details;
      setPaymentSuccess(true);
      // setSuccess(true);
      setOrderID(id);
    });
  };

  useEffect(() => {
    if (paymentSuccess) {
      message.success("Payment successful!");
      console.log("Order successful. Your order id is:", orderID);
    }
  }, [paymentSuccess, orderID]);

  //
  const steps = [
    {
      title: "Chọn Thông Tin Vé",
      content: (
        <div className={styles.step_1}>
          <Typography.Title className={styles.form_title} level={2}>
            <h1>Chọn thông tin vé</h1>
          </Typography.Title>

          <Row className={styles.step_}>
            <Col className={styles.step_img} span={10} offset={2}>
              <Image
                className={styles.img}
                width={450}
                height={650}
                src={detail?.poster_url}
              />
            </Col>
            <Col className={styles.step_content} span={11} offset={2}>
              {detail && (
                <div>
                  <h2
                    style={{
                      color: "black",
                      fontSize: "1.5rem",
                      paddingTop: "0rem",
                      textAlign: "center",
                    }}
                  >
                    Phim: {detail.title}
                  </h2>
                  <h2>Danh sách các rạp chiếu phim:</h2>
                  {listTheaters.length > 0 ? (
                    listTheaters.map((theater: any) => {
                      const showtimesForTheater = showtimeList.filter(
                        (showtime) =>
                          showtime.movie_id === detail.id &&
                          showtime.theater_id === theater.id
                      );

                      const groupedShowtimes = showtimesForTheater.reduce(
                        (accumulator, showtime) => {
                          const formattedDate = dayjs(
                            showtime.ngay_chieu
                          ).format("DD/MM/YY");
                          if (accumulator[formattedDate]) {
                            accumulator[formattedDate].push(showtime);
                          } else {
                            accumulator[formattedDate] = [showtime];
                          }
                          return accumulator;
                        },
                        {}
                      );

                      const hasShowtimes =
                        Object.keys(groupedShowtimes).length > 0;

                      return (
                        <div key={theater.id}>
                          <Collapse accordion>
                            <Panel
                              className={styles.panel}
                              header={theater.name}
                              key={theater.id}
                            >
                              {hasShowtimes ? (
                                Object.entries(groupedShowtimes).map(
                                  ([formattedDate, showtimes]) => (
                                    <div key={formattedDate}>
                                      <Button className={styles.btn_date}>
                                        <h3> {formattedDate}</h3>
                                      </Button>

                                      {showtimes.map((showtime: any) => {
                                        const formattedTime = dayjs(
                                          showtime.gio_chieu
                                        ).format("HH:mm");
                                        const isButtonSelected =
                                          selectedShowtime?.time ===
                                            formattedTime &&
                                          selectedShowtime?.date ===
                                            formattedDate;

                                        return (
                                          <>
                                            <div key={showtime.id}>
                                              <Button
                                                className={`${
                                                  styles.btn_time
                                                } ${
                                                  isButtonSelected
                                                    ? styles.selected
                                                    : ""
                                                }`}
                                                onClick={() =>
                                                  setSelectedShowtime({
                                                    time: formattedTime,
                                                    date: formattedDate,
                                                    theater: theater.name,
                                                    theater_id: theater.id,
                                                    id: showtime.id,
                                                  })
                                                }
                                              >
                                                {formattedTime}
                                              </Button>
                                            </div>
                                          </>
                                        );
                                      })}
                                    </div>
                                  )
                                )
                              ) : (
                                <p
                                  style={{
                                    textAlign: "center",
                                    color: "red",
                                  }}
                                >
                                  Không có suất chiếu nào
                                </p>
                              )}
                            </Panel>
                          </Collapse>
                        </div>
                      );
                    })
                  ) : (
                    <p>Không có rạp chiếu phim</p>
                  )}
                </div>
              )}
            </Col>
          </Row>
          <div className={styles.btn}>
            <Button
              onClick={hanledBookStep1}
              className={styles.btn_next}
              type="primary"
              htmlType="submit"
            >
              Tiếp theo
            </Button>
          </div>
        </div>
      ),
    },

    {
      title: "Chọn ghế ngồi",
      content: (
        <div className={styles.step_1}>
          <Typography.Title className={styles.form_title} level={2}>
            <h1> Chọn ghế ngồi</h1>
          </Typography.Title>

          {detail && (
            <div className={styles.step_2_}>
              <Row>
                <Col span={16}>
                  <div className={styles.seat}>
                    <p className={`${styles.img} ${styles.blink}`}>
                      <img style={{ width: "100%" }} src="/gggg.jpg"></img>
                    </p>

                    <h2>Phòng: {tenPhongChieu}</h2>
                    <div className={styles.list_seat}>
                      {/* {Array.from({ length: sum_seat }, (_, index) => {
                        const seatNumber = index + 1;
                        const seat = seatList.find(
                          (seat) => seat.row === seatNumber
                        );

                        const isSelected = selectedSeats.includes(seatNumber);
                        const seatClass = isSelected
                          ? styles.seat_button_selected
                          : styles.seat_button;
                        const isSold =
                          seat &&
                          typeof seat.status === "number" &&
                          seat.status === 1 &&
                          seat.showtime_id === selectedShowtime.id;
                        const seatStatusClass = isSold
                          ? styles.seat_button_sold
                          : "";
                        const isDisabled = isSold ? true : false;
                        console.log("seatlist", seatList);
                        console.log("seatteat", seat);

                        return (
                          <div className={styles.button_} key={seatNumber}>
                            <Button
                              className={`${seatClass} ${seatStatusClass}`}
                              onClick={() => handleSeatSelection(seatNumber)}
                              disabled={isDisabled}
                            >
                              {seatNumber}
                            </Button>
                          </div>
                        );
                      })} */}
                      {Array.from({ length: sum_seat }, (_, index) => {
                        const seatNumber = index + 1;
                        const seatsWithMatchingShowtime = seatList.filter(
                          (seat) =>
                            seat.row === seatNumber &&
                            seat.showtime_id === selectedShowtime?.id
                        );

                        const isSelected = selectedSeats.includes(seatNumber);
                        const seatClass = isSelected
                          ? styles.seat_button_selected
                          : styles.seat_button;
                        const isSold = seatsWithMatchingShowtime.some(
                          (seat) =>
                            typeof seat.status === "number" && seat.status === 1
                        );
                        const seatStatusClass = isSold
                          ? styles.seat_button_sold
                          : "";
                        const isDisabled = isSold ? true : false;

                        console.log("seatlist", seatList);
                        console.log(
                          "seatsWithMatchingShowtime",
                          seatsWithMatchingShowtime
                        );

                        return (
                          <div className={styles.button_} key={seatNumber}>
                            <Button
                              className={`${seatClass} ${seatStatusClass}`}
                              onClick={() => handleSeatSelection(seatNumber)}
                              disabled={isDisabled}
                            >
                              {seatNumber}
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                    <div className={styles.note_seat}>
                      <div className={styles.icon_seat}>
                        <Button className={styles.icon_seat_empty} />
                        Ghế trống
                      </div>
                      <div className={styles.icon_seat}>
                        <Button className={styles.icon_seat_select} />
                        Ghế đã bán
                      </div>
                      <div className={styles.icon_seat}>
                        <Button className={styles.icon_seat_booked} />
                        Ghế đang chọn
                      </div>
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className={styles.col_list}>
                    <p className={`${styles.ticket_price} ${styles.blink}`}>
                      Giá vé: {selectedShowtime?.gia_ve} VND
                    </p>
                    <h2>Danh sách ghế đã chọn:</h2>

                    {selectedSeats.length > 0 && (
                      <div>
                        <ul>
                          {selectedSeats.map((seat) => (
                            <div className={styles.list_seat}>
                              <Button className={styles.btn_seat}>
                                <li key={seat}>Ghế số {seat}</li>
                              </Button>
                            </div>
                          ))}
                        </ul>
                        <hr></hr>
                      </div>
                    )}
                    <p className={styles.sum_price}>
                      Tổng tiền: {total_price} VND
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          )}
          <div className={styles.btn}>
            {current > 0 && (
              <Button
                className={styles.btn_return}
                type="primary"
                onClick={() => prev()}
              >
                Quay lại
              </Button>
            )}
            <Button
              className={styles.btn_next}
              onClick={hanledBookStep2}
              type="primary"
              htmlType="submit"
            >
              Tiếp theo
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: "Xác nhận",
      content: (
        <div className={styles.step_1}>
          <Typography.Title className={styles.form_title} level={2}>
            <h1> Xác nhận Thông Tin</h1>
          </Typography.Title>
          <Row className={styles.row_step3}>
            <Col span={12}>
              <div className={styles.title}>Thông tin vé </div>
              <div>
                <p> Phim: {detail?.title}</p>

                <p> Rạp: {selectedShowtime.theater}</p>
                <p> Địa chỉ :68Cầu Giấy</p>
                <p>
                  Thời Gian: {selectedShowtime.date} - {selectedShowtime.time}
                </p>
                <p>Phòng Chiếu: {tenPhongChieu}</p>
                <p>Ghế: {seatString}</p>
                <p> Tổng tiền: {total_price} VND</p>
              </div>
            </Col>
            <Col span={12}>
              <div className={styles.title}> Thông Tin Cá Nhân</div>
              <div>
                <p> Email: {detailUser?.email}</p>
                <p>Phone: {detailUser?.phone_number} </p>
              </div>
              <PayPalScriptProvider options={{ clientId: CLIENT_ID }}>
                <div>
                  {/* <div className="product-price-btn"> */}
                  <Button
                    className={styles.buy_btn}
                    type="primary"
                    onClick={() => setShow(true)}
                  >
                    Thanh Toán
                  </Button>
                  {/* </div> */}

                  <br></br>
                  {show ? (
                    <PayPalButtons
                      className={styles.paypal_btn}
                      style={{ layout: "vertical" }}
                      createOrder={createOrder}
                      onApprove={onApprove}
                    />
                  ) : null}
                </div>
              </PayPalScriptProvider>
            </Col>
          </Row>
          <Row className={styles.row_step3}></Row>
          <div className={styles.btn}>
            {current > 0 && (
              <Button
                className={styles.btn_return}
                type="primary"
                onClick={() => prev()}
              >
                Quay lại
              </Button>
            )}
            <Button
              className={styles.btn_next}
              onClick={hanledBookStep3}
              type="primary"
              htmlType="submit"
              disabled={!paymentSuccess}
            >
              Đặt Vé
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: "Đặt vé thành công",
      content: (
        <div className={styles.step_1}>
          <Row>
            {/* <Col span={9}>
              <p> Chọn Phương Thức Thanh Toán </p>
              <Button onClick={() => setShowQRCode(true)}>Xác nhận</Button>
            </Col> */}
            <Col span={24}>
              {/* {showQRCode && ( */}
              <div className={styles.qrcode}>
                {/* Các nội dung khác của Bước 4 */}
                <p className={styles.qrcode_title}>Mã vé </p>

                <QRCode className={styles.qrcode_text} value={qrCodeData} />

                <p>Vui lòng đưa mã cho nhân viên để được lấy vé!! </p>
                <Link href={"/lichsu"}>
                  <p className={styles.history}>Xem Lịch Sử</p>
                </Link>
              </div>
              {/* )} */}
            </Col>
          </Row>
        </div>
      ),
    },
  ];
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    marginTop: 46,
    marginBottom: 40,
  };

  return (
    <>
      <Link className={styles.link} href="/auth">
        <p>
          <LeftOutlined />
          Quay lại
        </p>
      </Link>
      <h2 className={styles.title_book}>ĐẶT VÉ</h2>
      <Steps className={styles.step} current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
    </>
  );
};

export default BookTicker;
