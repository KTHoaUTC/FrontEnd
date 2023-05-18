import User from "@/apis/auth";
import { LeftOutlined } from "@ant-design/icons";
import {
  Button,
  Collapse,
  Form,
  Input,
  notification,
  Select,
  Steps,
  Typography,
} from "antd";
import ImgCrop from "antd-img-crop";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import Upload from "antd/es/upload/Upload";
import dayjs from "dayjs";
import "dayjs/locale/vi"; // Nếu muốn hiển thị ngôn ngữ Tiếng Việt
import Link from "next/link";
import router from "next/router";
import React, { useState } from "react";
import styles from "./style.module.scss";

const { Panel } = Collapse;

dayjs.locale("vi"); // Nếu muốn hiển thị ngôn ngữ Tiếng Việt
type SizeType = Parameters<typeof Form>[0]["size"];

const AddNhanVien: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [email, setEmail] = useState<string>();
  const prev = () => {
    setCurrent(current - 1);
  };
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const [account, setAccount] = useState<AdminCore.User>();
  const [createUser, setCreateUser] = useState<AdminCore.User[]>([]);

  const handleCreateStep1 = async (newData: AdminCore.User) => {
    setAccount({
      ...newData,
    });
    setCurrent(1);
    console.log("dddd", account);
  };
  // const handleCreateStep2 = async (newData: AdminCore.User) => {
  //   setAccount({
  //     ...account,
  //     pass_word: newData.pass_word,
  //     rePassword: newData.rePassword,
  //   });
  //   setCurrent(2);
  // };
  const handleCreateStep3 = async (newData: AdminCore.User) => {
    if (account) {
      const updatedAccount = {
        ...account,
        pass_word: newData.pass_word,
        rePassword: newData.rePassword,
      };
      const result = await User.creatUser(updatedAccount);
      setCreateUser([...createUser, newData]);
      if (result.data.errCode === 0) {
        notification.success({
          message: "Thêm tài khoản thành công",
        });
        router.push("/login");
      }
      console.log("data", result.data);
    }
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
            onFinish={handleCreateStep1}
            className={styles.form}
            size="large"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            layout="horizontal"
            initialValues={{ size: componentSize }}
            onValuesChange={onFormLayoutChange}
          >
            <Form.Item
              name="email"
              label="Email"
              required
              rules={[
                {
                  required: true,
                  message: (
                    <p className={styles.vadidate}>Không để trống ô này</p>
                  ),
                },
              ]}
            >
              <Input
                onChange={(e) => setEmail(e.target.value as string)}
                placeholder="Nhập email"
                type="email"
              />
            </Form.Item>
            <Form.Item
              name="last_name"
              label="Họ"
              required
              rules={[
                {
                  required: true,
                  message: (
                    <p className={styles.vadidate}>Không để trống ô này</p>
                  ),
                },
              ]}
            >
              <Input placeholder="Nhập họ" />
            </Form.Item>

            <Form.Item
              name="first_name"
              label="Tên"
              required
              rules={[
                {
                  required: true,
                  message: (
                    <p className={styles.vadidate}>Không để trống ô này</p>
                  ),
                },
              ]}
            >
              <Input placeholder="Nhập tên" />
            </Form.Item>
            <Form.Item
              name="address"
              label="Địa chỉ"
              required
              rules={[
                {
                  required: true,
                  message: (
                    <p className={styles.vadidate}>Không để trống ô này</p>
                  ),
                },
              ]}
            >
              <Input placeholder="Nhập dịa chỉ" />
            </Form.Item>
            <Form.Item
              name="gender"
              label="Giới Tính"
              required
              rules={[
                {
                  required: true,
                  message: (
                    <p className={styles.vadidate}>Không để trống ô này</p>
                  ),
                },
              ]}
            >
              <Select
                placeholder="Chọn giới tính"
                style={{ width: "100%" }}
                options={[
                  { value: 0, label: "Nữ" },
                  { value: 1, label: "Nam" },
                ]}
              />
            </Form.Item>
            <Form.Item name="phone_number" label="Số Điện Thoại">
              <Input placeholder="Nhập số diện thoại" />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button
                className={styles.btn_next}
                type="primary"
                htmlType="submit"
              >
                Tiếp theo
              </Button>
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
            onFinish={handleCreateStep3}
            className={styles.form}
            size="large"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            layout="horizontal"
            initialValues={{ size: componentSize }}
            onValuesChange={onFormLayoutChange}
          >
            <Form.Item
              name="pass_word"
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
              dependencies={["pass_word"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("pass_word") === value) {
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
            <Form.Item
              className={styles.form_item_submit}
              wrapperCol={{ span: 24 }}
            >
              {current > 0 && (
                <Button
                  className={styles.btn_return}
                  type="primary"
                  onClick={() => prev()}
                >
                  Quay lại
                </Button>
              )}
             
              <Button
                className={styles.btn_add}
                type="primary"
                htmlType="submit"
              >
                Thêm Tài Khoản
              </Button>
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
      <Link className={styles.link} href="/listNhanVien">
        <p style={{ fontSize: "1.3rem" }}>
          <LeftOutlined />
          Quay lại
        </p>
      </Link>
      <h1 className={styles.title}>Đăng Kí Thành Viên</h1>
      <Steps className={styles.step} current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
    </>
  );
};

export default AddNhanVien;
