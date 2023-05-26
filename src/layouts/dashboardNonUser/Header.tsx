import { Button, Col, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styles from "./style.module.scss";
import UserContext from "@/contexts/context";

const Header = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { email, setEmail } = useContext(UserContext);

 useEffect(() => {
   const token = localStorage.getItem("token");

   if (token && email) {
     setIsLoggedIn(true);
     // Lấy email từ context khi đã đăng nhập thành công
     const { email } = useContext(UserContext);
     setEmail(email);
   } else {
     setIsLoggedIn(false);
     setEmail(""); // Đặt lại giá trị email khi không đăng nhập
   }
 }, [email]);


  console.log("emailheader", email);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setEmail("");

    router.push("/login");
  };
  return (
    <>
      <Row className={styles.row_header}>
        <Col className={styles.left} span={8}>
          <img src="/LogoMovie1.png"></img>
        </Col>
        <Col className={styles.center} span={8}>
          <ul>
            <li>
              <Link legacyBehavior href="/auth">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link legacyBehavior href="/auth/search">
                <a>Tìm Kiếm </a>
              </Link>
            </li>
            <li>
              <Link legacyBehavior href="/cumrap">
                <a>Hệ Thống Rạp</a>
              </Link>
            </li>
            {isLoggedIn && (
              <li>
                <Link legacyBehavior href="/lich-su">
                  <a>Lịch sử</a>
                </Link>
              </li>
            )}
          </ul>
        </Col>
        <Col className={styles.right} span={8}>
          {isLoggedIn ? (
            <>
              <Row>
                <Col
                  style={{
                    textAlign: "center",
                    alignItems: "center",
                    alignContent: "center",
                    display: "flex",
                  }}
                  span={15}
                >
                  <p
                    style={{
                      fontSize: "1.2rem",
                    }}
                  >
                    Xin Chào {email}
                  </p>
                </Col>
                <Col span={9}>
                  <Link legacyBehavior href="/login">
                    <Button
                      className={styles.btn_login_auth}
                      onClick={handleLogout}
                    >
                      Đăng Xuất
                    </Button>
                  </Link>
                </Col>
              </Row>
            </>
          ) : (
            <>
              <Link legacyBehavior href="/login">
                <Button
                  className={styles.btn_login_auth}
                  onClick={handleLogout}
                >
                  Đăng Nhập
                </Button>
              </Link>
              <Link legacyBehavior href="/dangky">
                <Button className={styles.btn_logout_auth}>Đăng Ký</Button>
              </Link>
            </>
          )}
        </Col>
      </Row>
      {/* <hr></hr> */}
    </>
  );
};

export default Header;
