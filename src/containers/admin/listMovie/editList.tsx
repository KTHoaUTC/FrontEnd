import Genre from "@/apis/genre";
import Movie from "@/apis/movie";
import { LeftOutlined } from "@ant-design/icons";
import {
  Button,
  Collapse,
  Form,
  Input,
  notification,
  Select,
  Typography
} from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi"; // Nếu muốn hiển thị ngôn ngữ Tiếng Việt
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import EditImage from "./editImage";
import styles from "./style.module.scss";

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
  const [detail, setDetail] = useState<AdminCore.Movie | any>();
  useEffect(() => {
    if (router.query) {
      setAccountId(id);
      // console.log("id", id);
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
      // console.log("image", detail?.image_url);
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
    const updateMovie = {
      id,
      ...updateData,
    };
    const response = await Movie.editMovie(updateMovie);
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
      <EditImage></EditImage>
    </>
  );
};

export default EditPhim;
