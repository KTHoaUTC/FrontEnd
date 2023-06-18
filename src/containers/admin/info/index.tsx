import React, { useContext, useEffect, useState } from "react";
import styles from "./style.module.scss";
import User from "@/apis/auth";
import UserContext from "@/contexts/context";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  List,
  Progress,
  Row,
  Select,
  Upload,
  message,
  notification,
} from "antd";
import router from "next/router";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../../firebase";
import { EditOutlined } from "@ant-design/icons";

const ProFileAdmin: React.FC = () => {
  const [form] = Form.useForm();

  const { id, setId } = useContext(UserContext);
  const [detail, setDetailUsers] = useState<AdminCore.User[] | any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [dowloadURL, setDowloadURL] = useState("");
  const [progressUpload, setProgressUpLoad] = useState(0);
  const [currentImage, setCurrentImage] = useState("");

  const handleSelectedFile = (files: any) => {
    if (files && files[0].size < 1000000) {
      setImageFile(files[0]);
      // console.log("rrr", files[0]);
    } else {
      message.error(" file faill");
      setCurrentImage(detail.image); // Set the current image URL
    }
  };

  const handleUploadFile = () => {
    if (imageFile) {
      const name = imageFile.name;

      const storageRef = ref(storage, `images/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      setProgressUpLoad(0);
      const interval = setInterval(() => {
        setProgressUpLoad((prevProgress) => prevProgress + 10);
      }, 500);

      setTimeout(() => {
        clearInterval(interval);
        setProgressUpLoad(100);
      }, 5000);
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
      setCurrentImage(detail.image); // Set the current image URL
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const result = await User.getAll(id);
        setDetailUsers(result.users);
        setCurrentImage(result?.users!.image); // Set the current image URL
        form.setFieldValue("id", result?.users!.id);
        form.setFieldValue("email", result?.users!.email);
        form.setFieldValue("last_name", result?.users!.last_name);
        form.setFieldValue("first_name", result?.users!.first_name);
        form.setFieldValue("address", result?.users!.address);
        form.setFieldValue("gender", result?.users!.gender);
        form.setFieldValue("phone_number", result?.users!.phone_number);
        form.setFieldValue("RoleId", result?.users!.RoleId);
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);

  const [updateAccount, setUpdateAccount] = useState<AdminCore.User[]>([]);

  const handleUpdate = async (updateData: AdminCore.User) => {
    const updatedAccount = {
      id,
      image: imageFile ? dowloadURL : currentImage, 
      ...updateData,
    };
    const response = await User.editUser(updatedAccount);
    setUpdateAccount(response.data);
    if (response.data.errCode == 0) {
      notification.success({
        message: "Cập nhật thông tin thành công",
      });
      router.push("/trangchu");
    }
  };

  // console.log("userId", detail);

  return (
    <>
      <p className={styles.title_info}>Thông Tin Đăng Nhập</p>
      <Row style={{ marginTop: "3rem", height: "70vh", marginLeft: "10rem" }}>
        <Col span={12}>
          {detail && (
            <Form
              form={form}
              onFinish={handleUpdate}
              className={styles.form}
              size="large"
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 17 }}
              layout="horizontal"
            >
              <Form.Item name="email" label="Email">
                <Input disabled placeholder="Nhập email" type="email" />
              </Form.Item>
              <Form.Item name="RoleId" label="Phân Quyền: ">
                <Input disabled />
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
                <Input placeholder="Nhập họ" suffix={<EditOutlined />} />
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
                <Input placeholder="Nhập tên" suffix={<EditOutlined />} />
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
                <Input placeholder="Nhập dịa chỉ" suffix={<EditOutlined />} />
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
                required
                label="Số điện thoại"
                name="phone_number"
                rules={[
                  {
                    required: true,
                    message: "Không để trống ô này",
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message: "Chỉ nhập kí tự số",
                  },
                  {
                    pattern: /^(0\d{9})$/,
                    message: "Nhập đúng định dạng số điện thoại 0xxx-xxx-xxx",
                  },
                ]}
                validateFirst
              >
                <Input
                  // onBlur={checkForm2}
                  type="text"
                  onKeyPress={(event) => {
                    const keyCode = event.which || event.keyCode;
                    if (keyCode < 48 || keyCode > 57) {
                      event.preventDefault();
                    }
                  }}
                  // onChange={(e) =>
                  //   setPhone(e.target.value as unknown as number)
                  // }
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
                  Lưu cập nhật
                </Button>
              </Form.Item>
            </Form>
          )}
        </Col>
        <Col span={12} style={{ textAlign: "center" }}>
          <Image
            width={400}
            src={imageFile ? URL.createObjectURL(imageFile) : currentImage} // Use currentImage if no new image is selected
          />
          <Form.Item
            label="Ảnh"
            name="image"
            style={{ paddingTop: "3rem" }}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
          >
            <Input
              type="file"
              onChange={(e) => handleSelectedFile(e.target.files)}
            />
            <Card>
              <Row>
                <Col span={10}>
                  {imageFile && (
                    <>
                      <List.Item>
                        <List.Item.Meta />
                      </List.Item>
                      <Button
                        style={{ width: "50%", backgroundColor: "red" }}
                        type="primary"
                        onClick={handleUploadFile}
                        disabled={progressUpload > 0}
                      >
                        Upload
                      </Button>
                      <Progress percent={progressUpload} />
                    </>
                  )}
                </Col>
              </Row>
            </Card>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default ProFileAdmin;
