import Genre from "@/apis/genre";
import { Button, Form, Input, Modal, notification } from "antd";
import React, { useState } from "react";
import styles from "./style.module.scss";
import router from "next/router";

interface CollectionCreateFormProps {
  visible: boolean;
  onCreate: any;
  onCancel: () => void;
  onSuccess: () => void;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  visible,
  onCreate,
  onCancel,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const handleCreate = async (values: any) => {
    await onCreate(values);
    form.resetFields();
    onSuccess(); 
    // Call onSuccess after successful creation
    
  };
  return (
    <Modal
      title="Thêm Thể Loại"
      visible={visible}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            handleCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        className={styles.form}
        size="large"
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item
          name="name"
          label="Tên Thể Loại"
          required
          rules={[
            {
              required: true,
              message: <p className={styles.vadidate}>Không để trống ô này</p>,
            },
          ]}
        >
          <Input placeholder="Nhập tên thể loại" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const ModalAdd = ({ onSuccess }: { onSuccess: () => void }) => {
  const [visible, setVisible] = useState(false); 
  const handleCreate = async (newData: AdminCore.Genre) => {
    await Genre.creatGenre(newData);
      setVisible(false);
  };
  return (
    <>
      <Button
        className={styles.btn_add}
        onClick={() => {
          setVisible(true);
        }}
        type="primary"
      >
        + Thêm Thể Loại
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={handleCreate}
        onCancel={() => {
          setVisible(false);
        }}
        onSuccess={onSuccess}
      />
    </>
  );
};

export default ModalAdd;
