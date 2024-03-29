import { Button, Col, Dropdown, Row, Space, Image, MenuProps } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styles from "./style.module.scss";
import UserContext from "@/contexts/context";
import User from "@/apis/auth";
import {
  DownOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  SearchOutlined,
  SmileOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import "@fortawesome/fontawesome-free/css/all.css";

const Header = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { id, setId } = useContext(UserContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);

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

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link legacyBehavior href={"/auth/info"}>
          <p className={styles.title_drop}>Thông tin </p>
        </Link>
      ),
      icon: <SmileOutlined />,
    },
    // {
    //   key: "2",

    //   label: (
    //     <Link legacyBehavior href={"/changePassword"}>
    //       <p className={styles.title_drop}> Đổi mật khẩu </p>
    //     </Link>
    //   ),

    //   icon: <ToolOutlined />,
    // },
    {
      key: "3",

      label: (
        <Link legacyBehavior href="/login">
          <p className={styles.btn_logout_drop} onClick={handleLogout}>
            Đăng Xuất
          </p>
        </Link>
      ),

      icon: (
        <p className={styles.btn_logout_drop}>
          <LogoutOutlined />
        </p>
      ),
    },
  ];

  return (
    <>
      <Row className={styles.row_header}>
        <Col className={styles.left} span={7}>
          <img className={styles.img} src="/LogoMovie1.png"></img>
        </Col>
        <Col className={styles.center} span={10}>
          <ul>
            <li>
              <Link legacyBehavior href="/auth">
                <a>
                  <i className="fas fa-home"></i> <p> Home</p>
                </a>
              </Link>
            </li>
            <li>
              <Link legacyBehavior href="/auth/search">
                <a>
                  <i className="fas fa-search"></i> <p>Tìm Kiếm </p>
                </a>
              </Link>
            </li>
            <li>
              <Link legacyBehavior href="/cumrap">
                <a>
                  <i className="fas fa-landmark"></i> <p>Hệ Thống Rạp </p>
                </a>
              </Link>
            </li>
            {isLoggedIn && (
              <li>
                <Link legacyBehavior href="/lichsu">
                  <a>
                    <i className="fas fa-barcode"></i>
                    <p> Lịch sử</p>
                  </a>
                </Link>
              </li>
            )}
          </ul>
        </Col>
        <Col className={styles.right} span={7}>
          {isLoggedIn ? (
            <>
              <Row className={styles.row_info}>
                <Col className={styles.col_info} span={15}>
                  <Dropdown
                    className={styles.dropdown_header}
                    menu={{ items }}
                    trigger={["click"]}
                    overlayStyle={{
                      marginTop: dropdownVisible ? "10px" : "0px",
                    }}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Space className={styles.space}>
                        <Image
                          className={styles.image}
                          style={{ borderRadius: "25px" }}
                          width={50}
                          src={detail?.image}
                        />

                        <p
                          className={styles.name}
                          style={{ fontSize: "1.2rem" }}
                        >
                          Xin Chào {detail?.last_name} {detail?.first_name}
                        </p>
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                </Col>
                <Col span={9}>
                  <Link legacyBehavior href="/login">
                    <Button
                      className={styles.btn_logout}
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
              <div className={styles.btn}>
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
              </div>
              <div className={styles.btn_icon}>
                <Link legacyBehavior href="/login">
                  <Button
                    className={styles.btn_login_auth}
                    onClick={handleLogout}
                  >
                    <LoginOutlined />
                  </Button>
                </Link>
                <Link legacyBehavior href="/dangky">
                  <Button className={styles.btn_logout_auth}>Đăng Ký</Button>
                </Link>
              </div>
            </>
          )}
        </Col>
      </Row>
      {/* <hr></hr> */}
    </>
  );
};

export default Header;
