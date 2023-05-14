import { Col, Layout, Row } from "antd";
import styles from "./style.module.scss";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

const HomeFooter = () => {
  return (
    <Footer className={styles.footer}>
      <Row className={styles.footer_row}>
        <Col className={styles.left} span={8}>
          <ul>
            <li className={styles.title}> GIỚI THIỆU</li>
            <li>về chúng tôi </li>
            <li>liên hệ </li>
            <li> quy chế bảo mật</li>
          </ul>
        </Col>
        <Col className={styles.center} span={8}>
          <p className={styles.title}>KẾT NỐI CAPSTONE MOVIE</p>
          <ul>
            <li>
              <FacebookOutlined />
            </li>
            <li>
              <InstagramOutlined />
            </li>
            <li>
              <TwitterOutlined />
            </li>
          </ul>
          <img src="/LogoMovie1.png"></img>
        </Col>
        <Col className={styles.right} span={8}>
          <ul>
            <li className={styles.title}>QUY ĐỊNH VÀ ĐIỀU KHOẢN</li>
            <li> Hướng dẫn đặt vé trực tuyến</li>
            <li>Quy định thành viên </li>
          </ul>
        </Col>
      </Row>
    </Footer>
  );
};

export default HomeFooter;
