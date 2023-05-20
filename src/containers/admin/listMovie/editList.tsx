import Genre from "@/apis/genre";
import Movie from "@/apis/movie";
import { LeftOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Collapse,
  Form,
  Input,
  List,
  message,
  notification,
  Progress,
  Row,
  Select,
  Typography,
} from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi"; // Nếu muốn hiển thị ngôn ngữ Tiếng Việt
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { storage } from "../../../../firebase";
import styles from "./style.module.scss";
import { Image } from "antd";

const { TextArea } = Input;

const { Panel } = Collapse;

dayjs.locale("vi"); // Nếu muốn hiển thị ngôn ngữ Tiếng Việt
type SizeType = Parameters<typeof Form>[0]["size"];

const EditPhim: React.FC = () => {
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const router = useRouter();

  const id = router.query.id as string;
  const [accountId, setAccountId] = useState<string>("");
  const [form] = Form.useForm();
  const [detail, setDetail] = useState<AdminCore.Movie>();

  //upload anh
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
  //

  useEffect(() => {
    if (router.query) {
      setAccountId(id);
      console.log("id", id);
    }
  }, [router, id]);

  useEffect(() => {
    async function fetchData() {
      if (id) {
        const result = await Movie.getAll(id);
        setDetail(result.movies);
        form.setFieldValue("id", result?.movies!.id);
        form.setFieldValue("title", result?.movies!.title);
        form.setFieldValue("description", result?.movies!.description);
        form.setFieldValue("countries", result?.movies!.countries);
        form.setFieldValue("genres_id", result?.movies!.genres_id);
        form.setFieldValue("run_time", result?.movies!.run_time);
        form.setFieldValue("director", result?.movies!.director);
        form.setFieldValue("image_url", result?.movies!.image_url);
        form.setFieldValue("trailer_url", result?.movies!.trailer_url);
        form.setFieldValue("poster_url", result?.movies!.poster_url);
      }
      console.log('image', detail?.image_url)
    }
    fetchData();
  }, [form, id]);
  const [updateMovie, setUpdateMovie] = useState<AdminCore.Movie[]>([]);

  const [genreList, setGenreList] = useState<AdminCore.Genre[]>([]);
  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await Genre.getAll("ALL");
      setGenreList(response.genres);
    } catch (error) {
      console.log("Error fetching genres:", error);
    } finally {
    }
  };
  const handleUpdate = async (updateData: AdminCore.Movie) => {
    const updateMovie = { id, ...updateData };
    const response = await Movie.editMovie(updateMovie);
    setUpdateMovie(response.data);

    if (response.data.errCode == 0) {
      notification.success({
        message: "Cập nhật thông tin thành công",
      });
      router.push("/listPhim");
    }
  };
    const handleUpdateFile = async (updateData: AdminCore.Movie) => {
       const updatedMovie = {
         id,
         image_url: `${dowloadURL}`,
         poster_url: `${dowloadPoterURL}`,
         trailer_url: `${downloadTrailerURL}`,
       };
      const response = await Movie.editMovie(updatedMovie);
      setUpdateMovie(response.data);

      if (response.data.errCode == 0) {
        notification.success({
          message: "Cập nhật thông tin thành công",
        });
        router.push("/listPhim");
      }
    };
  return (
    <>
      <Link className={styles.link} href="/listPhim">
        <p style={{ fontSize: "1.3rem" }}>
          <LeftOutlined />
          Quay lại
        </p>
      </Link>
      <h1 className={styles.title}>Chỉnh sửa thông tin Phim</h1>

      <div className={styles.step_1}>
        <Typography.Title className={styles.form_title} level={2}>
          Thông tin Phim
        </Typography.Title>
        {detail && (
          <Form
            form={form}
            onFinish={handleUpdate}
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
            <Form.Item name="genres_id" label="Thể Loại">
              <Select
              //  mode="multiple"
                placeholder="Nhập thể loại"
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
      </div>

      <br></br>
      <br></br>
      {/* <div className={styles.step_1}>
        <Typography.Title className={styles.form_title} level={2}>
          Thay Đổi Hình Ảnh
        </Typography.Title>
        {detail && (
          <Form
            form={form}
            className={styles.form}
            size="large"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            layout="horizontal"
            initialValues={{ size: componentSize }}
            onValuesChange={onFormLayoutChange}
          >
            <Form.Item label="Ảnh" name="image_url">
              <img src={detail.image_url}></img>
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
                      </>
                    )}
                  </Col>
                </Row>
              </Card>
            </Form.Item>

            <Form.Item
              label="Poster"
              name="poster_url"
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
              </Card>
            </Form.Item>

            <Form.Item
              className={styles.form_item_submit}
              wrapperCol={{ span: 24 }}
            >
              <Button
                onClick={handleUpdateFile}
                className={styles.btn_next}
                type="primary"
                htmlType="submit"
              >
                Lưu cập nhật
              </Button>
            </Form.Item>
          </Form>
        )}
      </div> */}
    </>
  );
};

export default EditPhim;
