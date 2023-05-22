import AuthApi from "@/apis/login";
import { Button, Checkbox, Col, Form, Input, Row, notification } from "antd";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import styles from "./style.module.scss";
import { EditOutlined } from "@ant-design/icons";
// import { signIn } from "next-auth/react";

const AuthLogin = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [pass_word, setPassword] = useState("");
  const [token, setToken] = useState("");
  // const email = useRef("");
  // const pass_word = useRef("");
  const handleSubmit = async () => {
    // const result = await signIn("credentials", {
    //   email: email.current,
    //   pass_word: pass_word.current,
    //   redirect: true,
    //   callbackUrl: "/",
    // });
    try {
      const response = await AuthApi.signIn({ input: { email, pass_word } });
      const token = response.token;

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
      setCookie("token", token, { path: "/admin" });
      console.log("token", token);
      if (response.errCode === 0) {
        // localStorage.setItem("token", JSON.stringify(token));

        if (
          response.userData.user.RoleId == "admin" ||
          response.userData.user.RoleId == "Nhân Viên"
        ) {
          localStorage.setItem("token", JSON.stringify(token));
          setToken(token);
          router.push("/admin");
          notification.success({ message: "Đăng nhập thành công" });
        } else {
          localStorage.setItem("token", JSON.stringify(token));

          router.push({
            pathname: "/auth",
            // query: { email: email },
          });
          notification.success({ message: "Đăng nhập thành công" });
        }
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
                name="username"
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
                name="password"
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
                  type="email"
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
              <p> — Or Sign In With — </p>
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
                  GibHub
                </Button>
              </div>
            </Form.Item>
            <Link href="/auth/UserForgotPass" className={styles.forgotPassword}>
              <p>Quên mật khẩu?</p>
            </Link>
            <p className={styles.title_register}>
              Bạn chưa có tài khoản.
              <span className={styles.register}>
                {" "}
                Vui lòng đăng kí tại đây!!
              </span>
            </p>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default AuthLogin;
