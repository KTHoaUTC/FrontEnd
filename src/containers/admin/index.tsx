import Booking from "@/apis/booking";
import { Col, Row, Statistic } from "antd";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import styles from "./style.module.scss";
import _ from "lodash";
import Movie from "@/apis/movie";
import { Bar } from "@ant-design/charts";

const formatter = (value: any | number) => (
  <CountUp end={value} separator="," />
);

const AdminIndex: React.FC = () => {
  const [listUsers, setListUsers] = useState<AdminCore.Booking[] | any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mostFrequentMovieId, setMostFrequentMovieId] = useState<string | null>(
    null
  );

  const data = [
    { name: "Tháng 1", revenue: 1000 },
    { name: "Tháng 2", revenue: 2000 },
    { name: "Tháng 3", revenue: 1500 },
    // ...
  ];
  const config = {
    data: data,
    xField: "name",
    yField: "revenue",
    seriesField: "name",
    legend: { position: "top" },
  };
  useEffect(() => {
    (async () => {
      try {
        const response = await Booking.getAllBookings("ALL");
        setListUsers(response.bookings);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const [listMovies, setListMovies] = useState<AdminCore.Movie[] | any>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await Movie.getAll("ALL");
        setListMovies(response.movies);
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const movieIds = listUsers.map((user: any) => user.movie_id);
    const counts = _.countBy(movieIds);
    const mostFrequent = _.maxBy(Object.keys(counts), (key) => counts[key]);
    setMostFrequentMovieId(mostFrequent || null);
  }, [listUsers]);

  const totalRevenue = listUsers.reduce(
    (acc: any, user: any) => {
      const totalPrice = parseFloat(user.total_price);
      if (!isNaN(totalPrice)) {
        acc.revenue += totalPrice;
        acc.totalBookings += 1;
      }
      return acc;
    },
    { revenue: 0, totalBookings: 0 }
  );
  console.log("idmoviebest", mostFrequentMovieId);

  const getMovieName = (movieId: number) => {
    const movie = listMovies.find((movie: any) => movie.id === movieId);
    return movie ? movie.title : "";
  };
  return (
    <>
      <Row
        style={{
          marginTop: "2rem",
          textAlign: "center",
          margin: "2rem auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
        gutter={16}
      >
        <Col className={styles.doanhthu} span={10}>
          <Statistic
            title={<p className={styles.title}>Tổng Doanh Thu</p>}
            value={totalRevenue.revenue}
            formatter={formatter}
          />
        </Col>
        <Col className={styles.doanhthu} offset={2} span={10}>
          <Statistic
            title={<p className={styles.title}>Tổng Vé Đã Đặt</p>}
            value={totalRevenue.totalBookings}
            formatter={formatter}
          />
        </Col>
      </Row>
      <Row
        style={{
          marginTop: "2rem",
          textAlign: "center",
          margin: "2rem auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
        gutter={16}
      >
        {mostFrequentMovieId && (
          <Col className={styles.doanhthu} offset={2} span={10}>
            <Statistic
              title={<p className={styles.title}>Phim Bán Chạy Nhất</p>}
              value={getMovieName(parseInt(mostFrequentMovieId))}
            />
          </Col>
        )}
      </Row>
      {/* <Bar {...config} />; */}
    </>
  );
};

export default AdminIndex;
