import { Button, Col, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./style.module.scss";
import { Input } from "antd";

const { Search } = Input;
const onSearch = (value: string) => console.log(value);
const HeaderLoginAuth = () => {
   const router = useRouter();
   const { user } = router.query;
   console.log('fff',user);
  return (
    <>
      <Row className={styles.row_header}>
        <Col className={styles.col_left} offset={1} span={8}>
          <Search
            size="large"
            placeholder="Nhập tìm kiếm"
            onSearch={onSearch}
            enterButton
          />
        </Col>
        <Col className={styles.col_center} span={8}>
          <img src="/LogoMovie1.png"></img>
        </Col>
        <Col className={styles.col_right} span={7}>
          <Link href={"/login"}>
            <Button className={styles.btn_login_auth}>Đăng Xuất</Button>
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default HeaderLoginAuth;
