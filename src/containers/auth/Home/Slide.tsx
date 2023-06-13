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
      <img className={styles.img} src="/banner1807.jpg"></img>
    </div>
    <div>
      <img className={styles.img} src="/bannere1.jpg"></img>
    </div>
    <div>
      <img className={styles.img} src="/posterphim.jpg"></img>
    </div>
    <div>
      <img src="/Joker.jpg" className={styles.img}></img>
    </div>
  </Carousel>
);

export default SlideHome;
