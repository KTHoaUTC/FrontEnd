import React, { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import styles from "./style.module.scss";

const ModalAdd: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  type SizeType = Parameters<typeof Form>[0]["size"];

  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button className={styles.btn_add} onClick={showModal} type="primary">
        + Thêm Thể Loại
      </Button>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}
      <Modal
        title="Thêm Thể Loại"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          className={styles.form}
          size="large"
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          initialValues={{ size: componentSize }}
          onValuesChange={onFormLayoutChange}
        >
          <Form.Item
            name="name"
            label="Tên Thể Loại"
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
            <Input placeholder="Nhập tên thể loại" />
          </Form.Item>
          <Form.Item
            name="name"
            label="Tên Thể Loại"
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
            <Input placeholder="Nhập tên thể loại" />
          </Form.Item>
          <Form.Item
            name="name"
            label="Tên Thể Loại"
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
            <Input placeholder="Nhập tên thể loại" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAdd;
