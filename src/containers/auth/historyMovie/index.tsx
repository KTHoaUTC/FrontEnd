import Booking from "@/apis/booking";
import UserContext from "@/contexts/context";
import { Avatar, List, QRCode } from "antd";
import React, { useContext, useEffect, useState } from "react";
import styles from "./style.module.scss";
import Movie from "@/apis/movie";
import Theater from "@/apis/rap";
import Ticket from "@/apis/ticket";
import moment from "moment";
import { sortBy } from "lodash";

const HistoryMovie: React.FC = () => {
  const [listBooking, setBooking] = useState<AdminCore.Booking[] | any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      try {
        const bookings = await Booking.getUserBookings(id);
        setBooking(bookings);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);
  const [movieList, setMovieList] = useState<AdminCore.Movie[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await Movie.getAll("ALL");
        setMovieList(response.movies);
        console.log("movieList", movieList);
      } catch (e) {}
    })();
  }, []);
  const [theaterList, setTheaterList] = useState<AdminCore.Room[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await Theater.getAll("ALL");
        setTheaterList(response.theaters);
        console.log("movieList", movieList);
      } catch (e) {}
    })();
  }, []);
  const [ticketList, setTicketList] = useState<AdminCore.Ticket[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await Ticket.getAllTickets("ALL");
        setTicketList(response.tickets);
      } catch (e) {}
    })();
  }, []);
  console.log("ticketList", ticketList);

  const getMovieName = (movieId: number) => {
    const movie = movieList.find((movie) => movie.id === movieId);
    return movie ? movie.title : "";
  };
  const getMovieImage = (movieId: number) => {
    const movie = movieList.find((movie) => movie.id === movieId);
    return movie ? movie.image_url : "";
  };
  const getTheaterName = (theaterId: number) => {
    const theater = theaterList.find((theater) => theater.id === theaterId);
    return theater ? theater.name : "";
  };
  const getTicketsByBookingId = (bookingId: any) => {
    return ticketList.filter((ticket) => ticket.booking_id === bookingId);
  };
  const sortedBookings = listBooking.sort((a: any, b: any) =>
    moment(b.createdAt).diff(moment(a.createdAt))
  );
  return (
    <>
      <h1 className={styles.title}>Lịch Sử Đặt Vé</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : listBooking.length === 0 ? (
        <p className={styles.mess}>Bạn chưa có lịch sử đặt vé nào.</p>
      ) : (
        <List
          className={styles.list}
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 3,
          }}
          dataSource={sortedBookings}
          renderItem={(booking: AdminCore.Booking) => (
            <List.Item
              className={styles.list_item}
              key={booking.id}
              extra={
                <div>
                  {getTicketsByBookingId(booking.id).map((ticket) => (
                    <div key={ticket.id}>
                      <div>
                        <QRCode
                          className={styles.list_qrCode}
                          value={ticket.qrCode}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={getMovieImage(booking.movie_id)} />}
                title={<a href="#">{getMovieName(booking.movie_id)}</a>}
                description={<p>Rạp: {getTheaterName(booking.theater_id)}</p>}
              />
              <p>Tổng Tiền: {booking.total_price} VND</p>
              <p>
                Ngày đặt vé: {moment(booking.createdAt).format("DD/MM/YYYY")}{" "}
              </p>
            </List.Item>
          )}
        />
      )}
    </>
  );
};

export default HistoryMovie;
