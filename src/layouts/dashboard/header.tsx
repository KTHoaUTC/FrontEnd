import { Button, Col, Layout, Row } from "antd";
import styles from "./style.module.scss";
import Link from "next/link";

const { Header, Footer, Sider, Content } = Layout;
type AuthContainerProps = {};
import { Input, Space } from "antd";

const { Search } = Input;
const onSearch = (value: string) => console.log(value);
const HeaderLoginAuth = () => {
  return (
    <>
      <Row className={styles.row_header}>
        <Col className={styles.col_left} offset={1} span={8}>
          <Search
            size="large"
            placeholder="Nhap tim kiem"
            onSearch={onSearch}
            enterButton
          />
        </Col>
        <Col className={styles.col_center} span={8}>
          <img src="/LogoMovie1.png"></img>
        </Col>
        <Col className={styles.col_right} span={7}>
          <Link href={"/login"}>
            <Button className={styles.btn_login_auth}>Đăng Nhập</Button>
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default HeaderLoginAuth;
