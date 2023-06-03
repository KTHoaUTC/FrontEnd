import Movie from "@/apis/movie";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  List,
  message,
  notification,
  Progress,
  Row,
  Typography,
} from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi"; // Nếu muốn hiển thị ngôn ngữ Tiếng Việt
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { storage } from "../../../../firebase";
import styles from "./style.module.scss";

dayjs.locale("vi"); // Nếu muốn hiển thị ngôn ngữ Tiếng Việt
type SizeType = Parameters<typeof Form>[0]["size"];

const EditImage: React.FC = () => {
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const router = useRouter();

  const id = router.query.id as string;
  const [accountId, setAccountId] = useState<string>("");
  const [form] = Form.useForm();
  const [detail, setDetail] = useState<AdminCore.Movie | any>();
  const [oldData, setOldData] = useState<AdminCore.Movie | undefined>(
    undefined
  );
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

  const [currentImage, setCurrentImage] = useState("");
  const [currentPoster, setCurrentPoster] = useState("");
  const [currentTrailer, setCurrentTrailer] = useState("");

  const handleSelectedFile = (files: any) => {
    if (files && files[0].size < 1000000) {
      setImageFile(files[0]);
      console.log("rrr", files[0]);
    } else {
      message.error(" file faill");
      setCurrentImage(detail.image_url);
    }
  };
  const handleSelectedPoster = (files: any) => {
    if (files && files[0].size < 1000000) {
      setPosterFile(files[0]);
      console.log("Selected poster:", files[0]);
    } else {
      message.error("Invalid poster file");
      setCurrentPoster(detail.poster_url);
    }
  };

  const handleSelectedTrailer = (files: any) => {
    if (files && files[0].size < 1000000000) {
      setTrailerFile(files[0]);
      console.log("Selected trailer:", files[0]);
    } else {
      message.error("Invalid trailer file");
      setCurrentTrailer(detail.trailer_url);
    }
  };
  const handleUploadFile = () => {
    if (imageFile) {
      const name = imageFile.name;
      const storageRef = ref(storage, `images/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      setProgressUpLoad(0);
      const interval = setInterval(() => {
        setProgressUpLoad((prevProgress) => prevProgress + 10);
      }, 500);

      setTimeout(() => {
        clearInterval(interval);
        setProgressUpLoad(100);
      }, 5000);
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
      setCurrentImage(detail.image_url);
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
      setProgressUpLoadPoster(0);
      const interval = setInterval(() => {
        setProgressUpLoadPoster((prevProgress) => prevProgress + 10);
      }, 500);

      setTimeout(() => {
        clearInterval(interval);
        setProgressUpLoadPoster(100);
      }, 5000);
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
      setCurrentPoster(detail.image_url); // Set the current image URL
    }
  };

  const handleUploadTrailer = () => {
    if (trailerFile) {
      const trailerFileName = trailerFile.name;
      const trailerStorageRef = ref(storage, `trailers/${trailerFileName}`);
      const trailerUploadTask = uploadBytesResumable(
        trailerStorageRef,
        trailerFile
      );
      setProgressUpLoadTrailer(0);
      const interval = setInterval(() => {
        setProgressUpLoadTrailer((prevProgress) => prevProgress + 10);
      }, 500);

      setTimeout(() => {
        clearInterval(interval);
        setProgressUpLoadTrailer(100);
      }, 5000);
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
      setCurrentTrailer(detail.trailer_url);
    }
  };
  //

  useEffect(() => {
    if (router.query) {
      setAccountId(id);
    }
  }, [router, id]);

  useEffect(() => {
    async function fetchData() {
      if (id) {
        const result = await Movie.getAll(id);
        setDetail(result.movies);
        setCurrentImage(result?.movies!.image_url);
        setCurrentPoster(result?.movies!.poster_url);
        setCurrentTrailer(result?.movies!.trailer_url);
        form.setFieldValue("id", result?.movies!.id);
      }
    }
    fetchData();
  }, [form, id]);
  const [updateMovie, setUpdateMovie] = useState<AdminCore.Movie[]>([]);
  const handleUpdateFile = async (updateImage: AdminCore.Movie) => {
    const updatedMovie = {
      id,
      image_url: imageFile ? dowloadURL : currentImage,
      poster_url: posterFile ? dowloadPoterURL : currentPoster,
      trailer_url: trailerFile ? downloadTrailerURL : currentTrailer,
    };
    const response = await Movie.editMovieImgae(updatedMovie);
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
      <div className={styles.step_1}>
        <Typography.Title className={styles.form_title} level={2}>
          Thay Đổi Hình Ảnh
        </Typography.Title>

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
          <Form.Item
            label="Ảnh"
            name="image_url"
            style={{ paddingTop: "3rem" }}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
          >
            <Image
              width={400}
              src={imageFile ? URL.createObjectURL(imageFile) : currentImage} // Use currentImage if no new image is selected
            />
            <Input
              type="file"
              onChange={(e) => handleSelectedFile(e.target.files)}
            />
            <Card>
              <Row>
                <Col span={10}>
                  {imageFile && (
                    <>
                      <List.Item>
                        <List.Item.Meta />
                      </List.Item>
                      <Button type="primary" onClick={handleUploadFile}>
                        Upload
                      </Button>
                      <Progress percent={progressUpload} />
                    </>
                  )}
                </Col>
              </Row>
            </Card>
          </Form.Item>

          <Form.Item
            label="Poster"
            name="poster_url"
            style={{ paddingTop: "3rem" }}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
          >
            <Image
              width={400}
              src={posterFile ? URL.createObjectURL(posterFile) : currentPoster}
            />
            <Input
              type="file"
              onChange={(e) => handleSelectedPoster(e.target.files)}
            />
            <Card>
              <Row>
                <Col span={10}>
                  {posterFile && (
                    <>
                      <List.Item>
                        <List.Item.Meta />
                      </List.Item>
                      <Button
                        loading={isUploadingPoster}
                        type="primary"
                        onClick={handleUploadPoster}
                      >
                        Upload
                      </Button>
                      <Progress percent={progressUploadPoster} />
                    </>
                  )}
                </Col>
              </Row>
            </Card>
          </Form.Item>

          <Form.Item
            label="Trailer"
            name="trailer_url"
            style={{ paddingTop: "3rem" }}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
          >
            {detail?.trailer_url ? (
              <video width={400} controls>
                <source src={detail.trailer_url} type="video/mp4" />
              </video>
            ) : (
              <div>No trailer available</div>
            )}
            <Input
              accept="video/mp4"
              type="file"
              onChange={(e) => handleSelectedTrailer(e.target.files)}
            />
            <Card>
              <Row>
                <Col span={10}>
                  {trailerFile && (
                    <>
                      <List.Item>
                        <List.Item.Meta />
                      </List.Item>
                      <Button
                        loading={isUploadingTrailer}
                        type="primary"
                        onClick={handleUploadTrailer}
                      >
                        Upload
                      </Button>
                      <Progress percent={progressUploadTrailer} />
                    </>
                  )}
                </Col>
              </Row>
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
      </div>
    </>
  );
};

export default EditImage;
