import AuthContext from "@/contexts/authContex";
import { Button, Col, Input, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styles from "./style.module.scss";
import UserContext from "@/contexts/context";

const { Search } = Input;
const onSearch = (value: string) => console.log(value);
const HeaderLoginAuth = () => {
  const router = useRouter();
  // const email = router.query.email;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { email, setEmail } = useContext(UserContext);
  // console.log("email", email);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && email) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    console.log("token", token);
  }, [email]);
  console.log("emailadmin", email);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setEmail(""); // Reset the email value in the context

    router.push("/login");
  };
  return (
    <>
      <Row className={styles.row_header}>
        <Col className={styles.col_left} offset={1} span={7}>
          <Search
            size="large"
            placeholder="Nhập tìm kiếm"
            onSearch={onSearch}
            enterButton
          />
        </Col>
        <Col className={styles.col_center} span={6}>
          <img src="/LogoMovie1.png"></img>
        </Col>

        <Col className={styles.col_left} span={10}>
          {isLoggedIn ? (
            <Row className={styles.row}>
              <Col span={17}>
                <p style={{ fontSize: "1.2rem" }}>Xin Chào {email}</p>
              </Col>
              <Col span={7}>
                <Link href={"/login"}>
                  <Button
                    className={styles.btn_login_auth}
                    onClick={handleLogout}
                  >
                    Đăng Xuất
                  </Button>
                </Link>
              </Col>
            </Row>
          ) : (
            <Row className={styles.row}>
              <Col span={17}>
                {/* <p style={{ fontSize: "1.2rem" }}>Bạn cần đăng nhập</p> */}
              </Col>
              <Col span={7}>
                <Link href={"/login"}>
                  <Button className={styles.btn_login_auth}>Đăng Nhập</Button>
                </Link>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </>
  );
};

export default HeaderLoginAuth;
