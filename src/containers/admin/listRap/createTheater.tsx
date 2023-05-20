import Theater from "@/apis/rap";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  List,
  Modal,
  Image,
  Progress,
  Row,
  message,
} from "antd";
import React, { useState } from "react";
import styles from "./style.module.scss";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../../firebase";

const { TextArea } = Input;

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

  const handleCreate = async (values: any) => {
    try {
      const newData = {
        ...values,
        image: `${dowloadURL}`,
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
          Thêm Rạp Chiếu Phim
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
          label="Tên Rạp"
          required
          rules={[
            {
              required: true,
              message: <p className={styles.vadidate}>Không để trống ô này</p>,
            },
          ]}
        >
          <Input placeholder="Nhập tên rạp" />
        </Form.Item>
        <Form.Item
          name="address"
          label="Địa Chỉ "
          required
          rules={[
            {
              required: true,
              message: <p className={styles.vadidate}>Không để trống ô này</p>,
            },
          ]}
        >
          <Input placeholder="Nhập địa chỉ" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Giới Thiệu"
          required
          rules={[
            {
              required: true,
              message: <p className={styles.vadidate}>Không để trống ô này</p>,
            },
          ]}
        >
          <TextArea
            style={{ whiteSpace: "pre-line" }}
            placeholder="Nhập giới thiệu"
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
                  </>
                )}
              </Col>
            </Row>
          </Card>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const ModalAddTheater = ({ onSuccess }: { onSuccess: () => void }) => {
  const [visible, setVisible] = useState(false);
  const [listTheaters, setListTheaters] = useState<AdminCore.Rap[] | any>([]);

  const handleCreate = async (newData: AdminCore.Rap) => {
    const result = await Theater.createTheater(newData);
    setListTheaters([...listTheaters, newData]);
    console.log("testData", newData);
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
        + Thêm Rạp
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

export default ModalAddTheater;
