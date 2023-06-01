import { Button, Col, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styles from "./style.module.scss";
import UserContext from "@/contexts/context";
import User from "@/apis/auth";

const Header = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { id, setId } = useContext(UserContext);
 

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
 const [detail, setListUsers] = useState<AdminCore.User[] | any>([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log("iduser", id);

  useEffect(() => {
    (async () => {
      try {
        const response = await User.getAllAuth(id);
        setListUsers(response.users);
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);
  console.log("detail", detail);
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("id");
    setId("");

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
                <Link legacyBehavior href="/lichsu">
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
                    Xin Chào {detail?.last_name} {detail?.first_name}
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
