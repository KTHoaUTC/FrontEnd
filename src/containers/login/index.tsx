import AuthApi from "@/apis/login";
import UserContext from "@/contexts/context";
import { EditOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, Row, notification } from "antd";
import { setCookie, setCookies } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styles from "./style.module.scss";
// import { setCookie, getCookie } from "cookies-next";

const AuthLogin = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [pass_word, setPassword] = useState("");
  const { setEmail: setEmailContext } = useContext(UserContext);
  const { setId: setIdContext } = useContext(UserContext);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);
  const handleSubmit = async () => {
    try {
      const response = await AuthApi.signIn({ input: { email, pass_word } });
      const token = response.token;
      console.log("hahaha", token);

      if (response.errCode === 3) {
        setErrorMessage("Sai mật khẩu. Vui lòng nhập lại!");
        return;
      }
      if (response.errCode === 1) {
        setErrorMessage("Email không tồn tại. Vui lòng nhập lại!");
        return;
      }
      if (response.errCode === 2) {
        setErrorMessage("Người dùng không tồn tại!");
        return;
      }
      localStorage.setItem("token", token);

      setCookie("token", token, { path: "/login" });
      if (response.errCode === 0) {
        if (
          response.userData.RoleId == "admin" ||
          response.userData.RoleId == "Nhân Viên"
        ) {
          setCookies("token", JSON.stringify(token));
          router.push("/trangchu");
          setEmailContext(response.userData.id);
          console.log("idlogin", response.userData.id);
          // setEmailContext(response.userData.email);
          localStorage.setItem("id", response.userData.id); // Save the id to localStorage
          setIdContext(response.userData.id);

          localStorage.setItem("isLoggedIn", "true");

          notification.success({ message: "Đăng nhập thành công" });
        } else {
          setCookies("token", JSON.stringify(token));
          router.push("/auth");
          // console.log("idlogin", response.userData.id);
          // setEmailContext(response.userData.id);
          localStorage.setItem("id", response.userData.id); // Save the id to localStorage
          setIdContext(response.userData.id);
          localStorage.setItem("isLoggedIn", "true");

          notification.success({ message: "Đăng nhập thành công" });
        }
        localStorage.setItem("email", email);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.contanier}>
      <Row className={styles.login}>
        <Col className={styles.imgLogin} span={11}>
          <img className={styles.img} src="/PopcornStore.png" alt="" />
        </Col>
        <Col className={styles.context} span={12}>
          <div className={styles.title}> Đăng nhập hệ thống </div>
          <Form
            onFinish={handleSubmit}
            className={styles.form}
            name="basic"
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            layout="vertical"
          >
            <div className={styles.text_error}>
              {errorMessage && <div>{errorMessage}</div>}
            </div>

            <div className={styles.form1}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: (
                      <p className={styles.vadidate}>
                        {" "}
                        Không được để trống ô này !
                      </p>
                    ),
                  },
                ]}
              >
                <Input
                  suffix={<EditOutlined />}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.form_input}
                  type="email"
                  size="large"
                  placeholder="Nhập địa chỉ email"
                />
              </Form.Item>
            </div>
            <div className={styles.form1}>
              <Form.Item
                label="Mật khẩu"
                name="pass_word"
                rules={[
                  {
                    required: true,
                    message: (
                      <p className={styles.vadidate}>
                        Không được để trống ô này !
                      </p>
                    ),
                  },
                ]}
              >
                <Input.Password
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.form_input}
                  // type="email"
                  size="large"
                  placeholder="Nhập mật khẩu"
                />
              </Form.Item>
            </div>
            <div className={styles.remember}>
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox className={styles.rememberItem}>
                  Lưu mật khẩu
                </Checkbox>
              </Form.Item>
            </div>

            <Form.Item wrapperCol={{ span: 24 }}>
              <Button
                className={styles.btnLogin}
                type="primary"
                htmlType="submit"
              >
                Đăng nhập
              </Button>
              {/* <p> — Or Sign In With — </p>
              <div className={styles.login_diffrent}>
                <Button
                  className={styles.LoginGoogle}
                  type="primary"
                  htmlType="submit"
                >
                  Google
                </Button>
                <Button
                  className={styles.LoginGib}
                  type="primary"
                  htmlType="submit"
                >
                  GitHub
                </Button>
              </div> */}
            </Form.Item>
            {/* <Link href="/auth/UserForgotPass" className={styles.forgotPassword}>
              <p>Quên mật khẩu?</p>
            </Link>
            <p className={styles.title_register}>
              Bạn chưa có tài khoản.
              <span className={styles.register}>
                {" "}
                Vui lòng đăng kí tại đây!!
              </span>
            </p> */}
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default AuthLogin;
