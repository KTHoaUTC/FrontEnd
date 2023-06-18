import Booking from "@/apis/booking";
import Movie from "@/apis/movie";
import { Line } from "@ant-design/charts";
import { Col, Row, Select, Statistic } from "antd";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import styles from "./style.module.scss";
import { FilterOutlined } from "@ant-design/icons";
import moment from "moment";

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
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [years, setYears] = useState<number[]>([]);
  const [todayBookings, setTodayBookings] = useState<AdminCore.Booking[]>([]);
  const [todayRevenue, setTodayRevenue] = useState<number>(0);
  const [currentDate, setCurrentDate] = useState<string>(
    moment().format("DD/MM/YYYY")
  );

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

  const handleYearChange = (value: number) => {
    setSelectedYear(value);
    calculateMonthlyRevenue(value);
  };

  const calculateMonthlyRevenue = (year: number | null = null) => {
    const monthlyData: any = {};

    listBookings.forEach((booking: any) => {
      const totalPrice = parseFloat(booking.total_price);
      if (!isNaN(totalPrice)) {
        const date = new Date(booking.createdAt);
        const month = date.getMonth() + 1;
        const bookingYear = date.getFullYear();
        const monthYear = `${month}/${bookingYear}`;

        if ((!year || bookingYear === year) && !monthlyData[monthYear]) {
          monthlyData[monthYear] = {
            month: monthYear,
            revenue: totalPrice,
            bookings: [booking.id],
          };
        } else if (monthlyData[monthYear]) {
          monthlyData[monthYear].revenue += totalPrice;
          monthlyData[monthYear].bookings.push(booking.id);
        }
      }
    });

    setMonthlyRevenue(Object.values(monthlyData));
  };

  useEffect(() => {
    const getDistinctYears = () => {
      const yearsSet = new Set<number>();

      listBookings.forEach((booking: any) => {
        const date = new Date(booking.createdAt);
        const year = date.getFullYear();
        yearsSet.add(year);
      });

      const yearsArray = Array.from(yearsSet);
      setYears(yearsArray);
    };

    getDistinctYears();
  }, [listBookings]);

  useEffect(() => {
    const movieIds = listBookings.map((booking: any) => booking.movie_id);
    const counts = _.countBy(movieIds);
    const mostFrequent = _.maxBy(Object.keys(counts), (key) => counts[key]);
    setMostFrequentMovieId(mostFrequent || null);
  }, [listBookings]);

  const totalRevenue = monthlyRevenue.reduce(
    (acc: any, monthData: any) => {
      acc.revenue += monthData.revenue;
      acc.totalBookings += monthData.bookings.length;
      return acc;
    },
    { revenue: 0, totalBookings: 0 }
  );

  useEffect(() => {
    const today = moment().format("YYYY-MM-DD");

    const filterTodayBookings = () => {
      const filteredBookings = listBookings.filter(
        (booking: AdminCore.Booking) => {
          const bookingDate = moment(booking.createdAt).format("YYYY-MM-DD");
          return bookingDate === today;
        }
      );
      setTodayBookings(filteredBookings);
    };

    filterTodayBookings();
  }, [listBookings]);

  const totalTodayBookings = todayBookings.length;

  useEffect(() => {
    const today = moment().format("YYYY-MM-DD");

    const calculateTodayRevenue = () => {
      let revenue = 0;

      todayBookings.forEach((booking: any) => {
        const bookingDate = moment(booking.createdAt).format("YYYY-MM-DD");
        if (bookingDate === today) {
          revenue += parseFloat(booking.total_price);
        }
      });

      setTodayRevenue(revenue);
    };

    calculateTodayRevenue();
  }, [todayBookings]);

  useEffect(() => {
    setCurrentDate(moment().format("DD/MM/YYYY"));
  }, []);
  const [listMovies, setListMovies] = useState<AdminCore.Movie[] | any>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await Movie.getAll("ALL");
        setListMovies(response.movies);
      } catch (e) {
        console.error(e);
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
      <h1 className={styles.title_home}> Thống Kê Doanh Thu </h1>

      <p className={styles.date}>Ngày {currentDate}</p>
      <Row className={styles.filterRow}>
        <Col className={styles.doanhthu_ticket} span={6}>
          <Statistic
            title={<p className={styles.title}>Vé Đã Đặt </p>}
            value={totalTodayBookings}
            formatter={formatter}
          />
        </Col>
        <Col className={styles.doanhthu_sum} span={6}>
          <Statistic
            title={<p className={styles.title}>Doanh Thu</p>}
            value={todayRevenue}
            formatter={formatter}
          />
        </Col>
      </Row>
      {/* <hr className={styles.line} /> */}
      <div className={styles.doanhthu_year}>
        <Row className={styles.chart}>
          <Col span={5} className={styles.col_filter}>
            <FilterOutlined /> Lọc :
            <Select
              className={styles.select}
              value={selectedYear}
              placeholder="Chọn năm"
              onChange={handleYearChange}
            >
              {years.map((year) => (
                <Select.Option key={year} value={year}>
                  {year}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col className={styles.doanhthu1} span={10}>
            <Statistic
              title={<p className={styles.title}>Doanh Thu Cả Năm</p>}
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
                  Thống kê doanh thu theo từng tháng
                </p>
              </>
            )}
          </Col>
        </Row>
        <Row>
          <Col span={24}></Col>
        </Row>
      </div>
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
        {/* {mostFrequentMovieId && (
          <Col className={styles.doanhthu} offset={2} span={10}>
            <Statistic
              title={<p className={styles.title}>Phim Bán Chạy Nhất</p>}
              value={getMovieName(parseInt(mostFrequentMovieId))}
            />
          </Col>
        )} */}
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
