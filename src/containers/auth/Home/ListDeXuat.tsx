import Booking from "@/apis/booking";
import Movie from "@/apis/movie";
import { Badge, Card, Col, Select, Statistic } from "antd";
import _ from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
const { Meta } = Card;
const { Option } = Select;

const ListDeXuat: React.FC = () => {
  const [listBookings, setListBookings] = useState<AdminCore.Booking[] | any>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [mostFrequentMovieId, setMostFrequentMovieId] = useState<string | null>(
    null
  );
  const [years, setYears] = useState<number[]>([]);
  const [todayBookings, setTodayBookings] = useState<AdminCore.Booking[]>([]);
  const [todayRevenue, setTodayRevenue] = useState<number>(0);
  const [currentDate, setCurrentDate] = useState<string>(
    moment().format("DD/MM/YYYY")
  );
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const handleYearChange = (value: number | null) => {
    setSelectedYear(value);
  };

  const handleMonthChange = (value: number | null) => {
    setSelectedMonth(value);
  };

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

  console.log("booking", listBookings);

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

  const [topMovies, setTopMovies] = useState<AdminCore.Movie[]>([]);

  useEffect(() => {
    const getTopMovies = () => {
      const movieCounts = _.countBy(listBookings, "movie_id");
      const sortedMovies = _.chain(movieCounts)
        .map((count, movieId) => ({ movieId, count }))
        .orderBy("count", "desc")
        .slice(0, 3)
        .map(({ movieId }) => parseInt(movieId))
        .value();

      const topMovies = sortedMovies.map((movieId: number) =>
        listMovies.find((movie: AdminCore.Movie) => movie.id === movieId)
      );

      setTopMovies(topMovies);
    };

    getTopMovies();
  }, [listBookings, listMovies]);

  const filterTopMovies = () => {
    let filteredMovies = topMovies;

    if (selectedYear && selectedMonth) {
      filteredMovies = filteredMovies.filter((movie: AdminCore.Movie) =>
        listBookings.some(
          (booking: AdminCore.Booking) =>
            booking.movie_id === movie.id &&
            moment(booking.createdAt).year() === selectedYear &&
            moment(booking.createdAt).month() + 1 === selectedMonth
        )
      );
    } else if (selectedYear) {
      filteredMovies = filteredMovies.filter((movie: AdminCore.Movie) =>
        listBookings.some(
          (booking: AdminCore.Booking) =>
            booking.movie_id === movie.id &&
            moment(booking.createdAt).year() === selectedYear
        )
      );
    } else if (selectedMonth) {
      filteredMovies = filteredMovies.filter((movie: AdminCore.Movie) =>
        listBookings.some(
          (booking: AdminCore.Booking) =>
            booking.movie_id === movie.id &&
            moment(booking.createdAt).month() + 1 === selectedMonth
        )
      );
    }

    return filteredMovies;
  };

  console.log("test", topMovies);

  const getMovieName = (movieId: number) => {
    const movie = listMovies.find((movie: any) => movie.id === movieId);
    return movie ? movie.title : "";
  };

  return (
    <>
      <div className={styles.top_filters}>
        <Col className={styles.filters} span={24}>
          <Select
            defaultValue={null}
            size="large"
            style={{ marginRight: 10 }}
            placeholder="Chọn năm"
            onChange={handleYearChange}
          >
            {years.map((year: number) => (
              <Option key={year} value={year}>
                {year}
              </Option>
            ))}
          </Select>
          <Select
            defaultValue={null}
            style={{ marginRight: 10, width: "10rem" }}
            placeholder="Chọn tháng"
            onChange={handleMonthChange}
            size="large"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map(
              (month: number) => (
                <Option key={month} value={month}>
                  {month}
                </Option>
              )
            )}
          </Select>
        </Col>
        {filterTopMovies().length > 0 ? (
          <Col className={styles.doanhthuTop} span={24}>
            <div className={styles.top}>
              {filterTopMovies().map(
                (movie: AdminCore.Movie, index: number) => (
                  <div style={{ marginRight: "2rem" }}>
                    <Badge.Ribbon
                      text={"Top" + " " + String(index + 1)}
                      color="red"
                      key={movie.id}
                    >
                      <Card className={styles.card}>
                        <Meta title={movie.title} />
                      </Card>
                    </Badge.Ribbon>
                  </div>
                )
              )}
            </div>
          </Col>
        ) : (
          <>
            <Col span={24}>
              <p> Dữ liệu chưa được cập nhật</p>
            </Col>
          </>
        )}
      </div>
    </>
  );
};

export default ListDeXuat;
