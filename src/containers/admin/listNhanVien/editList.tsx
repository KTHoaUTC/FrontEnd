import {
  Button,
  Collapse,
  Form,
  Input,
  notification,
  Select,
  Typography
} from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi"; // Nếu muốn hiển thị ngôn ngữ Tiếng Việt
import React, { useEffect, useState } from "react";
import User from "@/apis/auth";
import { LeftOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import Upload from "antd/es/upload/Upload";
import Link from "next/link";
import router from "next/router";
import styles from "./style.module.scss";

const { Panel } = Collapse;

dayjs.locale("vi"); // Nếu muốn hiển thị ngôn ngữ Tiếng Việt
type SizeType = Parameters<typeof Form>[0]["size"];

const EditNhanVien: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const [email, setEmail] = useState<string>();
  const [identity_id, setIdentity_id] = useState<string>();
  const [unit, setUnit] = useState<string>();
  const [name, setName] = useState<string>();

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

  const id = router.query.id as string;
  const [accountId, setAccountId] = useState<string>("");
  const [form] = Form.useForm();
  const [detail, setDetail] = useState<AdminCore.User>();

  useEffect(() => {
    if (router.query) {
      setAccountId(id);
      console.log("id", id);
    }
  }, [router, id]);

  useEffect(() => {
    async function fetchData() {
      if (id) {
        const result = await User.getAll(id);
        setDetail(result.users);
        // console.log("ddd", result.users);
        form.setFieldValue("id", result?.users!.id);
        form.setFieldValue("email", result?.users!.email);
        form.setFieldValue("last_name", result?.users!.last_name);
        form.setFieldValue("first_name", result?.users!.first_name);
        form.setFieldValue("address", result?.users!.address);
        form.setFieldValue("gender", result?.users!.gender);
        form.setFieldValue("phone_number", result?.users!.phone_number);
      }
    }
    fetchData();
  }, [form, id]);
  const [updateAccount, setUpdateAccount] = useState<AdminCore.User[]>([]);

  const handleUpdate = async (updateData: AdminCore.User) => {
    const updatedAccount = { id, ...updateData };
    const response = await User.editUser(updatedAccount);
    setUpdateAccount(response.data);
    // console.log("fff", response.data.errCode);
    // // console.log("update", updateAccount);

    if (response.data.errCode == 0) {
      notification.success({
        message: "Cập nhật thông tin thành công",
      });
      router.push("/listNhanVien");
    }
  };
  return (
    <>
      <Link className={styles.link} href="/listNhanVien">
        <p style={{ fontSize: "1.3rem" }}>
          <LeftOutlined />
          Quay lại
        </p>
      </Link>
      <h1 className={styles.title}>Chỉnh sửa tài khoản</h1>

      <div className={styles.step_1}>
        <Typography.Title className={styles.form_title} level={2}>
          Thông tin tài khoản
        </Typography.Title>
        {detail && (
          <Form
            onFinish={handleUpdate}
            form={form}
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
                disabled
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
            <Form.Item
              name="phone_number"
              label="Số Điện Thoại"
              rules={[
                {
                  required: true,
                  message: (
                    <p className={styles.vadidate}>Không để trống ô này</p>
                  ),
                },
              ]}
            >
              <Input placeholder="Nhập số diện thoại" />
            </Form.Item>
            <Form.Item name="image" label="Ảnh">
              <ImgCrop rotationSlider>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                >
                  {fileList.length < 5 && "+ Upload"}
                </Upload>
              </ImgCrop>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button
                className={styles.btn_next}
                type="primary"
                htmlType="submit"
                // disabled={!isButtonActive}
              >
                Lưu cập nhật
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>

      <br></br>
      <br></br>
      <div className={styles.step_1}>
        <Typography.Title className={styles.form_title} level={2}>
          Thay Đổi Mật Khẩu
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
            <Button
              className={styles.btn_next}
              // disabled={!isButtonActive2}
              type="primary"
              htmlType="submit"
            >
              Lưu cập nhật
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default EditNhanVien;
