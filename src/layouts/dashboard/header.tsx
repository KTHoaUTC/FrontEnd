import { Button, Col, Input, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styles from "./style.module.scss";
import UserContext from "@/contexts/context";
import User from "@/apis/auth";

const { Search } = Input;
const onSearch = (value: string) => console.log(value);
const HeaderLoginAuth = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { id, setId } = useContext(UserContext);
  const [detail, setListUsers] = useState<AdminCore.User[] | any>([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log("iduser", id);

  useEffect(() => {
    (async () => {
      try {
        const response = await User.getAll(id);
        setListUsers(response.users);
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);
  // console.log("detail", detail);

  useEffect(() => {
    const isLoggedInStorage = localStorage.getItem("isLoggedIn");
    const storedId = localStorage.getItem("id");
    if (isLoggedInStorage === "true" && storedId) {
      setIsLoggedIn(true);
      if (!id) {
        setId(storedId);
      }
    } else {
      setIsLoggedIn(false);
      setId("");
    }
  }, [id, setId]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("id");
    setId("");

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
                <p style={{ fontSize: "1.2rem" }}>
                  {" "}
                  Xin Chào {detail?.last_name} {detail?.first_name}
                </p>
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
              <Col span={17}></Col>
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
