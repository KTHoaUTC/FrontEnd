import React, { useContext, useEffect, useState } from "react";
import styles from "./style.module.scss";
import User from "@/apis/auth";
import UserContext from "@/contexts/context";
import { Button, Col, Form, Image, Input, Row, Select } from "antd";

const ProFileAdmin: React.FC = () => {
  const [form] = Form.useForm();

  const { id, setId } = useContext(UserContext);
  const [detail, setDetailUsers] = useState<AdminCore.User[] | any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const result = await User.getAll(id);
        setDetailUsers(result.users);
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

  console.log("userId", detail);
  return (
    <>
      <p className={styles.title_info}>Thông Tin Đăng Nhập</p>
      <Row style={{ marginTop: "3rem", height: "70vh", marginLeft: "10rem" }}>
        <Col span={12}>
          {detail && (
            <Form
              form={form}
              className={styles.form}
              size="large"
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 17 }}
              layout="horizontal"
            >
              <Form.Item name="email" label="Email">
                <Input
                  disabled
                  // onChange={(e) => setEmail(e.target.value as string)}
                  placeholder="Nhập email"
                  type="email"
                />
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
          <Image width={400} src={detail.image} />
        </Col>
      </Row>
    </>
  );
};

export default ProFileAdmin;
