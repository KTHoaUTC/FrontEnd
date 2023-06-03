import User from "@/apis/auth";
import {
    Button,
    Collapse,
    Form,
    Input,
    notification,
    Typography
} from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi"; // Nếu muốn hiển thị ngôn ngữ Tiếng Việt
import router from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";

const { Panel } = Collapse;

dayjs.locale("vi"); // Nếu muốn hiển thị ngôn ngữ Tiếng Việt
type SizeType = Parameters<typeof Form>[0]["size"];

const ChangePassword: React.FC = () => {
 
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };


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
    

    if (response.data.errCode == 0) {
      notification.success({
        message: "Cập nhật thông tin thành công",
      });
      router.push("/listNhanVien");
    }
  };
  return (
    <>
      {/* <Link className={styles.link} href="/listNhanVien">
        <p style={{ fontSize: "1.3rem" }}>
          <LeftOutlined />
          Quay lại
        </p>
      </Link> */}
      <h1 className={styles.title}>Chỉnh sửa tài khoản</h1>
      
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

export default ChangePassword;
