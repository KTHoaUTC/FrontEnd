import Theater from "@/apis/rap";
import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  List,
  Modal,
  Progress,
  Row,
  message,
} from "antd";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { storage } from "../../../../firebase";
import styles from "./style.module.scss";
import { useRouter } from "next/router";

const { TextArea } = Input;

interface CollectionCreateFormProps {
  visible: boolean;
  currentTheater: AdminCore.Rap | null; // Thêm prop currentTheater để truyền dữ liệu của rạp hiện tại vào Modal
  onCancel: () => void;
  onSuccess: () => void;
}

const CollectionCEditForm: React.FC<CollectionCreateFormProps> = ({
  visible,
  onCancel,
  onSuccess,
  currentTheater,
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUpLoading] = useState(false);
  const [dowloadURL, setDowloadURL] = useState("");
  const [progressUpload, setProgressUpLoad] = useState(0);
  const [form] = Form.useForm();

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

  useEffect(() => {
    form.setFieldsValue({
      name: currentTheater?.name,
      address: currentTheater?.address,
      description: currentTheater?.description,
    });
  }, [currentTheater, form]);

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      const updateData = {
        id: currentTheater?.id,
        name: values.name,
        address: values.address,
        description: values.description,
        image: dowloadURL || currentTheater?.image,
      };
      await Theater.editTheater(updateData);
      onSuccess();
      onCancel();
      message.success("Theater updated successfully.");
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
      onOk={handleUpdate}
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
          <TextArea placeholder="Nhập giới thiệu" />
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

const ModalAddTheater = ({
  onSuccess,
  currentTheater,
}: {
  onSuccess: () => void;
  currentTheater: AdminCore.Rap | null;
}) => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const [accountId, setAccountId] = useState<string>("");
  const id = router.query.id as string;
  useEffect(() => {
    if (router.query) {
      setAccountId(id);
    }
  }, [router]);
  console.log("iddd", accountId);
  return (
    <>
      <Button
        className={styles.btn_delete}
        style={{ float: "right", margin: "0px" }}
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        <EditOutlined className={styles.icon} />
      </Button>
      <CollectionCEditForm
        visible={visible}
        // onUpdate={handleUpdate}
        onCancel={() => {
          setVisible(false);
        }}
        onSuccess={onSuccess}
        currentTheater={currentTheater} // Truyền dữ liệu của rạp hiện tại vào Modal
      />
    </>
  );
};

export default ModalAddTheater;
