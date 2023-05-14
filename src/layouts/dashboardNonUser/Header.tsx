import { Button, Col, Row } from "antd";
import Link from "next/link";
import styles from "./style.module.scss";

const Header = () => {
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
              {/* <Link legacyBehavior href="/admin"> */}
              <a>Cụm Rạp</a>
              {/* </Link> */}
            </li>
            <li>
              <Link legacyBehavior href="/login">
                <a>Lịch sử</a>
              </Link>
            </li>
          </ul>
        </Col>
        <Col className={styles.right} span={8}>
          <Link legacyBehavior href="/login">
            <Button className={styles.btn_login_auth}>Đăng Nhập</Button>
          </Link>
          <Link legacyBehavior href="/dangky">
            <Button className={styles.btn_logout_auth}>Đăng Ký</Button>
          </Link>
        </Col>
      </Row>
      {/* <hr></hr> */}
    </>
  );
};

export default Header;
