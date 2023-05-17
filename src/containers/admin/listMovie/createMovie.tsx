import User from "@/apis/auth";
import { LeftOutlined } from "@ant-design/icons";
import {
  Button,
  Collapse,
  Form,
  Input,
  notification,
  Select,
  Steps,
  Typography,
} from "antd";
import ImgCrop from "antd-img-crop";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import Upload from "antd/es/upload/Upload";
import dayjs from "dayjs";
import "dayjs/locale/vi"; // Nếu muốn hiển thị ngôn ngữ Tiếng Việt
import Link from "next/link";
import router from "next/router";
import React, { ChangeEvent, useState } from "react";
import styles from "./style.module.scss";
import Movie from "@/apis/movie";

const { Panel } = Collapse;
const { TextArea } = Input;
dayjs.locale("vi"); // Nếu muốn hiển thị ngôn ngữ Tiếng Việt
type SizeType = Parameters<typeof Form>[0]["size"];

const CreateMovie: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [trailer, setTrailer] = useState("");
  const [image, setImage] = useState(null);
  const [poster, setPoster] = useState("");

  const prev = () => {
    setCurrent(current - 1);
  };
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const [movie, setMovie] = useState<AdminCore.Movie>();
  const [createMovie, setCreateMovie] = useState<AdminCore.User[]>([]);

  const handleCreateStep1 = async (newData: AdminCore.User) => {
    // setAccount(newData);
    setMovie({
      ...newData,
    });
    setCurrent(1);
    console.log("dddd", movie);
  };
  //   const handleCreateStep2 = async (newData: AdminCore.User) => {
  //     setMovie({
  //       ...account,
  //       pass_word: newData.pass_word,
  //       rePassword: newData.rePassword,
  //     });
  //     setCurrent(2);
  //   };
  const handleCreateStep3 = async (newData: AdminCore.Movie) => {
    if (movie) {
      const updatedMovie = {
        ...movie,
      };
      const result = await Movie.createMovie(updatedMovie);
      setCreateMovie([...createMovie, newData]);
      if (result.data.errCode === 0) {
        notification.success({
          message: "Thêm phim thành công",
        });
        router.push("/listPhim");
      }
      console.log("data", result.data);
    }
  };
//   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImage(file);
//     }
//   };
//   const [fileList, setFileList] = useState<UploadFile[]>([
//     {
//       uid: "-1",
//       name: "image.png",
//       status: "done",
//       url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
//     },
//   ]);
  //   const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
  //     setFileList(newFileList);
  //   };
//   const handleChange = (e: { target: { value: any; name: any } }) => {
//     const value = e.target.value;
//     setMovie({ ...movie, [e.target.name]: value });
//   };
//   const onPreview = async (file: UploadFile) => {
//     let src = file.url as string;
//     if (!src) {
//       src = await new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file.originFileObj as RcFile);
//         reader.onload = () => resolve(reader.result as string);
//       });
//     }
//     const image = new Image();
//     image.src = src;
//     const imgWindow = window.open(src);
//     imgWindow?.document.write(image.outerHTML);
//   };

//   const handleImageChange = (e: { target: { file: any[]; }; }) => {
//     const file = e.target.file[0];
//     if (file) {
//       setImage(file);
//     }
//   };
  const steps = [
    {
      title: "Thông tin phim",
      content: (
        <div className={styles.step_1}>
          <Typography.Title className={styles.form_title} level={2}>
            Thông tin phim
          </Typography.Title>
          <Form
            onFinish={handleCreateStep1}
            className={styles.form}
            size="large"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            layout="horizontal"
            initialValues={{ size: componentSize }}
            onValuesChange={onFormLayoutChange}
          >
            <Form.Item
              name="title"
              label="Tên Phim"
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
                //   onChange={(e) => setEmail(e.target.value as string)}
                placeholder="Nhập tên phim"
              />
            </Form.Item>
            <Form.Item
              name="description"
              label="Nội Dung"
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
              <TextArea placeholder="Nhập dội dung" />
            </Form.Item>

            <Form.Item
              name="countries"
              label="Quốc Gia"
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
              <Input placeholder="Nhập quốc gia" />
            </Form.Item>
            <Form.Item
              name="genres_id"
              label="Thể Loại"
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
              <Input placeholder="Nhập thể loại" />
            </Form.Item>
            <Form.Item
              name="run_time"
              label="Thời Lượng"
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
              <Input placeholder="Nhập thời lượng" />
            </Form.Item>
            <Form.Item
              name="director"
              label="Diễn Viên"
              rules={[
                {
                  required: true,
                  message: (
                    <p className={styles.vadidate}>Không để trống ô này</p>
                  ),
                },
              ]}
            >
              <Input placeholder="Nhập diễn viên" />
            </Form.Item>
            <Form.Item
              label="Ảnh"
              name="image_url"
              //   rules={[{ required: true, message: "Không để trống ô này" }]}
            >
              <Input
                type="file"
                // onChange={(e) => {
                //   const file = e.target.files?.[0];
                //   if (file) {
                //     setImage(file);
                //   }
                // }}
                // onChange={handleImageChange}

                // onChange={(e)=> setImage(e.target.files[0])}
                // onChange={(e: any) => handleImageChange(e)}
              />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button
                className={styles.btn_next}
                type="primary"
                htmlType="submit"
              >
                Tiếp theo
              </Button>
            </Form.Item>
          </Form>
        </div>
      ),
    },

    {
      title: "Hình Ảnh",
      content: (
        <div className={styles.step_1}>
          <Typography.Title className={styles.form_title} level={2}>
            Thông tin Hình Ảnh
          </Typography.Title>

          <Form
            onFinish={(values) => handleCreateStep3({ ...values })}
            className={styles.form}
            size="large"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            layout="horizontal"
            initialValues={{ size: componentSize }}
            onValuesChange={onFormLayoutChange}
          >
            <Form.Item
              label="Ảnh"
              name="image_url"
              //   rules={[{ required: true, message: "Không để trống ô này" }]}
            >
              <Input
                type="file"
                name="image_url"
                // onChange={(e) => {
                //   const file = e.target.files?.[0];
                //   if (file) {
                //     setImage(file);
                //   }
                // }}
                // onChange={(e)=> setImage(e.target.files[0])}
                // onChange={(e: any) => handleImageChange(e)}
              />
              {/* <ImgCrop rotationSlider>
                <Upload
                  beforeUpload={() => false}
                  listType="picture-card"
                  fileList={fileList}
                    onChange={(e) => setImage(e.target.files[0])}
                  onPreview={onPreview}
                >
                  {fileList.length < 5 && "+ Upload"}
                </Upload>
              </ImgCrop> */}
            </Form.Item>

            <Form.Item
              label="Poster"
              name="poster_url"
              //   rules={[{ required: true, message: "Không để trống ô này" }]}
            >
              {/* <ImgCrop rotationSlider>
                <Upload
                  beforeUpload={() => false}
                  //   action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  //   onChange={(e) => setPoster(e.target.file[0])}
                  onPreview={onPreview}
                >
                  {fileList.length < 5 && "+ Upload"}
                </Upload>
              </ImgCrop> */}
            </Form.Item>

            <Form.Item
              label="Trailer"
              name="trailer_url"
              //   rules={[{ required: true, message: "Không để trống ô này" }]}
            >
              {/* <ImgCrop rotationSlider>
                <Upload
                  beforeUpload={() => false}
                  //   action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  //   onChange={(e) => setTrailer(e.target.file[0])}
                  onPreview={onPreview}
                >
                  {fileList.length < 5 && "+ Upload"}
                </Upload>
              </ImgCrop> */}
            </Form.Item>

            <Form.Item
              className={styles.form_item_submit}
              wrapperCol={{ span: 24 }}
            >
              {current > 0 && (
                <Button
                  className={styles.btn_return}
                  type="primary"
                  onClick={() => prev()}
                >
                  Quay lại
                </Button>
              )}
              <Button type="primary" htmlType="submit">
                Thêm Tài Khoản
              </Button>
            </Form.Item>
          </Form>
        </div>
      ),
    },
  ];
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    marginTop: 46,
  };

  return (
    <>
      <Link className={styles.link} href="/listNhanVien">
        <p style={{ fontSize: "1.3rem" }}>
          <LeftOutlined />
          Quay lại
        </p>
      </Link>
      <h1 className={styles.title}>Thêm Phim</h1>
      <Steps className={styles.step} current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
    </>
  );
};

export default CreateMovie;
