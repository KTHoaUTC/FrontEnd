import HeaderLoginAuth from "@/layouts/dashboard/header";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import Link from "next/link";
import styles from "./style.module.scss";
const AuthLogin = () => {
  return (
    <div className={styles.contanier}>
      <p> ddd</p>
      {/* <HeaderLoginAuth></HeaderLoginAuth> */}
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
                label={<p className={styles.formItem}>Email</p>}
                name="username"
                rules={[
                  {
                    required: true,
                    message: (
                      <p className={styles.formError}>
                        Không được để trống ô này !
                      </p>
                    ),
                  },
                ]}
              >
                <Input
                  className={styles.formInput}
                  type="email"
                  size="large"
                  placeholder="Nhập địa chỉ email"
                />
              </Form.Item>
            </div>
            <div className={styles.form1}>
              <Form.Item
                label={<p className={styles.formItem}>Mật khẩu</p>}
                name="password"
                rules={[
                  {
                    required: true,
                    message: (
                      <p className={styles.formError}>
                        Không được để trống ô này !
                      </p>
                    ),
                  },
                ]}
              >
                <Input.Password
                  className={styles.formInput}
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
              <p> Or  </p>
            
            </Form.Item>
            <Link href="/auth/UserForgotPass" className={styles.forgotPassword}>
              Quên mật khẩu?
            </Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default AuthLogin;
