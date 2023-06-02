import User from "@/apis/auth";
import { EditOutlined, LeftOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Collapse,
  Form,
  Input,
  List,
  Progress,
  Row,
  Select,
  Steps,
  Typography,
  message,
  notification,
  Image,
} from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi"; // Nếu muốn hiển thị ngôn ngữ Tiếng Việt
import Link from "next/link";
import router from "next/router";
import React, { useState } from "react";
import styles from "./style.module.scss";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../../firebase";

dayjs.locale("vi"); // Nếu muốn hiển thị ngôn ngữ Tiếng Việt
type SizeType = Parameters<typeof Form>[0]["size"];

const AddNhanVien: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [email, setEmail] = useState<string>();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUpLoading] = useState(false);
  const [dowloadURL, setDowloadURL] = useState("");
  const [progressUpload, setProgressUpLoad] = useState(0);

  const handleSelectedFile = (files: any) => {
    if (files && files[0].size < 1000000) {
      setImageFile(files[0]);
      console.log("rrr", files[0]);
    } else {
      message.error(" file faill");
    }
  };
  const handleUploadFile = () => {
    if (imageFile) {
      const name = imageFile.name;

      const storageRef = ref(storage, `images/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgressUpLoad(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          message.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setDowloadURL(url);
          });
        }
      );
    } else {
      message.error("notFOubd");
    }
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

  const [account, setAccount] = useState<AdminCore.User>();
  const [createUser, setCreateUser] = useState<AdminCore.User[]>([]);

  const handleCreateStep1 = async (newData: AdminCore.User) => {
    setAccount({
      ...newData,
    });
    setCurrent(1);
  };
  const handleCreateStep2 = async (newData: AdminCore.User) => {
    setAccount({
      ...account,
      pass_word: newData.pass_word,
      rePassword: newData.rePassword,
    });
    setCurrent(2);
  };

  const handleCreateStep3 = async (newData: AdminCore.User) => {
    if (account && imageFile) {
      const updatedAccount = {
        ...account,
        RoleId: newData.RoleId,
        image: `${dowloadURL}`,
      };
      const result = await User.creatUser(updatedAccount);
      setCreateUser([...createUser, newData]);
      if (result.data.errCode === 0) {
        notification.success({
          message: "Thêm tài khoản thành công",
        });
        router.push("/listNhanVien");
      }
      // console.log("data", result.data);
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
                suffix={<EditOutlined />}
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
              <Input suffix={<EditOutlined />} placeholder="Nhập họ" />
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
              <Input suffix={<EditOutlined />} placeholder="Nhập tên" />
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
              <Input suffix={<EditOutlined />} placeholder="Nhập dịa chỉ" />
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
            <Form.Item
              label="Số điện thoại"
              name="phone_number"
              rules={[
                {
                  required: true,
                  message: (
                    <p className={styles.vadidate}>Không để trống ô này</p>
                  ),
                },
                {
                  pattern: /^[0-9]+$/,
                  message: <p className={styles.vadidate}>Chỉ nhập kí tự số</p>,
                },
                {
                  pattern: /^(0\d{9})$/,
                  message: (
                    <p className={styles.vadidate}>
                      Nhập đúng định dạng số điện thoại 0xxx-xxx-xx
                    </p>
                  ),
                },
              ]}
              validateFirst
            >
              <Input
                type="text"
                onKeyPress={(event) => {
                  const keyCode = event.which || event.keyCode;
                  if (keyCode < 48 || keyCode > 57) {
                    event.preventDefault();
                  }
                }}
                placeholder="Nhập số điện thoại"
                suffix={<EditOutlined />}
              />
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
            onFinish={handleCreateStep2}
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
      title: "Phân quyền",
      content: (
        <div className={styles.step_1}>
          <Typography.Title className={styles.form_title} level={2}>
            Thông tin tài khoản
          </Typography.Title>

          <Form
            // onFinish={(values) =>
            //   handleCreateStep3({ ...values, RoleId: values.RoleId })
            // }
            className={styles.form}
            size="large"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            layout="horizontal"
            initialValues={{ size: componentSize }}
            onValuesChange={onFormLayoutChange}
          >
            <Form.Item
              label="Phân quyền"
              name="RoleId"
              rules={[{ required: true, message: "Không để trống ô này" }]}
            >
              <Select
                placeholder="Chọn phân quyền"
                style={{ width: "100%" }}
                options={[
                  { value: "admin", label: "admin" },
                  { value: "Nhân Viên", label: "Nhân Viên" },
                ]}
              />
            </Form.Item>

            <Form.Item label="Ảnh" name="image">
              <Input
                type="file"
                onChange={(files) => handleSelectedFile(files.target.files)}
              />
              <Card className={styles.card}>
                <Row className={styles.row}>
                  <Col className={styles.col_right} span={12}>
                    {imageFile && (
                      <>
                        <List.Item>
                          <List.Item.Meta
                            title={imageFile.name}
                            description={`Size: ${imageFile.size}`}
                          ></List.Item.Meta>
                        </List.Item>
                        <Button
                          loading={isUploading}
                          onClick={handleUploadFile}
                          type="primary"
                          htmlType="submit"
                        >
                          Upload
                        </Button>
                        <Progress percent={progressUpload}> </Progress>
                      </>
                    )}
                  </Col>
                  <Col span={12}>
                    {dowloadURL && (
                      <>
                        <Image src={dowloadURL} alt={dowloadURL} />
                        {/* <p> {dowloadURL}</p> */}
                      </>
                    )}
                  </Col>
                </Row>
              </Card>
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
                type="primary"
                htmlType="submit"
                onClick={handleCreateStep3}
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
      <h1 className={styles.title}>Thêm Tài Khoản</h1>
      <Steps className={styles.step} current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
    </>
  );
};

export default AddNhanVien;
