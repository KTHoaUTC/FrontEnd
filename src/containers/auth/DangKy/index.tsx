import {
  Button,
  Cascader,
  Col,
  Collapse,
  DatePicker,
  Form,
  Image,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Steps,
  Switch,
  theme,
  TreeSelect,
  Typography,
} from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi"; // Nếu muốn hiển thị ngôn ngữ Tiếng Việt
import React, { useState } from "react";
//import SeatButtons from "./Seat";
import styles from "./style.module.scss";
const { Panel } = Collapse;

dayjs.locale("vi"); // Nếu muốn hiển thị ngôn ngữ Tiếng Việt
type SizeType = Parameters<typeof Form>[0]["size"];

const DangKy: React.FC = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const steps = [
    {
      title: "Thông tin người dùng",
      content: (
        <div className={styles.step_1}>
          <Typography.Title className={styles.form_title} level={2}>
            Thông tin tài khoản
          </Typography.Title>
          <Form
            className={styles.form}
            size="large"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            layout="horizontal"
            initialValues={{ size: componentSize }}
            onValuesChange={onFormLayoutChange}
          >
            <Form.Item label="Họ" required>
              <Input />
            </Form.Item>
            <Form.Item label="Tên Đệm" required>
              <Input />
            </Form.Item>
            <Form.Item label="Email" required>
              <Input />
            </Form.Item>
            <Form.Item label="Số điện thoại" required>
              <Input />
            </Form.Item>
            <Form.Item label="Ngày sinh">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      title: "Nhập mật khẩu",
      content: (
        <div className={styles.step_1}>
          <Typography.Title className={styles.form_title} level={2}>
            Thông tin tài khoản
          </Typography.Title>

          <Form
            className={styles.form}
            size="large"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            layout="horizontal"
            initialValues={{ size: componentSize }}
            onValuesChange={onFormLayoutChange}
          >
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      title: "Địa chỉ liên hệ",
      content: (
        <div className={styles.step_1}>
          <Typography.Title className={styles.form_title} level={2}>
            Thông tin tài khoản
          </Typography.Title>

          <Form
            className={styles.form}
            size="large"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            layout="horizontal"
            initialValues={{ size: componentSize }}
            onValuesChange={onFormLayoutChange}
          >
            <Form.Item label="Tỉnh/Thành phố" required>
              <Input />
            </Form.Item>
            <Form.Item label="Quận/Huyện" required>
              <Input />
            </Form.Item>
            <Form.Item label="Phường xã" required>
              <Input />
            </Form.Item>
            <Form.Item label="Số nhà" required>
              <Input />
            </Form.Item>
          </Form>
        </div>
      ),
    },
  ];
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    marginTop: 46,
  };

  return (
    <>
      <h1 className={styles.title_dang_ky}>ĐĂNG KÝ THÀNH VIÊN</h1>
      <Steps className={styles.step} current={current} items={items} />

      <div style={contentStyle}>{steps[current].content}</div>
      <div style={{ textAlign: "center", marginTop: 24, marginBottom: 24 }}>
        {current > 0 && (
          <Button
            className={styles.btn_next}
            style={{ margin: "0 8px" }}
            onClick={() => prev()}
          >
            Quay Lại
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button
            className={styles.btn_next}
            type="primary"
            onClick={() => next()}
          >
            Tiếp Theo
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            className={styles.btn_next}
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            ĐĂNG KÝ
          </Button>
        )}
      </div>
    </>
  );
};

export default DangKy;
