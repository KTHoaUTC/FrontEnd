import Booking from "@/apis/booking";
import { Col, Row, Statistic } from "antd";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import styles from "./style.module.scss";

const formatter = (value: any | number) => (
  <CountUp end={value} separator="," />
);

const AdminIndex: React.FC = () => {
  const [listUsers, setListUsers] = useState<AdminCore.Booking[] | any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await Booking.getAllBookings("ALL");
        setListUsers(
          response.bookings?.map((account: { total_price?: string }) => ({
            total_price: account.total_price,
          }))
        );
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
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
  return (
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
          title={<p className={styles.title}> Tổng Doanh Thu</p>}
          value={totalRevenue.revenue}
          formatter={formatter}
        />
      </Col>
      <Col className={styles.doanhthu} offset={2} span={10}>
        <Statistic
          title={<p className={styles.title}> Tổng Vé Đã Đặt</p>}
          value={totalRevenue.totalBookings}
          formatter={formatter}
        />
      </Col>
    </Row>
  );
};

export default AdminIndex;
