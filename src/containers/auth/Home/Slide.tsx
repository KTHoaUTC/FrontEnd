import React from "react";
import { Carousel } from "antd";
import styles from "./style.module.scss";

const contentStyle: React.CSSProperties = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const SlideHome: React.FC = () => (
  <Carousel autoplay className={styles.carousel_img}>
    <div className={styles.img}>
      <img
        className={styles.img}
        src="/banner1807.jpg"
        style={{ width: "1700px", height: "800px" }}
      ></img>
    </div>

    <div>
      <img
        src="/bannere1.jpg"
        style={{ width: "1700px", height: "800px" }}
      ></img>
    </div>
    <div>
      <img
        src="/posterphim.jpg"
        style={{ width: "1700px", height: "800px" }}
      ></img>
    </div>
    <div>
      <img src="/Joker.jpg" style={{ width: "1700px", height: "800px" }}></img>
    </div>
  </Carousel>
);

export default SlideHome;
