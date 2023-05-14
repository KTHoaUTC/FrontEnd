import HeaderLoginAuth from "@/layouts/dashboard/header";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import Link from "next/link";
import styles from "./style.module.scss";
const AuthLogin = () => {
  return (
    <div className={styles.contanier}>
      {/* <HeaderLoginAuth ></HeaderLoginAuth> */}
      <Row className={styles.login}>
        <Col className={styles.imgLogin} span={11}>
          <img className={styles.img} src="/PopcornStore.png" alt="" />
        </Col>
        <Col className={styles.context} span={12}>
          <div className={styles.title}> Đăng nhập hệ thống </div>
          <Form
            className={styles.form}
            name="basic"
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            layout="vertical"
          >
            <div className={styles.form1}>
              <Form.Item
                label="Email"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "  Không được để trống ô này !",
                  },
                ]}
              >
                <Input
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
                    message: "  Không được để trống ô này !",
                  },
                ]}
              >
                <Input.Password
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
