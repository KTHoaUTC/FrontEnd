import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Upload,
} from "antd";
import { Image } from "antd";
const { RangePicker } = DatePicker;
const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const config = {
  rules: [
    { type: "object" as const, required: true, message: "Please select time!" },
  ],
};
const normFile = (e: any) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const onFinish = (values: any) => {
  console.log("Received values of form: ", values);
};
const ProFileAdmin: React.FC = () => (
  <Row style={{marginTop:'7rem', height:'70vh', marginLeft:'10rem'}}>
    <Col span={12}>
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{
          "input-number": 3,
          "checkbox-group": ["A", "B"],
          rate: 3.5,
        }}
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="Mã Nhân Viên">
          <Input />
        </Form.Item>
        <Form.Item label="Họ Và Tên">
          <Input />
        </Form.Item>
        <Form.Item name="date-picker" label="Date of Birth" {...config}>
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="select"
          label="Địa Chỉ"
          hasFeedback
          rules={[{ required: true, message: "Please select your country!" }]}
        >
          <Input></Input>
        </Form.Item>

        <Form.Item
          name="select-multiple"
          label="Phân Quyền"
          rules={[
            {
              required: true,
              message: "Vui Lòng chọn phân quyền quản lý!",
              type: "array",
            },
          ]}
        >
          <Select
            mode="multiple"
            placeholder="Vui Lòng chọn phân quyền quản lý!"
          >
            <Option value="QuanTri">Quản Trị</Option>
            <Option value="NhanVienBanHang">Nhân Viên Bán Hàng</Option>
            <Option value="QuanLy">Quản Lý</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="upload"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra="Chọn Ảnh "
        >
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Cập Nhật
          </Button>
        </Form.Item>
      </Form>
    </Col>
    <Col span={12}>
      <Image
        width={400}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />
    </Col>
  </Row>
);

export default ProFileAdmin;
