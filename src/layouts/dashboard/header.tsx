import {
  Button,
  Col,
  Dropdown,
  Input,
  MenuProps,
  Row,
  Space,
  Image,
} from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styles from "./style.module.scss";
import UserContext from "@/contexts/context";
import User from "@/apis/auth";
import { DownOutlined, SmileOutlined, ToolOutlined } from "@ant-design/icons";

const { Search } = Input;
const onSearch = (value: string) => console.log(value);
const HeaderLoginAuth = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { id, setId } = useContext(UserContext);
  const [detail, setListUsers] = useState<AdminCore.User[] | any>([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log("iduser", id);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleVisibleChange = (visible: any) => {
    setDropdownVisible(visible);
  };
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
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link legacyBehavior href={"/trangchu/infor"}>
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
  ];

  return (
    <>
      <Row className={styles.row_header}>
        <Col className={styles.col_left} offset={1} span={7}></Col>
        <Col className={styles.col_center} span={6}>
          <img src="/LogoMovie1.png"></img>
        </Col>

        <Col className={styles.col_left} span={10}>
          {isLoggedIn ? (
            <Row className={styles.row}>
              <Col span={17}>
                <Dropdown
                  className={styles.dropdown_header}
                  menu={{ items }}
                  trigger={["click"]}
                  onVisibleChange={handleVisibleChange}
                  overlayStyle={{ marginTop: dropdownVisible ? "10px" : "0px" }} // Adjust the marginTop based on dropdown visibility
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space className={styles.space}>
                      <Image
                        style={{ borderRadius: "25px" }}
                        width={50}
                        src={detail?.image}
                      />

                      <p style={{ fontSize: "1.2rem" }}>
                        Xin Chào {detail?.last_name} {detail?.first_name}
                      </p>
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
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
