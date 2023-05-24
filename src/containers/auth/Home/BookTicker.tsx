import Movie from "@/apis/movie";
import Theater from "@/apis/rap";
import Room from "@/apis/room";
import Seat from "@/apis/seat";
import ShowTimeApi from "@/apis/showtime";
import UserContext from "@/contexts/context";
import { LeftOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Collapse,
  Image,
  Row,
  Steps,
  Typography,
  theme,
} from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi"; // Nếu muốn hiển thị ngôn ngữ Tiếng Việt
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import styles from "./style.module.scss";
const { Panel } = Collapse;

dayjs.locale("vi"); // Nếu muốn hiển thị ngôn ngữ Tiếng Việt

const BookTicker: React.FC = () => {
  const { token } = theme.useToken();
  const router = useRouter();
  const { email, setEmail } = useContext(UserContext);
  console.log("bookemail", email);
  const id = router.query.id as string;
  const [accountId, setAccountId] = useState<string>("");
  const [detail, setDetail] = useState<AdminCore.Movie>();

  useEffect(() => {
    if (router.query) {
      setAccountId(id);
    }
  }, [router, id]);

  const [isLoading, setIsLoading] = useState(true);
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
  console.log("showtime", showtimeList);
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
  console.log("room", roomList);

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
  console.log("seat", seatList);

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
    theater_id?: string | any;
    movie_id?: string | any;
  }>({
    time: "",
    date: "",
    theater: "",
    gia_ve: 0,
  });

  // console.log("state1", selectedShowtime);

  //luu tru state
  // const [booking, setBooking] = useState<AdminCore.Booking>();

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
    }
  };

  const selectedRoom = roomList.find(
    (room) => room.id === selectedShowtime.phongchieu_id
  );
  const tenPhongChieu = selectedRoom ? selectedRoom.name : "";
  const sum_seat = selectedRoom ? selectedRoom.sum_seat : "";

  const test = seatList.find(
    (seat) => seat.phongchieu_id === selectedShowtime.phongchieu_id
  );
  const seatString = selectedSeats.join(", ");

  const hanledBookStep2 = async (newData: AdminCore.Booking) => {
    setSelectedShowtime((prevShowtime) => ({
      ...prevShowtime,
      total_price: total_price,
      selectedSeats: selectedSeats,
    }));
    setCurrent(2);
  };

  const hanledBookStep3 = async (newData: AdminCore.Booking) => {
    const updatedShowtime = {
      ...selectedShowtime,
      total_price: total_price,
      selectedSeats: selectedSeats,
    };
    try {
      // const result = await Booking.creatBooking(updatedShowtime);
      setCurrent(3);
      // console.log('bookingtest',result.data)
      // console.log("step3", updatedShowtime);
    } catch (error) {
      console.error("Error booking:", error);
      // Xử lý lỗi khi đặt vé không thành công
    }
    //   const result = await Booking.creatBooking(selectedShowtime);
    //   setCurrent(3);
    console.log("step2", selectedShowtime);
  };

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
              <Image width={450} height={500} src={detail?.poster_url} />
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
                                        return (
                                          <>
                                            <div key={showtime.id}>
                                              <Button
                                                className={styles.btn_time}
                                                onClick={() =>
                                                  setSelectedShowtime({
                                                    time: formattedTime,
                                                    date: formattedDate,
                                                    theater: theater.name,
                                                    theater_id: theater.id,
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
                                  {" "}
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
                    {/* <h2> tong ghe: {sum_seat}</h2> */}

                    <div className={styles.list_seat}>
                      {Array.from({ length: sum_seat }, (_, index) => {
                        const seatNumber = index + 1;
                        const isSelected = selectedSeats.includes(seatNumber);
                        const seatClass = isSelected
                          ? styles.seat_button_selected
                          : styles.seat_button;

                        return (
                          <div className={styles.button_}>
                            <Button
                              key={seatNumber}
                              className={seatClass}
                              onClick={() => handleSeatSelection(seatNumber)}
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
                      Giá vé: {selectedShowtime.gia_ve} VND
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
                <p>Thanh Toán: {total_price} VND</p>
              </div>
            </Col>
            <Col span={12}>
              <div className={styles.title}> Thông Tin Cá Nhân</div>
              <div>
                <p> Email {email}</p>
                <p>Phone: 339242 </p>
              </div>
            </Col>
          </Row>
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
            >
              Đặt Vé
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: "Đặt vé thành công",
      content: "Last-content",
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
