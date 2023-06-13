import Booking from "@/apis/booking";
import Movie from "@/apis/movie";
import { Line } from "@ant-design/charts";
import { Col, Row, Statistic } from "antd";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import styles from "./style.module.scss";

const formatter = (value: any | number) => (
  <CountUp end={value} separator="," />
);

const AdminIndex: React.FC = () => {
  const [listBookings, setListBookings] = useState<AdminCore.Booking[] | any>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [mostFrequentMovieId, setMostFrequentMovieId] = useState<string | null>(
    null
  );

  const [monthlyRevenue, setMonthlyRevenue] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await Booking.getAllBookings("ALL");
        setListBookings(response.bookings);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const calculateMonthlyRevenue = () => {
      const monthlyData: any = {};

      listBookings.forEach((booking: any) => {
        const totalPrice = parseFloat(booking.total_price);
        if (!isNaN(totalPrice)) {
          const date = new Date(booking.createdAt);
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          const monthYear = `${month}/${year}`;

          if (!monthlyData[monthYear]) {
            monthlyData[monthYear] = {
              month: monthYear,
              revenue: totalPrice,
              bookings: [booking.id],
            };
          } else {
            monthlyData[monthYear].revenue += totalPrice;
            monthlyData[monthYear].bookings.push(booking.id);
          }
        }
      });

      setMonthlyRevenue(Object.values(monthlyData));
    };

    calculateMonthlyRevenue();
  }, [listBookings]);

  useEffect(() => {
    const movieIds = listBookings.map((booking: any) => booking.movie_id);
    const counts = _.countBy(movieIds);
    const mostFrequent = _.maxBy(Object.keys(counts), (key) => counts[key]);
    setMostFrequentMovieId(mostFrequent || null);
  }, [listBookings]);

  const totalRevenue = listBookings.reduce(
    (acc: any, booking: any) => {
      const totalPrice = parseFloat(booking.total_price);
      if (!isNaN(totalPrice)) {
        acc.revenue += totalPrice;
        acc.totalBookings += 1;
      }
      return acc;
    },
    { revenue: 0, totalBookings: 0 }
  );
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
  const getMovieName = (movieId: number) => {
    const movie = listMovies.find((movie: any) => movie.id === movieId);
    return movie ? movie.title : "";
  };

  return (
    <>
      <Row className={styles.chart}>
        <Col className={styles.doanhthu1} span={10}>
          <Statistic
            title={<p className={styles.title}>Tổng Doanh Thu</p>}
            value={totalRevenue.revenue}
            formatter={formatter}
          />
        </Col>
      </Row>
      <Row className={styles.row_chart}>
        <Col className={styles.col_chart} span={20}>
          {monthlyRevenue.length > 0 && (
            <>
              <Row className={styles.row}>
                <Col span={24}>
                  <Line
                    data={monthlyRevenue}
                    xField="month"
                    yField="revenue"
                    seriesField="month"
                    legend={{ position: "top" }}
                  />
                </Col>
              </Row>
              <p className={styles.title_table}>
                Thống kê doanh thu theo từng tháng{" "}
              </p>
            </>
          )}
        </Col>
      </Row>
      <Row>
        <Col span={24}></Col>
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
        <Col className={styles.doanhthu} offset={2} span={10}>
          <Statistic
            title={<p className={styles.title}>Tổng Vé Đã Đặt</p>}
            value={totalRevenue.totalBookings}
            formatter={formatter}
          />
        </Col>
      </Row>
    </>
  );
};

export default AdminIndex;
