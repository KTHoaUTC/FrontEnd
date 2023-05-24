import Genre from "@/apis/genre";
import Movie from "@/apis/movie";
import { LeftOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Collapse,
  DatePicker,
  DatePickerProps,
  Form,
  Image,
  Input,
  List,
  message,
  notification,
  Progress,
  Row,
  Select,
  Steps,
  Typography,
} from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi"; // Nếu muốn hiển thị ngôn ngữ Tiếng Việt
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Link from "next/link";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { storage } from "../../../../firebase";
import styles from "./style.module.scss";

const { TextArea } = Input;
dayjs.locale("vi"); // Nếu muốn hiển thị ngôn ngữ Tiếng Việt
type SizeType = Parameters<typeof Form>[0]["size"];

const CreateMovie: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [trailerFile, setTrailerFile] = useState<File | null>(null);

  const [isUploading, setIsUpLoading] = useState(false);
  const [isUploadingPoster, setIsUpLoadingPoster] = useState(false);
  const [isUploadingTrailer, setIsUpLoadingTrailer] = useState(false);

  const [dowloadURL, setDowloadURL] = useState("");
  const [dowloadPoterURL, setDownloadPosterURL] = useState("");
  const [downloadTrailerURL, setDownloadTrailerURL] = useState("");

  const [progressUpload, setProgressUpLoad] = useState(0);
  const [progressUploadPoster, setProgressUpLoadPoster] = useState(0);
  const [progressUploadTrailer, setProgressUpLoadTrailer] = useState(0);

  const handleSelectedFile = (files: any) => {
    if (files && files[0].size < 1000000) {
      setImageFile(files[0]);
      console.log("rrr", files[0]);
    } else {
      message.error(" file faill");
    }
  };
  const handleSelectedPoster = (files: any) => {
    if (files && files[0].size < 1000000) {
      setPosterFile(files[0]);
      console.log("Selected poster:", files[0]);
    } else {
      message.error("Invalid poster file");
    }
  };

  const handleSelectedTrailer = (files: any) => {
    if (files && files[0].size < 1000000000) {
      setTrailerFile(files[0]);
      console.log("Selected trailer:", files[0]);
    } else {
      message.error("Invalid trailer file");
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

  const handleUploadPoster = () => {
    if (posterFile) {
      const posterFileName = posterFile.name;

      const posterStorageRef = ref(storage, `posters/${posterFileName}`);
      const posterUploadTask = uploadBytesResumable(
        posterStorageRef,
        posterFile
      );
      posterUploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgressUpLoadPoster(progress);
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
          getDownloadURL(posterUploadTask.snapshot.ref).then((url) => {
            setDownloadPosterURL(url);
          });
        }
      );
    } else {
      message.error("notFOubd");
    }
  };

  const handleUploadTrailer = () => {
    if (trailerFile) {
      const trailerFileName = trailerFile.name;
      // Upload trailer
      const trailerStorageRef = ref(storage, `trailers/${trailerFileName}`);
      const trailerUploadTask = uploadBytesResumable(
        trailerStorageRef,
        trailerFile
      );

      trailerUploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgressUpLoadTrailer(progress);
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
          getDownloadURL(trailerUploadTask.snapshot.ref).then((url) => {
            setDownloadTrailerURL(url);
          });
        }
      );
    } else {
      message.error("notFOubd");
    }
  };
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
  const [createMovie, setCreateMovie] = useState<AdminCore.Movie[]>([]);
  const [genreList, setGenreList] = useState<AdminCore.Genre[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await Genre.getAll("ALL");
        setGenreList(response.genres);
      } catch (e) {}
    })();
  }, []);
   const onChange: DatePickerProps["onChange"] = (date, dateString) => {
     console.log(date, dateString);
   };

  const handleCreateStep1 = async (newData: AdminCore.Movie) => {
    setMovie({
      ...newData,
    });
    setCurrent(1);
  };

  const handleCreateStep3 = async (newData: AdminCore.Movie) => {
    if (movie && imageFile) {
      const updatedMovie = {
        ...movie,
        image_url: `${dowloadURL}`,
        poster_url: `${dowloadPoterURL}`,
        trailer_url: `${downloadTrailerURL}`,
      };
      const result = await Movie.createMovie(updatedMovie);
      setCreateMovie([...createMovie, newData]);
      if (result.data.errCode === 0) {
        notification.success({
          message: "Thêm phim thành công",
        });
        router.push("/listPhim");
      }
      // console.log("data", result.data);
    }
  };
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
              <Input placeholder="Nhập tên phim" />
            </Form.Item>
            <Form.Item
              name="description"
              style={{ whiteSpace: "pre-line" }}
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
              <Select
                showSearch
                placeholder="Nhập thể loại"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                value={selectedItems}
                onChange={setSelectedItems}
                style={{ width: "100%" }}
                options={genreList.map((genre) => ({
                  value: genre.id,
                  label: genre.name,
                }))}
              />
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
              name="release_date"
              label="Đạo Diễn"
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
              <Input placeholder="Nhập Đạo diễn" />
            </Form.Item>
            <Form.Item
              name="day_start"
              label="Ngày Khởi Chiếu"
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
              <DatePicker
                placeholder="Chọn Ngày Chiếu "
                style={{ width: "100%" }}
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item
              name="status"
              label="Trạng Thái"
              required
              rules={[
                {
                  required: true,
                  message: (
                    <p className={styles.validate}>Không để trống ô này</p>
                  ),
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Chọn trạng thái"
                options={[
                  { value: "hot", label: "Hot" },
                  { value: "coming_soon", label: "Sắp Chiếu" },
                  { value: "now_showing", label: "Đang Chiếu" },
                ]}
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
                onChange={(files) => handleSelectedFile(files.target.files)} // onChange={(e) => {
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
                        {/* <p> {dowloadURL}</p> */}
                      </>
                    )}
                  </Col>
                </Row>
              </Card>
            </Form.Item>

            <Form.Item
              label="Poster"
              name="poster_url"
              //   rules={[{ required: true, message: "Không để trống ô này" }]}
            >
              <Input
                type="file"
                onChange={(files) => handleSelectedPoster(files.target.files)} // onChange={(e) => {
              />
              <Card className={styles.card}>
                <Row className={styles.row}>
                  <Col className={styles.col_right} span={12}>
                    {posterFile && (
                      <>
                        <List.Item>
                          <List.Item.Meta
                            title={posterFile.name}
                            description={`Size: ${posterFile.size}`}
                          ></List.Item.Meta>
                        </List.Item>
                        <Button
                          loading={isUploadingPoster}
                          onClick={handleUploadPoster}
                          type="primary"
                          htmlType="submit"
                        >
                          Upload
                        </Button>
                        <Progress percent={progressUploadPoster}> </Progress>
                      </>
                    )}
                  </Col>
                  <Col span={12}>
                    {dowloadPoterURL && (
                      <>
                        <Image src={dowloadPoterURL} alt={dowloadPoterURL} />
                      </>
                    )}
                  </Col>
                </Row>
              </Card>
            </Form.Item>

            <Form.Item label="Trailer" name="trailer_url">
              <Input
                accept="video/mp4"
                type="file"
                onChange={(files) => handleSelectedTrailer(files.target.files)}
              />
              <Card>
                {trailerFile && (
                  <>
                    <List.Item>
                      <List.Item.Meta
                        title={trailerFile.name}
                        description={`Size: ${trailerFile.size}`}
                      ></List.Item.Meta>
                    </List.Item>
                    <Button
                      loading={isUploadingTrailer}
                      onClick={handleUploadTrailer}
                      type="primary"
                      htmlType="submit"
                    >
                      Upload
                    </Button>
                    <Progress percent={progressUploadTrailer}> </Progress>
                  </>
                )}
                {/* {downloadTrailerURL && (
                  <>
                    <ReactPlayer
                      src={downloadTrailerURL}
                      alt={downloadTrailerURL}
                    />
                    <p> {downloadTrailerURL}</p>
                  </>
                )} */}
              </Card>
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
              <Button
                onClick={handleCreateStep3}
                type="primary"
                htmlType="submit"
              >
                Thêm Phim
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
      <Link className={styles.link} href="/listPhim">
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
