import Theater from "@/apis/rap";
import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import Room from "@/apis/room";

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
  const [theaterList, setTheaterList] = useState<AdminCore.Rap[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await Theater.getAll("ALL");
        setTheaterList(response.theaters);
        // console.log("dsdsdata", theaterList);
      } catch (e) {}
    })();
  }, []);
  const handleCreate = async (values: any) => {
    try {
      const newData = {
        ...values,
      };
      await onCreate(newData);
      form.resetFields();
      onSuccess();
    } catch (error) {
      console.log("Validate Failed:", error);
    }
  };
  return (
    <Modal
      title={
        <p
          style={{
            textAlign: "center",
            margin: "1.5rem 0rem",
            fontSize: "1.7rem",
          }}
        >
          Thêm Phòng Chiếu Phim
        </p>
      }
      width={"50%"}
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
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item
          name="name"
          label="Phòng Chiếu"
          required
          rules={[
            {
              required: true,
              message: <p className={styles.vadidate}>Không để trống ô này</p>,
            },
          ]}
        >
          <Input placeholder="Nhập phòng chiếu" />
        </Form.Item>
        <Form.Item
          name="theater_id"
          label="Tên Rạp "
          required
          rules={[
            {
              required: true,
              message: <p className={styles.vadidate}>Không để trống ô này</p>,
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Chọn tên rạp"
            optionFilterProp="children"
            style={{ width: "100%" }}
            options={theaterList.map((genre) => ({
              value: genre.id,
              label: genre.name,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="sum_seat"
          label="Tổng số ghế"
          required
          rules={[
            {
              required: true,
              message: <p className={styles.vadidate}>Không để trống ô này</p>,
            },
          ]}
        >
          <Input placeholder="Nhập tổng số ghế" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const ModalAddRoom = ({ onSuccess }: { onSuccess: () => void }) => {
  const [visible, setVisible] = useState(false);
  const [listRooms, setListRooms] = useState<AdminCore.Rap[] | any>([]);

  const handleCreate = async (newData: AdminCore.Rap) => {
    const result = await Room.creatRoom(newData);
    setListRooms([...listRooms, newData]);
    // console.log("testData", newData);
    onSuccess();
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
        + Thêm Phòng Chiếu
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

export default ModalAddRoom;
